import { defineConfig } from 'astro/config';

export default defineConfig({
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'uz', 'en'],
    routing: {
      prefix: 'always',
      redirectToDefaultLocale: false
    }
  },
});