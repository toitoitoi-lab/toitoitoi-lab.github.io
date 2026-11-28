import { defineConfig } from 'astro/config';
import i18nDe from './scripts/i18n-de.mjs';

export default defineConfig({
  site: 'https://toitoitoi-lab.github.io',
  trailingSlash: 'always',
  // ドイツ語版 /de/ は、ビルドのあとで英語版から作る（訳は src/i18n/de.json）
  integrations: [i18nDe()],
});
