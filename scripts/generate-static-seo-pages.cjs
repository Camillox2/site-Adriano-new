const fs = require('fs');
const path = require('path');

const siteUrl = 'https://dradrianocamillo.com';
const buildDirectory = path.join(__dirname, '..', 'build');

const pages = [
  {
    path: '/hifu',
    name: 'HIFU — Ultrassom Microfocado',
    title: 'HIFU em São Lourenço do Oeste — Ultrassom Microfocado | Dr. Adriano Camillo',
    description:
      'Lifting facial sem cirurgia com HIFU (Ultrassom Microfocado) em São Lourenço do Oeste - SC. Veja benefícios, cuidados e agende sua avaliação.',
  },
  {
    path: '/odontologia-estetica-sao-lourenco-do-oeste',
    name: 'Odontologia Estética',
    title: 'Odontologia Estética em São Lourenço do Oeste | Dr. Adriano Camillo',
    description:
      'Odontologia estética em São Lourenço do Oeste - SC, com avaliação individual e planejamento que respeita saúde, função e naturalidade do sorriso.',
  },
  {
    path: '/implantes-dentarios-sao-lourenco-do-oeste',
    name: 'Implantes Dentários',
    title: 'Implantes Dentários em São Lourenço do Oeste | Dr. Adriano Camillo',
    description:
      'Implantes dentários em São Lourenço do Oeste - SC, com avaliação clínica, exames e planejamento individual para reabilitação do sorriso.',
  },
  {
    path: '/ortodontia-sao-lourenco-do-oeste',
    name: 'Ortodontia',
    title: 'Ortodontia em São Lourenço do Oeste | Dr. Adriano Camillo',
    description:
      'Ortodontia em São Lourenço do Oeste - SC para avaliação do alinhamento dental e da mordida, com planejamento individual e acompanhamento próximo.',
  },
  {
    path: '/harmonizacao-orofacial-sao-lourenco-do-oeste',
    name: 'Harmonização Orofacial',
    title: 'Harmonização Orofacial em São Lourenço do Oeste | Dr. Adriano Camillo',
    description:
      'Harmonização orofacial em São Lourenço do Oeste - SC, com avaliação facial individual, orientação responsável e foco em resultados naturais.',
  },
  {
    path: '/dtm-dor-orofacial',
    name: 'DTM e Dor Orofacial',
    title: 'DTM e Dor Orofacial em São Lourenço do Oeste | Dr. Adriano Camillo',
    description:
      'Avaliação de DTM e dor orofacial em São Lourenço do Oeste - SC, com escuta clínica, investigação individual e orientação para cada caso.',
  },
  {
    path: '/ozonioterapia-sao-lourenco-do-oeste',
    name: 'Ozonioterapia',
    title: 'Ozonioterapia em São Lourenço do Oeste | Dr. Adriano Camillo',
    description:
      'Ozonioterapia odontológica em São Lourenço do Oeste - SC. Terapia biológica com ação bactericida e aceleradora da cicatrização pós-operatória.',
  },
  {
    path: '/politica-de-privacidade',
    name: 'Política de Privacidade',
    title: 'Política de Privacidade | Dr. Adriano Camillo',
    description: 'Política de privacidade do site do Dr. Adriano Camillo.',
    schema: false,
  },
];

const escapeJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

const replaceMeta = (html, matcher, replacement) => {
  if (!matcher.test(html)) {
    throw new Error(`Não foi possível encontrar a tag esperada: ${matcher}`);
  }
  return html.replace(matcher, replacement);
};

const createPage = (baseHtml, page) => {
  const url = `${siteUrl}${page.path}`;
  let html = baseHtml;

  html = replaceMeta(html, /<title>[\s\S]*?<\/title>/i, `<title>${page.title}</title>`);
  html = replaceMeta(html, /<meta name="description" content="[^"]*"\s*\/?\s*>/i, `<meta name="description" content="${page.description}" />`);
  html = replaceMeta(html, /<link rel="canonical" href="[^"]*"\s*\/?\s*>/i, `<link rel="canonical" href="${url}" />`);
  html = replaceMeta(html, /<meta property="og:url" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:url" content="${url}" />`);
  html = replaceMeta(html, /<meta property="og:title" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:title" content="${page.title}" />`);
  html = replaceMeta(html, /<meta property="og:description" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:description" content="${page.description}" />`);
  html = replaceMeta(html, /<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/i, `<meta name="twitter:title" content="${page.title}" />`);
  html = replaceMeta(html, /<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/i, `<meta name="twitter:description" content="${page.description}" />`);

  const staticSchema = page.schema === false ? '' : `\n  <script id="static-route-jsonld" type="application/ld+json">${escapeJson({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.name,
    description: page.description,
    url,
    provider: { '@id': `${siteUrl}/#clinica` },
    areaServed: { '@type': 'City', name: 'São Lourenço do Oeste' },
  })}</script>`;
  html = html.replace('</head>', `${staticSchema}\n</head>`);

  const noscript = `<noscript><main><h1>${page.name} em São Lourenço do Oeste</h1><p>${page.description}</p><p>Agende sua avaliação pelo WhatsApp: <a href="https://wa.me/5549998362864">(49) 9 9836-2864</a>.</p></main></noscript>`;
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, noscript);

  return html;
};

const baseHtmlPath = path.join(buildDirectory, 'index.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

for (const page of pages) {
  const outputDirectory = path.join(buildDirectory, page.path.slice(1));
  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.writeFileSync(path.join(outputDirectory, 'index.html'), createPage(baseHtml, page), 'utf8');
}

console.log(`Páginas SEO estáticas geradas: ${pages.length}`);
