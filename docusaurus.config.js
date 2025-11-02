// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Logic Baron',
  tagline: 'Math, Information and Machine Learning',
  favicon: '/img/logicbaron_32.ico',

  // Set the production url of your site here
  url: 'https://logicbaron.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'logicbaron', // Usually your GitHub org/user name.
  projectName: 'logicbaron.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      // 'classic',
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/logicbaron/logicbaron.github.io/tree/dev/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex]
        },
        blog: {
          showReadingTime: true,
          postsPerPage: 5,
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`,
          },
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'ALL posts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/logicbaron/logicbaron.github.io/tree/dev/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: ['en', 'ko'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: '/docs',
        blogRouteBasePath: '/blog',
        searchBarShortcut: false,
        searchBarShortcutHint: false,
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/logicbaron_social_card.jpg',
      navbar: {
        title: 'LogicBaron',
        logo: {
          alt: 'EyeStone Logo',
          src: 'img/logicbaron.svg',
        },
        style: 'dark',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'CommunitySidebar',
            position: 'left',
            label: 'Hello, Baron'
          },
          {
            type: 'dropdown',
            label: 'AIPapers',
            position: 'left',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'BigtechSidebar',
                label: 'Monthly BigTech'
              },
              {
                type: 'docSidebar',
                sidebarId: 'Y2025Sidebar',
                label: 'Daily 2025'
              },
            ]
          },
          {
            type: 'dropdown',
            label: 'Concept',
            position: 'left',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'MathSidebar',
                label: 'Math'
              },
              {
                type: 'docSidebar',
                sidebarId: 'ProgrammingSidebar',
                label: 'Programming'
              },
              {
                type: 'docSidebar',
                sidebarId: 'TorchSidebar',
                label: 'Torch',
              },
              {
                type: 'docSidebar',
                sidebarId: 'MLConceptSidebar',
                label: 'Machine Learning'
              },
              {
                type: 'docSidebar',
                sidebarId: 'DeepLearningSidebar',
                label: 'Deep Learning'
              },
              {
                type: 'docSidebar',
                sidebarId: 'LargeModelConceptSidebar',
                label: 'Large Model'
              },
            ]
          },
          {
            type: 'dropdown',
            label: 'Data',
            position: 'left',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'DataImageSidebar',
                label: 'Image'
              },
              {
                type: 'docSidebar',
                sidebarId: 'DataTextSidebar',
                label: 'Text'
              }
            ]
          },
          {
            type: 'dropdown',
            label: 'Models',
            position: 'left',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'MLModelSidebar',
                label: 'ML Models'
              },
              {
                type: 'docSidebar',
                sidebarId: 'AIModelSidebar',
                label: 'AI Models'
              },
              {
                type: 'docSidebar',
                sidebarId: 'LargeModelSidebar',
                label: 'Large Models'
              },
            ]
          },
          {
            type: 'dropdown',
            label: 'Tasks',
            position: 'left',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'LLMSidebar',
                label: 'LLM Engineering'
              },
              {
                type: 'docSidebar',
                sidebarId: 'EfficienttrainSidebar',
                label: 'EfficientTrain'
              },
              {
                type: 'docSidebar',
                sidebarId: 'MlopsSidebar',
                label: 'Mlops'
              },
              {
                type: 'docSidebar',
                sidebarId: 'RecommendationSidebar',
                label: 'Recommendation'
              },
              {
                type: 'docSidebar',
                sidebarId: 'RetrievalSidebar',
                label: 'Retrieval'
              },
              {
                type: 'docSidebar',
                sidebarId: 'KnowledgegraphSidebar',
                label: 'Knowledge Graph',
              },
              {
                type: 'docSidebar',
                sidebarId: 'InformationextractionSidebar',
                label: 'Information Extraction'
              },
              {
                type: 'docSidebar',
                sidebarId: 'EtcSidebar',
                label: 'etc.'
              }
            ]
          },
          {to: '/blog', label: 'Blog', position: 'right'},
          {
            href: 'https://github.com/logicbaron',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Hello, Lapis',
                to: '/docs/community/hello',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/or7l_floll/',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/jhpark9701/'
              }
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://https://github.com/logicbaron',
              },
              {
                label: 'leetcode',
                href: 'https://leetcode.com/superstone/'
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['powershell','bash','python'],
      },
    }),
};

export default config;
