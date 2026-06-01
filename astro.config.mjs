import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const githubUser = 'wissenschaft-samono';
const repositoryName = 'wissenschaft-samono.github.io';
const isProjectSite = !repositoryName.endsWith('.github.io');

export default defineConfig({
  site: `https://${githubUser}.github.io`,
  base: isProjectSite ? `/${repositoryName}` : '/',
  integrations: [sitemap()],
});
