import { defineConfig } from 'vitepress';

export default defineConfig({
  base: '/v-datatable-plus/',
  title: 'Vuetify DataTable Plus',
  description: 'Documentation for Vuetify Datatable Plus',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/componentdocs/vdatatableplus' },
      { text: 'API', link: '/api/vdatatableplus' },
      { text: 'GitHub', link: 'https://github.com/ansaripro/v-datatable-plus' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Getting Started', link: '/getting-started/' },
        ],
      },
      {
        text: 'Components',
        items: [
          { text: 'VDataTablePlus', link: '/componentdocs/vdatatableplus' },
          { text: 'VDataTableServerPlus', link: '/componentdocs/vdatatableserverplus' },
          { text: 'ResizeableSplitter', link: '/componentdocs/resizeablesplitter' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'VDataTablePlus', link: '/api/vdatatableplus' },
          { text: 'VDataTableServerPlus', link: '/api/vdatatableserverplus' },
          { text: 'ResizeableSplitter', link: '/api/resizeablesplitter' },
        ],
      },
    ],
  },
  theme: {
    extend: '@vitepress/theme',
  },
  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Filled'
      }
    ]
  ]
});