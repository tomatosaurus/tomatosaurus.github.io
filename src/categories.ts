// Tabs and their category trees. Each top-level entry is a tab in the header
// (/engineering/, /blog/) with its own categories shown in that tab's sidebar.
// Posts reference a category by path: `category: engineering` (tab root) or
// `category: blog/life` (nested). Add entries here and the sidebar, category
// pages and the Tina select all pick them up.

export interface Category {
	slug: string;
	label: string;
	children?: Category[];
}

export const CATEGORIES: Category[] = [
	{
		slug: 'engineering',
		label: 'Engineering',
		children: [
			// { slug: 'ml', label: 'Machine Learning', children: [{ slug: 'llm', label: 'LLM' }] },
		],
	},
	{
		slug: 'blog',
		label: 'Blog',
		children: [{ slug: 'life', label: 'Life' }],
	},
];

export interface FlatCategory {
	path: string; // e.g. "blog/life"
	label: string;
	trail: { path: string; label: string }[]; // ancestors + self, for breadcrumbs
	depth: number; // 0 = tab
}

function flatten(nodes: Category[], parent: FlatCategory['trail'] = []): FlatCategory[] {
	return nodes.flatMap((node) => {
		const path = parent.length ? `${parent.at(-1)!.path}/${node.slug}` : node.slug;
		const trail = [...parent, { path, label: node.label }];
		return [
			{ path, label: node.label, trail, depth: parent.length },
			...flatten(node.children ?? [], trail),
		];
	});
}

export const CATEGORY_LIST = flatten(CATEGORIES);

export function getCategory(path: string) {
	return CATEGORY_LIST.find((c) => c.path === path);
}

// True if `postCategory` is `path` itself or nested anywhere below it
export function inCategory(postCategory: string, path: string) {
	return postCategory === path || postCategory.startsWith(`${path}/`);
}

export function tabOf(path: string) {
	return path.split('/')[0];
}

// /engineering/ for a tab, /engineering/category/ml/ for anything below it
export function categoryUrl(path: string) {
	const [tab, ...rest] = path.split('/');
	return rest.length ? `/${tab}/category/${rest.join('/')}/` : `/${tab}/`;
}
