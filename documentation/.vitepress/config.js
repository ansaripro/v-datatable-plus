import { defineConfig } from 'vitepress';

export default defineConfig({
  base: '/v-datatable-plus/',
  title: 'Vuetify DataTable Plus',
  cleanUrls: true,
  lastUpdated: true,
  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
  },
  description: 'Enhanced wrappers for Vuetify VDataTable and VDataTableServer with filters, column menu, and native drag reorder.',
  themeConfig: {
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Migration', link: '/migration' },
      { text: 'Components', link: '/componentdocs/vdatatableplus' },
      { text: 'API', link: '/api/vdatatableplus' },
      { text: 'GitHub', link: 'https://github.com/ansaripro/v-datatable-plus' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Migration', link: '/migration' },
        ],
      },
      {
        text: 'Components',
        items: [
          { text: 'VDatatablePlus', link: '/componentdocs/vdatatableplus' },
          { text: 'VDatatableServerPlus', link: '/componentdocs/vdatatableserverplus' },
          { text: 'ResizeableSplitter', link: '/componentdocs/resizeablesplitter' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'VDatatablePlus', link: '/api/vdatatableplus' },
          { text: 'VDatatableServerPlus', link: '/api/vdatatableserverplus' },
          { text: 'ResizeableSplitter', link: '/api/resizeablesplitter' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ansaripro/v-datatable-plus' },
    ],
    editLink: {
      pattern: 'https://github.com/ansaripro/v-datatable-plus/edit/main/documentation/:path',
      text: 'Edit this page on GitHub',
    },
  },
  theme: {
    extend: '@vitepress/theme',
  },
  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css'
      }
    ]
  ]
});