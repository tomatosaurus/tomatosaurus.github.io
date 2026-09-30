import { defineConfig } from 'tinacms';
import { CATEGORY_LIST } from '../src/categories';

// Tina Cloud credentials (free plan) — https://app.tina.io
// Local editing (`npm run dev` → http://localhost:4321/admin/) works without them.
const branch = process.env.GITHUB_BRANCH || process.env.HEAD || 'main';

export default defineConfig({
	branch,
	clientId: process.env.TINA_CLIENT_ID ?? null,
	token: process.env.TINA_TOKEN ?? null,

	build: {
		outputFolder: 'admin',
		publicFolder: 'public',
	},
	media: {
		tina: {
			mediaRoot: 'uploads',
			publicFolder: 'public',
		},
	},
	// Keep fields in sync with src/content.config.ts
	schema: {
		collections: [
			{
				name: 'blog',
				label: 'Blog Posts',
				path: 'src/content/blog',
				format: 'md',
				ui: {
					filename: {
						// Slug from title, e.g. "Fix CUDA OOM" → fix-cuda-oom
						slugify: (values) =>
							(values?.title ?? '')
								.toLowerCase()
								.replace(/[^a-z0-9]+/g, '-')
								.replace(/^-|-$/g, ''),
					},
				},
				defaultItem: () => ({
					pubDate: new Date().toISOString(),
					draft: true,
					tags: [],
				}),
				fields: [
					{ type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
					{
						type: 'string',
						name: 'description',
						label: 'Description (SEO meta, ~150 chars)',
						required: true,
						ui: { component: 'textarea' },
					},
					{ type: 'datetime', name: 'pubDate', label: 'Publish date', required: true },
					{ type: 'datetime', name: 'updatedDate', label: 'Updated date' },
					{
						type: 'string',
						name: 'category',
						label: 'Category',
						required: true,
						// Edit src/categories.ts to add categories
						options: CATEGORY_LIST.map((c) => ({
							value: c.path,
							label: c.trail.map((t) => t.label).join(' / '),
						})),
					},
					{ type: 'string', name: 'tags', label: 'Tags', list: true },
					{ type: 'boolean', name: 'draft', label: 'Draft (hidden in production)' },
					{ type: 'rich-text', name: 'body', label: 'Body', isBody: true },
				],
			},
		],
	},
});
