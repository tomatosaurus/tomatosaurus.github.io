import data from './data/categories.json';

// Tabs and their category trees live in src/data/categories.json (editable in
// the Tina editor under "Tabs & Categories"). Each top-level entry is a header
// tab (/engineering/, /blog/) with its own categories in that tab's sidebar.
// Posts reference a category by path: `category: engineering` (tab root) or
// `category: blog/life` (nested).

export interface Category {
	slug: string;
	label: string;
	children?: Category[];
}

// Paths already used by fixed pages; a tab with one of these slugs would clash
const RESERVED_TABS = ['contact'];

export const CATEGORIES: Category[] = data.tabs;

for (const tab of CATEGORIES) {
	if (RESERVED_TABS.includes(tab.slug)) {
		throw new Error(`Tab slug "${tab.slug}" is reserved (src/data/categories.json)`);
	}
}

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
