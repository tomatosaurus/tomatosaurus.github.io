// Category tree. Add a category here and it appears in the sidebar, gets a
// /category/<path>/ page, and becomes selectable in the Tina editor.
// Posts reference a category by its path, e.g. `category: study/ml`.

export interface Category {
	slug: string;
	label: string;
	children?: Category[];
}

export const CATEGORIES: Category[] = [
	{ slug: 'engineering', label: 'Engineering' },
	{
		slug: 'study',
		label: 'Study',
		children: [
			// { slug: 'ml', label: 'Machine Learning' },
		],
	},
	{ slug: 'life', label: 'Life' },
];

export interface FlatCategory {
	path: string; // e.g. "study/ml"
	label: string;
	trail: { path: string; label: string }[]; // ancestors + self, for breadcrumbs
	depth: number;
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
