import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://buildify.bg',
  integrations: [sitemap(), tailwind()],
  output: 'static',
  redirects: {
    '/plugini':   '/plugins',
    '/ai-botove': '/ai-bots',
  },
});