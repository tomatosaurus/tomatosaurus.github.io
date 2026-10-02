// Global site configuration. Edit these values after creating your GitHub repo.

// Final public URL of the blog (custom domain or https://<username>.github.io).
// Used for canonical URLs, sitemap, RSS and Open Graph tags.
export const SITE_URL = 'https://tomatosaurus.github.io';

export const SITE_TITLE = 'Tomato AI Cuisine';
export const SITE_DESCRIPTION = 'FDE @ Google. Study & Solve real-world problems.';
export const AUTHOR_NAME = 'TomatoSaurus';
export const AUTHOR_GITHUB = 'https://github.com/tomatosaurus';
export const AUTHOR_LINKEDIN = 'https://www.linkedin.com/in/jhpark9701/';

// Giscus comments — generate these values at https://giscus.app
// Leave `repoId` empty to hide the comment section.
export const GISCUS = {
	repo: 'tomatosaurus/tomatosaurus.github.io',
	repoId: 'R_kgDOU04-1A',
	category: 'Announcements',
	categoryId: 'DIC_kwDOU04-1M4DGvF7',
	mapping: 'pathname',
	lang: 'en',
} as const;

// GoatCounter visitor stats — sign up at https://www.goatcounter.com with this code,
// then enable Settings → "Allow adding visitor counts on your website".
// Total and today's visitors show under the header on the main page; per-post views
// show in post lists and on each post.
// Leave empty to disable tracking and hide the counters.
export const GOATCOUNTER = 'tomatosaurus';
