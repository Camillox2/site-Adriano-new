const fs = require('fs');
const path = require('path');

const siteUrl = 'https://dradrianocamillo.com';
const buildDirectory = path.join(__dirname, '..', 'build');

const CITIES = {
  'sao-lourenco-do-oeste': { name: 'São Lourenço do Oeste', state: 'SC', suffix: 'sao-lourenco-do-oeste', isPrimary: true, locTitle: 'em São Lourenço do Oeste - SC' },
  'chapeco': { name: 'Chapecó', state: 'SC', suffix: 'chapeco', isPrimary: false, locTitle: 'para pacientes de Chapecó - SC' },
  'pato-branco': { name: 'Pato Branco', state: 'PR', suffix: 'pato-branco', isPrimary: false, locTitle: 'para pacientes de Pato Branco - PR' },
  'ampere': { name: 'Ampére', state: 'PR', suffix: 'ampere', isPrimary: false, locTitle: 'para pacientes de Ampére - PR' },
  'realeza': { name: 'Realeza', state: 'PR', suffix: 'realeza', isPrimary: false, locTitle: 'para pacientes de Realeza - PR' },
  'novo-horizonte': { name: 'Novo Horizonte', state: 'SC', suffix: 'novo-horizonte', isPrimary: false, locTitle: 'para pacientes de Novo Horizonte - SC' },
};

const BASE_SERVICES = [
  {
    baseSlug: 'odontologia-estetica',
    name: 'Odontologia Estética',
    title: (c) => `Odontologia Estética ${c.locTitle} | Dr. Adriano Camillo`,
    desc: (c) => `Odontologia estética ${c.locTitle}. Lentes de contato dental, facetas de resina, clareamento e planejamento digital do sorriso.`
  },
  {
    baseSlug: 'implantes-dentarios',
    name: 'Implantes Dentários',
    title: (c) => `Implantes Dentários ${c.locTitle} | Dr. Adriano Camillo`,
    desc: (c) => `Implantes dentários ${c.locTitle}. Reabilitação oral fixa com máxima segurança, estética natural e planejamento guiado.`
  },
  {
    baseSlug: 'ortodontia',
    name: 'Ortodontia',
    title: (c) => `Ortodontia ${c.locTitle} | Dr. Adriano Camillo`,
    desc: (c) => `Ortodontia ${c.locTitle}. Aparelhos estéticos, alinhadores transparentes e aparelhos fixos com acompanhamento próximo.`
  },
  {
    baseSlug: 'harmonizacao-orofacial',
    name: 'Harmonização Orofacial',
    title: (c) => `Harmonização Orofacial ${c.locTitle} | Dr. Adriano Camillo`,
    desc: (c) => `Harmonização orofacial ${c.locTitle}. Toxina botulínica, preenchimento com ácido hialurônico e bioestimuladores com resultados naturais.`
  },
  {
    baseSlug: 'dtm-dor-orofacial',
    name: 'DTM e Dor Orofacial',
    title: (c) => `DTM e Dor Orofacial ${c.locTitle} | Dr. Adriano Camillo`,
    desc: (c) => `Tratamento de DTM e dor orofacial ${c.locTitle}. Diagnóstico de bruxismo, estalos na mandíbula, dores na ATM e dores de cabeça.`
  },
  {
    baseSlug: 'ozonioterapia',
    name: 'Ozonioterapia',
    title: (c) => `Ozonioterapia Odontológica ${c.locTitle} | Dr. Adriano Camillo`,
    desc: (c) => `Ozonioterapia odontológica ${c.locTitle}. Terapia biológica com ação bactericida e aceleradora da cicatrização pós-operatória.`
  }
];

const pages = [
  {
    path: '/hifu',
    name: 'HIFU — Ultrassom Microfocado',
    title: 'HIFU em São Lourenço do Oeste — Ultrassom Microfocado | Dr. Adriano Camillo',
    description:
      'Lifting facial sem cirurgia com HIFU (Ultrassom Microfocado) em São Lourenço do Oeste - SC. Veja benefícios, cuidados e agende sua avaliação.',
  },
  {
    path: '/politica-de-privacidade',
    name: 'Política de Privacidade',
    title: 'Política de Privacidade | Dr. Adriano Camillo',
    description: 'Política de privacidade do site do Dr. Adriano Camillo.',
    schema: false,
  },
];

// Gerar todas as combinações de páginas de serviços e cidades
BASE_SERVICES.forEach((service) => {
  Object.values(CITIES).forEach((city) => {
    let pagePath = '';
    if (service.baseSlug === 'dtm-dor-orofacial') {
      pagePath = city.isPrimary ? '/dtm-dor-orofacial' : `/dtm-dor-orofacial-${city.suffix}`;
    } else {
      pagePath = `/${service.baseSlug}-${city.suffix}`;
    }

    pages.push({
      path: pagePath,
      name: `${service.name} (${city.name})`,
      cityName: city.name,
      title: service.title(city),
      description: service.desc(city)
    });
  });
});

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

  const cityName = page.cityName || 'São Lourenço do Oeste';
  const staticSchema = page.schema === false ? '' : `\n  <script id="static-route-jsonld" type="application/ld+json">${escapeJson({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.name,
    description: page.description,
    url,
    provider: { '@id': `${siteUrl}/#clinica` },
    areaServed: { '@type': 'City', name: cityName },
  })}</script>`;
  html = html.replace('</head>', `${staticSchema}\n</head>`);

  const noscript = `<noscript><main><h1>${page.name}</h1><p>${page.description}</p><p>Agende sua avaliação pelo WhatsApp: <a href="https://wa.me/5549998362864">(49) 9 9836-2864</a>.</p></main></noscript>`;
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

console.log(`Páginas SEO estáticas geradas com sucesso: ${pages.length}`);
