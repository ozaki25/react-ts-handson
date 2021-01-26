const dayjs = require('dayjs');

module.exports = {
  title: 'React TS Handson',
  themeConfig: {
    domain: 'https://react-ts-handson.ozaki25.vercel.app',
    repo: 'ozaki25/react-ts-handson',
    repoLabel: 'GitHub',
    sidebar: [
      '/1_setup',
      '/2_initialfile',
      '/3_hello',
      '/4_counter',
      '/5_todolist',
      '/6_routing',
      '/7_communication',
    ],
  },
  markdown: {
    lineNumbers: true,
  },
  plugins: {
    '@vuepress/last-updated': {
      transformer: (timestamp, lang) => {
        return dayjs(timestamp).format('YYYY/MM/DD');
      },
    },
    '@vuepress/back-to-top': {},
    '@vuepress/medium-zoom': {},
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: true,
    },
    seo: {
      description: () => 'ハンズオン資料',
    },
  },
  head: [['link', { rel: 'manifest', href: '/manifest.json' }]],
};
