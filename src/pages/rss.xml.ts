import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
import { getCategory } from '../categories';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { parseImageSize } from '../lib/image-size';
import { getPosts, postUrl } from '../lib/posts';

const parser = new MarkdownIt();

function absolutize(attr: string, site: URL): sanitizeHtml.Transformer {
	return (tagName, attribs) => ({
		tagName,
		attribs: attribs[attr] ? { ...attribs, [attr]: new URL(attribs[attr], site).href } : attribs,
	});
}

// Same caption-as-width convention as the site (src/lib/image-size.ts). Feed readers
// drop inline styles, so pixel widths go in the width attribute and % widths are dropped.
function sizedImage(site: URL): sanitizeHtml.Transformer {
	const absolute = absolutize('src', site);
	return (tagName, attribs) => {
		const size = parseImageSize(attribs.title);
		if (!size) return absolute(tagName, attribs);
		const { title: _hint, ...rest } = attribs;
		if (size.caption) rest.title = size.caption;
		if (size.unit === 'px') rest.width = String(size.amount);
		return absolute(tagName, rest);
	};
}

// Full-content feed so Dev.to's RSS import can pull whole articles.
// Dev.to sets each imported post's canonical_url to the item link (this blog).
export async function GET(context: APIContext) {
	const posts = await getPosts();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site!,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			categories: [
				...(getCategory(post.data.category)?.trail.map((c) => c.label) ?? []),
				...post.data.tags,
			],
			link: postUrl(post),
			content: sanitizeHtml(parser.render(post.body ?? ''), {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
				// Root-relative URLs (e.g. /uploads/x.png) break once imported elsewhere
				transformTags: {
					img: sizedImage(context.site!),
					a: absolutize('href', context.site!),
				},
			}),
		})),
	});
}
