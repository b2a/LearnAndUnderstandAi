import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Für GitHub Pages: https://<user>.github.io/<repo>/
// Lokal oder bei eigener Domain einfach SITE / BASE_PATH als Umgebungsvariable setzen.
const site = process.env.SITE ?? 'https://b2a.github.io';
const base = process.env.BASE_PATH ?? '/LearnAndUnderstandAi';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [mdx()],
});
