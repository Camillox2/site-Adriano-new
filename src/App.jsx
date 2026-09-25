import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, matchRoutes } from 'react-router-dom';
import Home from './pages/Home';
import AnalyticsConsent from './components/AnalyticsConsent';
import WhatsAppButton from './components/WhatsAppButton';
import ErrorBoundary from './components/ErrorBoundary';
import SafeSuspense from './components/SafeSuspense';
import lazyWithPreload from './utils/lazyWithPreload';
import { hydration } from './utils/prerender';
import './styles/global.css';

// Code splitting (carrega apenas quando necessário). lazyWithPreload permite
// carregar o módulo da rota antes de hidratar o HTML pré-renderizado.
const HifuDetails = lazyWithPreload(() => import('./pages/HifuDetails'));
const AlugarHifu = lazyWithPreload(() => import('./pages/AlugarHifu'));
const ServicesPage = lazyWithPreload(() => import('./pages/ServicesPage'));
const ServiceDetails = lazyWithPreload(() => import('./pages/ServiceDetails'));
const PrivacyPolicy = lazyWithPreload(() => import('./pages/PrivacyPolicy'));
const BlogList = lazyWithPreload(() => import('./pages/BlogList'));
const BlogPost = lazyWithPreload(() => import('./pages/BlogPost'));
const NotFound = lazyWithPreload(() => import('./pages/NotFound'));

const ROUTES = [
  { path: '/', Component: Home },
  { path: '/hifu', Component: HifuDetails },
  { path: '/alugar_hifu', Component: AlugarHifu },
  { path: '/servicos', Component: ServicesPage },
  { path: '/politica-de-privacidade', Component: PrivacyPolicy },
  { path: '/blog', Component: BlogList },
  { path: '/blog/:slug', Component: BlogPost },
  { path: '/:slug', Component: ServiceDetails },
  { path: '*', Component: NotFound },
];

// Carrega todos os módulos que a rota atual renderiza no primeiro momento.
export const preloadRoute = (pathname) => {
  const [match] = matchRoutes(ROUTES.map(({ path }) => ({ path })), pathname) || [];
  const route = ROUTES.find(({ path }) => path === match?.route.path);
  return Promise.all([route?.Component.preload?.()]);
};

// Rola para o topo sempre que a rota muda (exceto navegação com âncora)
const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (!state?.scrollTo) {
      window.scrollTo(0, 0);
    }
  }, [pathname, state]);

  return null;
};

// Reinicia o Error Boundary a cada troca de rota
const RouteErrorBoundary = ({ children }) => {
  const { pathname } = useLocation();
  return <ErrorBoundary key={pathname}>{children}</ErrorBoundary>;
};

function App() {
  // Fim da hidratação inicial: novas montagens voltam a usar Suspense normal
  useEffect(() => {
    hydration.pending = false;
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AnalyticsConsent />
      <div className="App">
        <RouteErrorBoundary>
        <SafeSuspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Carregando...</div>}>
          <Routes>
            {ROUTES.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </SafeSuspense>
        </RouteErrorBoundary>
      </div>
      <WhatsAppButton />
    </Router>
  );
}

export default App;
