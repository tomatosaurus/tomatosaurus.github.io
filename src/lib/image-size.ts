import type { SatteriProcessorOptions } from '@astrojs/markdown-satteri';
import type { Element, ElementContent } from 'hast';

// Image width, set from the Caption field in the Tina editor (the Markdown image title):
//   ![alt](/uploads/a.png "300")            → 300px wide
//   ![alt](/uploads/a.png "50%")            → half the reading column
//   ![alt](/uploads/a.png "Caption | 300")  → 300px wide, tooltip "Caption"
// Images never grow past the column: global.css caps them at max-width: 100%.
const SIZE = /^(?:(.*?)\s*\|\s*)?(\d+(?:\.\d+)?)\s*(px|%)?$/s;

export function parseImageSize(title: unknown) {
	const match = typeof title === 'string' ? SIZE.exec(title.trim()) : null;
	if (!match) return undefined;
	const [, caption, amount, unit = 'px'] = match;
	return { amount: Number(amount), unit, caption: caption?.trim() || undefined };
}

type HastPlugin = NonNullable<SatteriProcessorOptions['hastPlugins']>[number];

export const imageSizePlugin = {
	name: 'image-size',
	element: {
		filter: ['img'],
		visit(node, ctx) {
			const size = parseImageSize(node.properties?.title);
			if (!size) return;
			// % widths leave room for the image's side margins, so "50%" twice fits on one line
			const width = size.unit === '%' ? `calc(${size.amount}% - 0.5em)` : `${size.amount}px`;
			ctx.setProperty(node, 'style', `width:${width}`);
			ctx.setProperty(node, 'title', size.caption ?? null);
		},
	},
} satisfies HastPlugin;

// Images sit inline in a paragraph, often right after text (that's how the Tina editor
// inserts them). Split each paragraph so every run of images gets its own
// <p class="images">, which the post layout centers. Text stays in plain <p>s.
const isBlank = (node: ElementContent) => node.type === 'text' && !node.value.trim();
const isImage = (node: ElementContent): boolean =>
	node.type === 'element' &&
	(node.tagName === 'img' ||
		(node.tagName === 'a' &&
			node.children.some(isImage) &&
			node.children.every((child) => isImage(child) || isBlank(child))));

export const imageRowPlugin = {
	name: 'image-row',
	element: {
		filter: ['p'],
		visit(node, ctx) {
			const runs: { images: boolean; nodes: ElementContent[] }[] = [];
			for (const child of node.children as ElementContent[]) {
				const last = runs.at(-1);
				const images = isImage(child);
				if (last && (isBlank(child) || last.images === images)) last.nodes.push(child);
				else runs.push({ images, nodes: [child] });
			}
			if (!runs.some((run) => run.images)) return;
			if (runs.length === 1) {
				ctx.setProperty(node, 'className', ['images']);
				return;
			}
			const paragraphs = runs
				.filter((run) => run.images || !run.nodes.every(isBlank))
				.map(
					(run): Element => ({
						type: 'element',
						tagName: 'p',
						properties: run.images ? { className: ['images'] } : {},
						children: run.nodes,
					}),
				);
			ctx.replaceNode(node, paragraphs as Parameters<typeof ctx.replaceNode>[1]);
		},
	},
} satisfies HastPlugin;
