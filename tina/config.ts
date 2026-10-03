import { createElement } from 'react';
import { defineConfig, wrapFieldsWithMeta } from 'tinacms';
import { CATEGORY_LIST } from '../src/categories';

// Tina Cloud credentials (free plan) — https://app.tina.io
// Local editing (`npm run dev` → http://localhost:4321/admin/) works without them.
const slugField = {
	type: 'string',
	name: 'slug',
	label: 'Slug (URL, lowercase-with-dashes)',
	required: true,
	ui: {
		validate: (value?: string) =>
			value && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(value)
				? 'Use lowercase letters, numbers and dashes only'
				: undefined,
	},
} as const;
const labelField = { type: 'string', name: 'label', label: 'Label', required: true } as const;
const itemLabel = (item: { label?: string }) => ({ label: item?.label || 'New item' });

// Tab / category picker built from src/data/categories.json at editor build time
const categorySelect = wrapFieldsWithMeta<{}, { value?: string; onChange: (v: string) => void }>(
	({ input }) =>
		createElement(
			'select',
			{
				value: input.value ?? '',
				onChange: (e: { target: { value: string } }) => input.onChange(e.target.value),
				style: {
					width: '100%',
					padding: '0.5rem 0.75rem',
					border: '1px solid #e1ddec',
					borderRadius: '0.375rem',
					background: 'white',
					fontSize: '0.875rem',
				},
			},
			createElement('option', { value: '' }, 'Select a category…'),
			...CATEGORY_LIST.map((c) =>
				createElement(
					'option',
					{ key: c.path, value: c.path },
					c.trail.map((t) => t.label).join(' / '),
				),
			),
		),
);

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
				// Header tabs → categories → sub-categories (src/data/categories.json)
				name: 'categories',
				label: 'Tabs & Categories',
				path: 'src/data',
				format: 'json',
				match: { include: 'categories' },
				ui: { allowedActions: { create: false, delete: false } },
				fields: [
					{
						type: 'object',
						name: 'tabs',
						label: 'Tabs',
						list: true,
						ui: { itemProps: itemLabel },
						fields: [
							slugField,
							labelField,
							{
								type: 'object',
								name: 'children',
								label: 'Categories',
								list: true,
								ui: { itemProps: itemLabel },
								fields: [
									slugField,
									labelField,
									{
										type: 'object',
										name: 'children',
										label: 'Sub-categories',
										list: true,
										ui: { itemProps: itemLabel },
										fields: [slugField, labelField],
									},
								],
							},
						],
					},
				],
			},
			{
				name: 'posts',
				label: 'Posts',
				path: 'src/content/posts',
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
						label: 'Description (SEO meta, ~150 chars, optional)',
						required: false,
						ui: { component: 'textarea' },
					},
					{ type: 'datetime', name: 'pubDate', label: 'Publish date', required: true },
					{ type: 'datetime', name: 'updatedDate', label: 'Updated date' },
					{
						type: 'string',
						name: 'category',
						label: 'Category',
						required: true,
						// Options are rendered by a custom component rather than `options`: the
						// schema is locked in tina-lock.json, so options there would make every
						// category edit fail the Tina Cloud schema check until the lock is rebuilt.
						ui: {
							component: categorySelect,
							validate: (value?: string) =>
								value && !CATEGORY_LIST.some((c) => c.path === value)
									? 'Unknown category — add it under Tabs & Categories first'
									: undefined,
						},
					},
					{ type: 'string', name: 'tags', label: 'Tags', list: true },
					{ type: 'boolean', name: 'draft', label: 'Draft (hidden in production)' },
					{ type: 'rich-text', name: 'body', label: 'Body', isBody: true },
				],
			},
		],
	},
});
