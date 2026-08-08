const fs = require('fs');
const path = require('path');
const policy = require('../src/data/seo-index-policy.json');

const buildDirectory = path.join(__dirname, '..', 'build');
const INDEX_DIRECTIVE = 'index, follow, max-image-preview:large';
const NOINDEX_DIRECTIVE = 'noindex, follow';

const normalizePath = (pathname = '/') => {
  if (pathname === '/') return '/';
  return pathname.replace(/\/+$/, '');
};

const isIndexablePath = (pathname) => {
  const pagePath = normalizePath(pathname);

  if (policy.corePaths.includes(pagePath) || pagePath.startsWith('/blog')) return true;

  if (pagePath.startsWith('/servicos/')) {
    const city = pagePath.slice('/servicos/'.length);
    return policy.indexableRegionalCities.includes(city);
  }

  if (!/^\/[a-z0-9-]+$/.test(pagePath)) return false;

  const slug = pagePath.slice(1);
  return Object.entries(policy.indexableServiceCities).some(([service, cities]) => {
    if (slug === service) return cities.includes(policy.primaryCity);
    if (!slug.startsWith(`${service}-`)) return false;
    return cities.includes(slug.slice(service.length + 1));
  });
};

const collectIndexFiles = (directory) => {
  const files = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...collectIndexFiles(fullPath));
    if (entry.isFile() && entry.name === 'index.html') files.push(fullPath);
  }

  return files;
};

const pathFromFile = (filePath) => {
  const relativeDirectory = path.relative(buildDirectory, path.dirname(filePath));
  if (!relativeDirectory) return '/';
  return `/${relativeDirectory.split(path.sep).join('/')}`;
};

if (!fs.existsSync(buildDirectory)) {
  throw new Error('Diretório build não encontrado. Execute o build do React antes desta etapa.');
}

let indexed = 0;
let noindexed = 0;

for (const filePath of collectIndexFiles(buildDirectory)) {
  const pagePath = pathFromFile(filePath);
  const directive = isIndexablePath(pagePath) ? INDEX_DIRECTIVE : NOINDEX_DIRECTIVE;
  let html = fs.readFileSync(filePath, 'utf8');

  const robotsTag = `<meta name="robots" content="${directive}" />`;
  if (/<meta name="robots" content="[^"]*"\s*\/?\s*>/i.test(html)) {
    html = html.replace(/<meta name="robots" content="[^"]*"\s*\/?\s*>/i, robotsTag);
  } else {
    html = html.replace('</head>', `  ${robotsTag}\n</head>`);
  }

  fs.writeFileSync(filePath, html, 'utf8');

  if (directive === INDEX_DIRECTIVE) indexed += 1;
  else noindexed += 1;
}

console.log(`Política de indexação aplicada: ${indexed} indexáveis e ${noindexed} com noindex.`);
