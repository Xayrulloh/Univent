import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'uz', 'en'],
    routing: {
      prefix: 'always',
      redirectToDefaultLocale: false
    }
  },
  output: 'server',
  adapter: vercel()
});