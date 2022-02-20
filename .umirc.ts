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
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
  layout: {},
});
