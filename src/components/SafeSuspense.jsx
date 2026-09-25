import React, { Suspense, useState } from 'react';
import { hydration } from '../utils/prerender';

/**
 * <Suspense> que vira um Fragment quando montado durante a hidratação inicial.
 * O HTML pré-renderizado não tem os marcadores que o React espera para
 * hidratar um Suspense; como todos os módulos da rota já foram carregados antes
 * de hidratar (preloadRoute), nada suspende e o Fragment é equivalente.
 * Em navegações seguintes a árvore é remontada e o Suspense normal volta a valer.
 */
const SafeSuspense = ({ fallback = null, children }) => {
  const [asFragment] = useState(() => hydration.pending);
  if (asFragment) return <>{children}</>;
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

export default SafeSuspense;
