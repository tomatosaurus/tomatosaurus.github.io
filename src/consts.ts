// Global site configuration. Edit these values after creating your GitHub repo.

// Final public URL of the blog (custom domain or https://<username>.github.io).
// Used for canonical URLs, sitemap, RSS and Open Graph tags.
export const SITE_URL = 'https://tomatosaurus.github.io';

export const SITE_TITLE = 'Dev Notes';
export const SITE_DESCRIPTION =
	'Practical troubleshooting, machine learning and cloud infrastructure notes from production.';
export const AUTHOR_NAME = 'Your Name';
export const AUTHOR_GITHUB = 'https://github.com/tomatosaurus';
export const AUTHOR_DEVTO = 'https://dev.to/your-devto-id';

// Giscus comments — generate these values at https://giscus.app
// Leave `repoId` empty to hide the comment section.
export const GISCUS = {
	repo: 'tomatosaurus/tomatosaurus.github.io',
	repoId: '',
	category: 'Announcements',
	categoryId: '',
	mapping: 'pathname',
	lang: 'en',
} as const;
