import type { SatteriProcessorOptions } from '@astrojs/markdown-satteri';
import type { Code, List, ListItem, Parents, RootContent } from 'mdast';

// Markdown the Tina editor can't produce directly, recovered at build time.

type MdastPlugin = NonNullable<SatteriProcessorOptions['mdastPlugins']>[number];

// Collapsible blocks. Typed in the Tina editor, the tags come out escaped and padded with
// blank lines (`\<details>`); hand-written, they often have no blank lines around them,
// which makes CommonMark swallow the inner Markdown as raw HTML. Put each tag line back
// as real HTML on its own block so the content between them renders as Markdown:
//   <details>
//   <summary>Click to expand</summary>
//   - **Markdown** works here
//   </details>
const TAG_LINE = /^(\s*)((?:\\?<\/?details(?:\s[^>]*)?>|\\?<summary>.*?\\?<\/summary>)\s*)+$/;
const TAG = /\\?<(\/?)details(\s[^>]*)?>|\\?<summary>(.*?)\\?<\/summary>/g;
const FENCE = /^\s*(`{3,}|~{3,})/;
// Backslash escapes Tina adds inside the summary text (e.g. `\_`), which raw HTML would keep
const unescape = (text: string) => text.replace(/\\([!-/:-@[-`{-~])/g, '$1');

export function normalizeDetails(source: string) {
	const out: string[] = [];
	let fence: string | undefined;
	for (const line of source.split('\n')) {
		const marker = FENCE.exec(line)?.[1];
		if (fence) {
			if (marker?.[0] === fence[0] && marker.length >= fence.length && !line.trim().slice(marker.length)) fence = undefined;
			out.push(line);
		} else if (marker) {
			fence = marker;
			out.push(line);
		} else if (TAG_LINE.test(line)) {
			const indent = TAG_LINE.exec(line)![1];
			for (const [, close, attrs = '', summary] of line.matchAll(TAG)) {
				const tag = summary === undefined ? `<${close}details${attrs}>` : `<summary>${unescape(summary)}</summary>`;
				out.push('', indent + tag, '');
			}
		} else {
			out.push(line);
		}
	}
	return out.join('\n');
}

export const detailsPlugin = ((ctx) =>
	ctx.sourceFormat === 'markdown' &&
	/<\/?(details|summary)/.test(ctx.source) && {
		name: 'details',
		before(root, ctx) {
			ctx.replaceNode(root, { raw: normalizeDetails(ctx.source) });
		},
	}) satisfies MdastPlugin;

// Code blocks inside list items. The Tina editor can't nest a code block in a list (and
// refuses to open a post whose file does), so a code block placed right after a list, with
// nothing in between, is moved into the list's last item, at its deepest level. A list of
// the same kind that continues after the code joins the first, so numbering carries on.
//   - Install                      - Install
//   ```bash                 →        ```bash
//   npm i                            npm i
//   ```                              ```
//   - Run                          - Run
// Put a paragraph between the list and the code to keep the code outside the list.
type Node = RootContent | ListItem;
// Visitor nodes are read-only views; copy into plain objects to build the merged list
const copy = <T extends Node>(node: T): T =>
	Object.fromEntries(
		Object.entries(node)
			.filter(([key]) => key !== 'position')
			.map(([key, value]) => [key, key === 'children' ? (value as Node[]).map(copy) : value]),
	) as T;

export const listCodePlugin = {
	name: 'list-code',
	before(root, ctx) {
		const walk = (parent: Parents) => {
			const children = parent.children as Node[];
			for (let i = 0; i < children.length; i++) {
				const node = children[i];
				if (node.type !== 'list') {
					if ('children' in node) walk(node);
					continue;
				}
				const start = i;
				let list: List | undefined;
				for (;;) {
					const codes: Code[] = [];
					while (children[i + 1 + codes.length]?.type === 'code') codes.push(children[i + 1 + codes.length] as Code);
					if (!codes.length) break;
					list ??= copy(node);
					let item = list.children.at(-1)!;
					for (let last = item.children.at(-1); last?.type === 'list'; last = item.children.at(-1)) {
						item = last.children.at(-1)!;
					}
					item.children.push(...codes.map(copy));
					i += codes.length;
					const next = children[i + 1];
					if (next?.type !== 'list' || next.ordered !== list.ordered) break;
					list.children.push(...copy(next).children);
					i++;
				}
				if (!list) {
					walk(node);
					continue;
				}
				ctx.replaceNode(node, list);
				for (const consumed of children.slice(start + 1, i + 1)) ctx.removeNode(consumed);
			}
		};
		walk(root);
	},
} satisfies MdastPlugin;
