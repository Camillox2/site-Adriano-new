// Regras de indexação compartilhadas pelos scripts de build (sitemap, páginas
// estáticas e meta robots). Fonte: src/data/seo-index-policy.json + blog.
const path = require('path');
const policy = require('../src/data/seo-index-policy.json');
const { loadSrcModule } = require('./load-src-module.cjs');

const normalizePath = (pathname = '/') => (pathname === '/' ? '/' : pathname.replace(/\/+$/, ''));

const blogPaths = () => {
  const { BLOG_POSTS } = loadSrcModule(path.join(__dirname, '..', 'src', 'data', 'blogPosts.js'));
  return BLOG_POSTS.map((post) => `/blog/${post.slug}`);
};

const isIndexablePath = (pathname) => {
  const pagePath = normalizePath(pathname);

  if (policy.corePaths.includes(pagePath)) return true;
  if (pagePath.startsWith('/blog/')) return blogPaths().includes(pagePath);

  if (pagePath.startsWith('/servicos/')) {
    return policy.indexableRegionalCities.includes(pagePath.slice('/servicos/'.length));
  }

  if (!/^\/[a-z0-9-]+$/.test(pagePath)) return false;

  const slug = pagePath.slice(1);
  return Object.entries(policy.indexableServiceCities).some(([service, cities]) => {
    if (slug === service) return cities.includes(policy.primaryCity);
    if (!slug.startsWith(`${service}-`)) return false;
    const city = slug.slice(service.length + 1);
    return city !== policy.primaryCity && cities.includes(city);
  });
};

const sitemapPaths = () => {
  const urls = [...policy.corePaths];
  policy.indexableRegionalCities.forEach((city) => urls.push(`/servicos/${city}`));
  Object.entries(policy.indexableServiceCities).forEach(([service, cities]) => {
    cities.forEach((city) => urls.push(city === policy.primaryCity ? `/${service}` : `/${service}-${city}`));
  });
  urls.push(...blogPaths());
  return [...new Set(urls)];
};

module.exports = { normalizePath, isIndexablePath, sitemapPaths };
