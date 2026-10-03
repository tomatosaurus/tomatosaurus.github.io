import type { SatteriProcessorOptions } from '@astrojs/markdown-satteri';

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
			ctx.setProperty(node, 'style', `width:${size.amount}${size.unit}`);
			ctx.setProperty(node, 'title', size.caption ?? null);
		},
	},
} satisfies HastPlugin;
