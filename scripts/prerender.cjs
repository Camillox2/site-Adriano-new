/* eslint-disable no-console */
// Pré-renderização no build: abre cada página gerada em build/ num Chrome
// headless (puppeteer-core), espera o React renderizar e grava o HTML do
// <div id="root"> no próprio build/<rota>/index.html (e build/404.html).
// No navegador, src/index.jsx detecta data-prerendered="true" e usa hydrateRoot.
//
// - Vercel (process.env.VERCEL): Chrome do pacote @sparticuz/chromium.
// - Local: CHROME_PATH ou um Chrome/Chromium instalado no sistema.
// - PRERENDER=off pula esta etapa (o site continua funcionando como SPA).
// Qualquer falha interrompe o build, para nunca publicar HTML incompleto.
//
// Durante a captura: window.__PRERENDER__ = true (sem banner de cookies,
// consentimento, GTM/gtag ou carrosséis automáticos), IntersectionObserver
// desativado (Reveal/CountUp ficam no estado inicial, como no primeiro render
// do visitante) e toda requisição para fora do servidor local é bloqueada.
const fs = require('fs');
const http = require('http');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const NOT_FOUND_CAPTURE_PATH = '/__prerender-pagina-inexistente__';
const VIEWPORT = { width: 390, height: 844, deviceScaleFactor: 1, isMobile: false, hasTouch: false };
const ROOT_PLACEHOLDER = '<div id="root"></div>';

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif', '.svg': 'image/svg+xml', '.gif': 'image/gif',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.xml': 'application/xml', '.txt': 'text/plain',
  '.ico': 'image/x-icon', '.vtt': 'text/vtt', '.woff': 'font/woff', '.woff2': 'font/woff2',
};

