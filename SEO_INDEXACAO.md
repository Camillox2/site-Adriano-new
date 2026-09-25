# SEO: indexação, redirecionamentos e pré-renderização

Atualizado em 25/09/2026.

## Estratégia atual

- O consultório fica apenas em São Lourenço do Oeste - SC. As páginas de
  tratamento para pacientes existem só nessa versão (ex.: `/ortodontia`).
- As antigas variantes por cidade (`/ortodontia-chapeco`, `/servicos/chapeco`,
  `/lipo-de-papada-hifu-curitiba` etc.) não são mais geradas: respondem com um
  único redirecionamento 308 para a página equivalente (regras em `vercel.json`).
- A locação de HIFU (serviço B2B para clínicas) mantém páginas próprias por
  cidade atendida: `/aluguel-de-hifu` e `/aluguel-de-hifu-{chapeco,pato-branco,ampere,realeza,curitiba}`.
  Textos de cada cidade em `RENTAL_CITY_COPY` (`src/data/servicePages.js`).
- Rotas inexistentes respondem HTTP 404 com a página `build/404.html`
  (noindex, sem canonical).
- O sitemap (`public/sitemap.xml`, gerado no build) lista 22 URLs, todas 200.

## URLs indexáveis (sitemap)

`/`, `/servicos`, `/hifu`, `/alugar_hifu`, `/blog`, `/politica-de-privacidade`,
`/odontologia-estetica`, `/implantes-dentarios`, `/ortodontia`,
`/harmonizacao-orofacial`, `/dtm-dor-orofacial`, `/ozonioterapia`,
`/lipo-de-papada-hifu`, `/aluguel-de-hifu`, `/aluguel-de-hifu-chapeco`,
`/aluguel-de-hifu-pato-branco`, `/aluguel-de-hifu-ampere`,
`/aluguel-de-hifu-realeza`, `/aluguel-de-hifu-curitiba` e os posts do blog.

Fontes: `src/data/seo-index-policy.json`, `src/data/servicePages.js`,
`src/data/pageMeta.js` e `src/data/blogPosts.js`.

## Uma única fonte para título, description e H1

O React (componente `Seo`) e os scripts de build usam os mesmos arquivos:

- páginas institucionais: `src/data/pageMeta.js` (`PAGE_META`);
- tratamentos e locação: `src/data/servicePages.js`;
- blog: `src/data/blogPosts.js` (via `blogPostMeta`).

Se o H1 de uma página mudar no JSX, atualize também o `h1` correspondente em
`pageMeta.js`: o build confere se o H1 renderizado é igual ao do HTML estático
e falha se não for.

## Build

```
npm run build
```

1. `scripts/build-sitemap.cjs` – gera o sitemap.
2. `react-scripts build` – gera o app (não rode sozinho: apaga as páginas geradas).
3. `scripts/generate-static-seo-pages.cjs` – cria `build/<rota>/index.html`
   com título, description, canonical, JSON-LD e H1 de cada página, e o `404.html`.
4. `scripts/prerender.cjs` – pré-renderização (abaixo).
5. `scripts/apply-indexing-policy.cjs` – aplica `index`/`noindex`.

A Vercel roda esse mesmo `npm run build` a cada push (o `build/` commitado no
Git **não** é o que vai ao ar; ele serve de referência/backup).

## Pré-renderização (HTML completo no primeiro carregamento)

`scripts/prerender.cjs` abre cada página de `build/` num Chrome headless
(`puppeteer-core`) servido localmente, espera o React renderizar e grava o HTML
do `<div id="root">` no próprio arquivo (`<div id="root" data-prerendered="true">`).
No navegador, `src/index.jsx` vê esse atributo, carrega os módulos da rota
(`preloadRoute` em `src/App.jsx`) e usa `hydrateRoot`; sem ele, usa `createRoot`
como antes.

Garantias durante a captura (`window.__PRERENDER__ = true`, ver `src/utils/prerender.js`):

- toda requisição externa é bloqueada (GTM, GA, Google Ads, fontes externas);
- o banner de cookies, o consentimento e o gtag não são carregados nem gravados no HTML;
- `IntersectionObserver` fica desativado, então os blocos com `Reveal` ficam no
  estado inicial (invisíveis) e aparecem com a mesma animação quando o visitante rola;
- carrosséis automáticos não avançam; o vídeo do topo só entra após a hidratação
  (em telas ≥ 768px), exatamente como antes;
- nós criados fora do React (ex.: canvas) são removidos antes de salvar.

Chrome usado:

- **Vercel** (`VERCEL` definido): `@sparticuz/chromium` (binário próprio para o
  ambiente Linux da Vercel), sem precisar instalar nada.
- **Local**: `CHROME_PATH` ou um Chrome/Chromium instalado (`/usr/bin/google-chrome`, etc.).

Falhas: se a pré-renderização falhar (Chrome indisponível, erro de JavaScript,
título/H1 renderizado diferente do HTML estático), o build falha e a Vercel
mantém o deploy anterior no ar. Para publicar mesmo assim (site volta a ser SPA,
com o head/H1 estáticos), defina a variável de ambiente `PRERENDER=off` no build
(na Vercel: Project Settings → Environment Variables).

Cuidados ao editar componentes:

- o primeiro render não pode depender do tamanho da tela, do `localStorage`, da
  data/hora ou de `Math.random()`; use `isInitialRenderDeterministic()` e aplique
  o valor real num efeito (ver `Hero.jsx`), ou `suppressHydrationWarning` em
  textos como datas (ver `Footer.jsx`, `BlogList.jsx`);
- novos `React.lazy` usados no primeiro render devem usar `lazyWithPreload` e
  `SafeSuspense` (ver `Home.jsx`), e ser incluídos no `preload` da página.

Verificação rápida depois de mudanças: `npm run build`, servir `build/` e abrir o
console do navegador — não pode haver "Minified React error #418/#423/#425".

## Processo para liberar uma nova página por cidade (locação de HIFU)

1. Confirmar que a locação é realmente atendida na cidade.
2. Adicionar a cidade em `RENTAL_CITY_COPY` com texto próprio e verdadeiro.
3. Adicionar a cidade em `indexableServiceCities.aluguel-de-hifu` no `seo-index-policy.json`.
4. Remover a regra 308 dessa cidade em `vercel.json`, se existir.
5. `npm run build`, publicar e reenviar o sitemap no Search Console.
