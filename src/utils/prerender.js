// Estado compartilhado do pré-render (build) e da hidratação (navegador).
//
// - Durante o build, scripts/prerender.cjs abre cada página no Chrome com
//   window.__PRERENDER__ = true. Nesse modo nada de analytics/consentimento é
//   carregado e animações automáticas (carrosséis) não avançam, para que o HTML
//   salvo seja exatamente o primeiro render do React.
// - No navegador do visitante, src/index.jsx usa hydrateRoot quando o HTML já
//   vem pré-renderizado; enquanto a hidratação inicial acontece,
//   hydration.pending = true.

export const isPrerendering = () => typeof window !== 'undefined' && window.__PRERENDER__ === true;

export const hydration = { pending: false };

// Estado inicial que depende da tela do visitante precisa começar igual ao
// HTML pré-renderizado; o valor real é aplicado logo depois, em um efeito.
export const isInitialRenderDeterministic = () => isPrerendering() || hydration.pending;
