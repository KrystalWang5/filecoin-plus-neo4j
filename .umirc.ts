import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title: 'Filecoin Plus',
  routes: [
    { path: '/', exact: true, redirect: '/antv' },
    { path: '/antv', component: '@/pages/antv/index' },
    { path: '/d3', component: '@/pages/d3/index' },
    { path: '/neovis', component: '@/pages/neovis/index' },
    { path: '/neo4j', component: '@/pages/neo4j/index' },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
  layout: {},
  chainWebpack: (config) => {
    // 覆盖 svg rule
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('url-loader')
      .loader(require.resolve('@umijs/deps/compiled/url-loader'))
      .options({
        limit: 1024 * 10,
        name: 'static/[name].[hash:8].[ext]',
        esModule: false,
        fallback: {
          loader: require.resolve('@umijs/deps/compiled/file-loader'),
          options: {
            name: 'static/[name].[hash:8].[ext]',
            esModule: false,
          },
        },
      })
      .end();
  },
});
