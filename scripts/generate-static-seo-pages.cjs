// Gera um index.html por rota real do site (build/<rota>/index.html) com
// título, descrição, canonical, JSON-LD e H1 (noscript) vindos dos MESMOS dados
// usados pelo React (src/data/pageMeta.js e src/data/servicePages.js).
// Também gera build/404.html, servido pela Vercel com status 404.
const fs = require('fs');
const path = require('path');
const { loadSrcModule } = require('./load-src-module.cjs');
const { isIndexablePath, sitemapPaths } = require('./seo-paths.cjs');

const siteUrl = 'https://dradrianocamillo.com';
const buildDirectory = path.join(__dirname, '..', 'build');
const srcData = (file) => loadSrcModule(path.join(__dirname, '..', 'src', 'data', file));

const { PAGE_META, NOT_FOUND_META, blogPostMeta } = srcData('pageMeta.js');
const { SERVICE_PAGE_LIST } = srcData('servicePages.js');
const { BLOG_POSTS } = srcData('blogPosts.js');

const canonicalPath = (pagePath) => (pagePath === '/' ? '/' : `${pagePath.replace(/\/+$/, '')}/`);
const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');
const escapeJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

const primaryServices = SERVICE_PAGE_LIST.filter((page) => page.citySlug === 'sao-lourenco-do-oeste');

const pages = [];

Object.entries(PAGE_META).forEach(([pagePath, meta]) => {
  const page = { path: pagePath, ...meta };
  if (meta.schemaType === 'CollectionPage') {
    page.items = pagePath === '/blog'
      ? BLOG_POSTS.map((post) => ({ name: post.title, path: `/blog/${post.slug}` }))
      : [{ name: 'HIFU — Ultrassom Microfocado', path: '/hifu' }, ...primaryServices.map((service) => ({ name: service.label, path: `/${service.slug}` }))];
  }
  pages.push(page);
});

SERVICE_PAGE_LIST.forEach((service) => {
  pages.push({
    path: `/${service.slug}`,
    title: service.title,
    description: service.description,
    h1: service.heading,
    serviceName: service.label,
    cityName: service.cityName,
  });
});

BLOG_POSTS.forEach((post) => {
  pages.push({ path: `/blog/${post.slug}`, ...blogPostMeta(post), post });
});

// Garantia: tudo o que é gerado é indexável e tudo o que vai para o sitemap é gerado.
const generatedPaths = new Set(pages.map((page) => page.path));
pages.forEach((page) => {
  if (!isIndexablePath(page.path)) throw new Error(`Página gerada sem política de indexação: ${page.path}`);
});
sitemapPaths().forEach((pagePath) => {
  if (!generatedPaths.has(pagePath)) throw new Error(`URL do sitemap sem página gerada: ${pagePath}`);
});

const replaceTag = (html, matcher, replacement) => {
  if (!matcher.test(html)) throw new Error(`Não foi possível encontrar a tag esperada: ${matcher}`);
  return html.replace(matcher, replacement);
};

const schemaFor = (page, url) => {
  if (page.schema === false || page.path === '/') return null;
  if (page.schemaType === 'CollectionPage') {
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: page.h1,
      description: page.description,
      url,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: page.items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          url: `${siteUrl}${canonicalPath(item.path)}`,
        })),
      },
    };
  }
  if (page.post) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: page.post.title,
      description: page.description,
      datePublished: page.post.date,
      author: { '@type': 'Person', name: page.post.author },
      publisher: { '@id': `${siteUrl}/#clinica` },
      url,
      mainEntityOfPage: url,
    };
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.serviceName || page.h1,
    description: page.description,
    url,
    provider: { '@id': `${siteUrl}/#clinica` },
    areaServed: { '@type': 'City', name: page.cityName || 'São Lourenço do Oeste' },
  };
};

const applyHead = (baseHtml, page, { noindex = false } = {}) => {
  const url = `${siteUrl}${canonicalPath(page.path)}`;
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  let html = baseHtml;

  html = replaceTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  html = replaceTag(html, /<meta name="description" content="[^"]*"\s*\/?\s*>/i, `<meta name="description" content="${description}" />`);
  html = replaceTag(html, /<meta property="og:title" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:title" content="${title}" />`);
  html = replaceTag(html, /<meta property="og:description" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:description" content="${description}" />`);
  html = replaceTag(html, /<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/i, `<meta name="twitter:title" content="${title}" />`);
  html = replaceTag(html, /<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/i, `<meta name="twitter:description" content="${description}" />`);

  if (noindex) {
    html = replaceTag(html, /\s*<link rel="canonical" href="[^"]*"\s*\/?\s*>/i, '');
    html = replaceTag(html, /<meta property="og:url" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:url" content="${siteUrl}/" />`);
    html = replaceTag(html, /<meta name="robots" content="[^"]*"\s*\/?\s*>/i, '<meta name="robots" content="noindex, follow" />');
  } else {
    html = replaceTag(html, /<link rel="canonical" href="[^"]*"\s*\/?\s*>/i, `<link rel="canonical" href="${url}" />`);
    html = replaceTag(html, /<meta property="og:url" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:url" content="${url}" />`);
    const schema = schemaFor(page, url);
    if (schema) {
      html = html.replace('</head>', `  <script id="static-route-jsonld" type="application/ld+json">${escapeJson(schema)}</script>\n</head>`);
    }
  }

  const noscript = `<noscript><main><h1>${escapeHtml(page.h1)}</h1><p>${description}</p><p>Agende sua avaliação pelo WhatsApp: <a href="https://wa.me/5549998362864">(49) 9 9836-2864</a>.</p></main></noscript>`;
  return replaceTag(html, /<noscript>[\s\S]*?<\/noscript>/i, noscript);
};

const baseHtmlPath = path.join(buildDirectory, 'index.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

for (const page of pages) {
  const outputDirectory = path.join(buildDirectory, page.path.slice(1));
  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.writeFileSync(path.join(outputDirectory, 'index.html'), applyHead(baseHtml, page), 'utf8');
}

fs.writeFileSync(
  path.join(buildDirectory, '404.html'),
  applyHead(baseHtml, { path: '/404', ...NOT_FOUND_META }, { noindex: true }),
  'utf8'
);

console.log(`Páginas SEO estáticas geradas com sucesso: ${pages.length} (+ 404.html)`);