// Servidor estático com o mesmo comportamento da Vercel para o build:
// arquivo -> pasta/index.html -> 404.html (status 404).
const startServer = () => new Promise((resolve) => {
  const server = http.createServer((req, res) => {
    let filePath;
    try {
      filePath = path.join(BUILD_DIR, decodeURIComponent(req.url.split('?')[0]));
    } catch {
      res.writeHead(400);
      res.end();
      return;
    }
    if (!filePath.startsWith(BUILD_DIR)) {
      res.writeHead(403);
      res.end();
      return;
    }
    let status = 200;
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');
    if (!fs.existsSync(filePath)) {
      filePath = path.join(BUILD_DIR, '404.html');
      status = 404;
    }
    res.writeHead(status, { 'Content-Type': TYPES[path.extname(filePath)] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
  server.listen(0, '127.0.0.1', () => resolve(server));
});

const collectPages = (directory = BUILD_DIR) => {
  const pages = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory() && fullPath !== path.join(BUILD_DIR, 'static')) pages.push(...collectPages(fullPath));
    if (entry.isFile() && entry.name === 'index.html') {
      const relative = path.relative(BUILD_DIR, directory).split(path.sep).join('/');
      pages.push({ file: fullPath, urlPath: relative ? `/${relative}/` : '/' });
    }
  }
  return pages;
};

const findLocalChrome = () => {
  const candidates = [
    process.env.CHROME_PATH,
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  ].filter(Boolean);
  return candidates.find((candidate) => fs.existsSync(candidate));
};

const launchBrowser = async () => {
  const puppeteer = require('puppeteer-core');
  if (process.env.VERCEL && !process.env.CHROME_PATH) {
    const chromium = require('@sparticuz/chromium');
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
  const executablePath = findLocalChrome();
  if (!executablePath) {
    throw new Error('Chrome não encontrado. Defina CHROME_PATH ou rode o build com PRERENDER=off.');
  }
  return puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
};

// Executado dentro da página antes de qualquer script do site
function preparePage() {
  window.__PRERENDER__ = true;
  try {
    window.localStorage.clear();
    window.sessionStorage.clear();
  } catch (error) { /* sem storage */ }
  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  };
}

// Executado na página: limpa o DOM e devolve o HTML do #root + dados de conferência
function captureRoot(fileHtml) {
  const root = document.getElementById('root');
  const reactKey = (element, prefix) => Object.keys(element).find((key) => key.startsWith(prefix));

  // Remove nós criados fora do React (ex.: canvas do three.js) — o React não
  // os conhece e a hidratação falharia. Não desce em dangerouslySetInnerHTML.
  const prune = (element) => {
    Array.from(element.children).forEach((child) => {
      if (!reactKey(child, '__reactFiber$')) {
        child.remove();
        return;
      }
      const propsKey = reactKey(child, '__reactProps$');
      if (propsKey && child[propsKey] && child[propsKey].dangerouslySetInnerHTML) return;
      prune(child);
    });
  };
  prune(root);

  // Textos vizinhos (ex.: "© {year} Dr.") viram um único nó ao reler o HTML;
  // como o renderToString do React, separa-os com <!-- --> para a hidratação.
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => {
    if (node.previousSibling && node.previousSibling.nodeType === Node.TEXT_NODE) {
      node.parentNode.insertBefore(document.createComment(' '), node);
    }
  });

  // Propriedades que o innerHTML não serializa
  root.querySelectorAll('video').forEach((video) => { if (video.muted) video.setAttribute('muted', ''); });
  root.querySelectorAll('option').forEach((option) => { if (option.selected) option.setAttribute('selected', ''); });
  root.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach((input) => {
    if (input.checked) input.setAttribute('checked', '');
  });

  const expected = new DOMParser().parseFromString(fileHtml, 'text/html');
  const noscriptHtml = expected.querySelector('noscript');
  // (DOMParser não executa scripts, então o conteúdo do <noscript> vira DOM)
  const expectedH1 = noscriptHtml
    ? noscriptHtml.querySelector('h1')
      || new DOMParser().parseFromString(noscriptHtml.textContent, 'text/html').querySelector('h1')
    : null;
  const renderedH1 = root.querySelector('h1');
  const meta = (doc, name) => doc.querySelector(`meta[name="${name}"]`)?.getAttribute('content') || '';
  const canonical = (doc) => doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';

  return {
    html: root.innerHTML,
    title: [document.title, expected.title],
    description: [meta(document, 'description'), meta(expected, 'description')],
    canonical: [canonical(document), canonical(expected)],
    h1: [renderedH1 ? renderedH1.textContent.trim() : '', expectedH1 ? expectedH1.textContent.trim() : null],
    textLength: root.textContent.trim().length,
  };
}

const renderPage = async (browser, origin, { file, urlPath }) => {
  const fileHtml = fs.readFileSync(file, 'utf8');
  if (!fileHtml.includes(ROOT_PLACEHOLDER)) {
    throw new Error(`${path.relative(BUILD_DIR, file)}: <div id="root"></div> não encontrado (já pré-renderizado?)`);
  }

  const page = await browser.newPage();
  const errors = [];
  try {
    await page.setViewport(VIEWPORT);
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
    await page.evaluateOnNewDocument(preparePage);
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const url = request.url();
      if (url.startsWith(origin) || url.startsWith('data:') || url.startsWith('blob:')) request.continue();
      else request.abort('blockedbyclient');
    });
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto(`${origin}${urlPath}`, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.waitForFunction(() => document.getElementById('root')?.childElementCount > 0, { timeout: 30000 });
    await new Promise((resolve) => setTimeout(resolve, 300));

    const result = await page.evaluate(captureRoot, fileHtml);
    const label = path.relative(BUILD_DIR, file);
    if (errors.length) throw new Error(`${label}: erro de JavaScript na captura: ${errors.join(' | ')}`);
    if (result.textLength < 200) throw new Error(`${label}: conteúdo renderizado muito curto (${result.textLength} caracteres)`);
    ['title', 'description', 'canonical'].forEach((field) => {
      const [rendered, expected] = result[field];
      if (rendered !== expected) {
        throw new Error(`${label}: ${field} renderizado difere do HTML estático:\n  "${rendered}"\n  "${expected}"`);
      }
    });
    const compact = (text) => text.replace(/\s+/g, '');
    if (result.h1[1] !== null && compact(result.h1[0]) !== compact(result.h1[1])) {
      throw new Error(`${label}: H1 renderizado difere do HTML estático:\n  "${result.h1[0]}"\n  "${result.h1[1]}"`);
    }

    const output = fileHtml.replace(ROOT_PLACEHOLDER, () => `<div id="root" data-prerendered="true">${result.html}</div>`);
    fs.writeFileSync(file, output, 'utf8');
    return result.html.length;
  } finally {
    await page.close();
  }
};

const main = async () => {
  if (String(process.env.PRERENDER || '').toLowerCase() === 'off') {
    console.log('Pré-renderização desativada (PRERENDER=off).');
    return;
  }
  if (!fs.existsSync(BUILD_DIR)) throw new Error('Diretório build não encontrado.');

  const pages = collectPages();
  const notFoundFile = path.join(BUILD_DIR, '404.html');
  if (fs.existsSync(notFoundFile)) pages.push({ file: notFoundFile, urlPath: NOT_FOUND_CAPTURE_PATH });

  const server = await startServer();
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await launchBrowser();
  const started = Date.now();
  try {
    console.log(`Pré-renderizando ${pages.length} páginas com ${await browser.version()}...`);
    // Todas as páginas são carregadas a partir dos arquivos originais; como
    // cada arquivo é reescrito só depois da própria captura, a ordem importa:
    // o 404.html (usado pelo servidor para rotas inexistentes) vai por último.
    for (const pageInfo of pages) {
      const size = await renderPage(browser, origin, pageInfo);
      console.log(`  ${pageInfo.urlPath === NOT_FOUND_CAPTURE_PATH ? '404.html' : pageInfo.urlPath} (${size} bytes)`);
    }
  } finally {
    await browser.close();
    server.close();
  }
  console.log(`Pré-renderização concluída em ${((Date.now() - started) / 1000).toFixed(1)}s.`);
};

main().catch((error) => {
  console.error(`\nFalha na pré-renderização: ${error.message}`);
  console.error('Para publicar sem pré-renderização, rode o build com PRERENDER=off.');
  process.exit(1);
});
