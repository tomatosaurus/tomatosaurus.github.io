// @ts-check

import { satteri } from '@astrojs/markdown-satteri';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { SITE_URL } from './src/consts.ts';
import { imageSizePlugin } from './src/lib/image-size.ts';

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	trailingSlash: 'always',
	integrations: [mdx(), sitemap()],
	build: {
		// Inline CSS into each page. GitHub Pages lets browsers cache HTML for 10 minutes, and a
		// deploy deletes the old hashed CSS files, so a cached page would otherwise load unstyled.
		inlineStylesheets: 'always',
	},
	markdown: {
		// Image width from the caption, e.g. "300" or "50%" (src/lib/image-size.ts)
		processor: satteri({ hastPlugins: [imageSizePlugin] }),
		shikiConfig: {
			themes: { light: 'github-light', dark: 'github-dark' },
		},
	},
	fonts: [
		{
			// Serif reading face for post bodies
			provider: fontProviders.google(),
			name: 'Source Serif 4',
			cssVariable: '--font-serif',
			weights: [400, 600],
			styles: ['normal', 'italic'],
			fallbacks: ['Georgia', 'serif'],
		},
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
