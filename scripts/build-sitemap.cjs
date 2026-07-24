const fs = require('fs');
const path = require('path');

const siteUrl = 'https://dradrianocamillo.com';

const CITIES_SUFFIXES = [
  'sao-lourenco-do-oeste',
  'chapeco',
  'pato-branco',
  'ampere',
  'realeza',
  'novo-horizonte',
  'francisco-beltrao',
  'dois-vizinhos',
  'palmas',
  'xanxere',
  'maravilha',
  'pinhalzinho',
  'curitiba'
];

const BASE_SERVICES = [
  'odontologia-estetica',
  'implantes-dentarios',
  'ortodontia',
  'harmonizacao-orofacial',
  'dtm-dor-orofacial',
  'ozonioterapia',
  'aluguel-de-hifu'
];

const urls = [
  { loc: `${siteUrl}/`, priority: '1.0', changefreq: 'monthly' },
  { loc: `${siteUrl}/hifu`, priority: '0.9', changefreq: 'monthly' },
];

BASE_SERVICES.forEach((service) => {
  CITIES_SUFFIXES.forEach((citySuffix) => {
    // REGRA DE CURITIBA
    if (citySuffix === 'curitiba' && service !== 'aluguel-de-hifu') return;

    let pagePath = '';
    // Todos os serviços usam apenas o slug base se for a cidade principal
    if (citySuffix === 'sao-lourenco-do-oeste') {
      pagePath = `/${service}`;
    } else {
      pagePath = `/${service}-${citySuffix}`;
    }
    urls.push({ loc: `${siteUrl}${pagePath}`, priority: '0.8', changefreq: 'monthly' });
  });
});

urls.push({ loc: `${siteUrl}/politica-de-privacidade`, priority: '0.3', changefreq: 'yearly' });

const today = new Date().toISOString().split('T')[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, xml, 'utf8');

console.log(`Sitemap gerado com ${urls.length} URLs em ${sitemapPath}`);
