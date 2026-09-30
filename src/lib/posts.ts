import { type CollectionEntry, getCollection } from 'astro:content';
import { tabOf } from '../categories';

export type Post = CollectionEntry<'posts'>;

// Published posts, newest first. Drafts are visible only in `astro dev`.
export async function getPosts() {
	const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function postUrl(post: Post) {
	return `/${tabOf(post.data.category)}/${post.id}/`;
}

export function tagSlug(tag: string) {
	return tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Tag filter link on a tab's listing page
export function tagUrl(tab: string, tag: string) {
	return `/${tab}/?tag=${tagSlug(tag)}`;
}
