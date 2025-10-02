import { defineConfig, envField } from 'astro/config';

export default defineConfig({
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'uz', 'en'],
    routing: {
      prefix: 'never',
      redirectToDefaultLocale: false
    }
  },
  env: {
    schema: {
      YANDEX_MAPS_API_KEY: envField.string({
        context: 'client',
        access: 'public'
      })
    }
  }
});