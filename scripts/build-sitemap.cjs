const fs = require('fs');
const path = require('path');
const { sitemapPaths } = require('./seo-paths.cjs');

const siteUrl = 'https://dradrianocamillo.com';
const uniqueUrls = sitemapPaths();
const today = new Date().toISOString().split('T')[0];
const canonicalPath = (pagePath) => pagePath === '/' ? '/' : `${pagePath.replace(/\/+$/, '')}/`;

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls.map((pagePath) => `  <url>
    <loc>${siteUrl}${canonicalPath(pagePath)}</loc>
    <lastmod>${today}</lastmod>
  </url>`).join('\n')}
</urlset>`;

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, xml, 'utf8');

console.log(`Sitemap gerado com ${uniqueUrls.length} URLs indexáveis em ${sitemapPath}`);
