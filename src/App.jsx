import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import AnalyticsConsent from './components/AnalyticsConsent';
import './styles/global.css';

// Code splitting (carrega apenas quando necessário)
const HifuDetails = React.lazy(() => import('./pages/HifuDetails'));
const ServiceDetails = React.lazy(() => import('./pages/ServiceDetails'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));

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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnalyticsConsent />
      <div className="App">
        <React.Suspense fallback={<div className="min-h-screen bg-white" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hifu" element={<HifuDetails />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
            <Route path="/:slug" element={<ServiceDetails />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </React.Suspense>
      </div>
    </Router>
  );
}

export default App;
