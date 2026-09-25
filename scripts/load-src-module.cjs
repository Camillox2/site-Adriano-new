// Carrega módulos ES de src/ (ex.: src/data/servicePages.js) dentro dos scripts
// Node do build, para que o HTML estático use exatamente os mesmos dados do React.
// Transpila com o Babel que já vem com o react-scripts.
const fs = require('fs');
const path = require('path');
process.env.BROWSERSLIST_IGNORE_OLD_DATA = '1';
const babel = require('@babel/core');

const cache = new Map();

const resolveFile = (request, fromDir) => {
  const base = path.resolve(fromDir, request);
  for (const candidate of [base, `${base}.js`, `${base}.json`, path.join(base, 'index.js')]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  throw new Error(`Módulo não encontrado: ${request} (a partir de ${fromDir})`);
};

const loadSrcModule = (filePath) => {
  const absolute = path.resolve(filePath);
  if (cache.has(absolute)) return cache.get(absolute).exports;
  if (absolute.endsWith('.json')) return JSON.parse(fs.readFileSync(absolute, 'utf8'));

  const { code } = babel.transformSync(fs.readFileSync(absolute, 'utf8'), {
    filename: absolute,
    babelrc: false,
    configFile: false,
    plugins: [require.resolve('@babel/plugin-transform-modules-commonjs')],
  });

  const module = { exports: {} };
  cache.set(absolute, module);
  const localRequire = (request) => {
    if (request.startsWith('.')) return loadSrcModule(resolveFile(request, path.dirname(absolute)));
    return require(request);
  };
  // eslint-disable-next-line no-new-func
  new Function('require', 'module', 'exports', code)(localRequire, module, module.exports);
  return module.exports;
};

module.exports = { loadSrcModule };
