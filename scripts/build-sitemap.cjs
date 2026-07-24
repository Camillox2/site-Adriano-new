const fs = require('fs');
const path = require('path');
const policy = require('../src/data/seo-index-policy.json');

const siteUrl = 'https://dradrianocamillo.com';

const urls = [...policy.corePaths];

policy.indexableRegionalCities.forEach((city) => {
  urls.push(`/servicos/${city}`);
});

Object.entries(policy.indexableServiceCities).forEach(([service, cities]) => {
  cities.forEach((city) => {
    urls.push(city === policy.primaryCity ? `/${service}` : `/${service}-${city}`);
  });
});

const uniqueUrls = [...new Set(urls)];
const today = new Date().toISOString().split('T')[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls.map((pagePath) => `  <url>
    <loc>${siteUrl}${pagePath}</loc>
    <lastmod>${today}</lastmod>
  </url>`).join('\n')}
</urlset>`;

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, xml, 'utf8');

console.log(`Sitemap gerado com ${uniqueUrls.length} URLs indexáveis em ${sitemapPath}`);
