import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import HifuDetails from './pages/HifuDetails';
import AlugarHifu from './pages/AlugarHifu';
import './styles/global.css';

// Code splitting (carrega apenas quando necessário)
const HifuDetails = React.lazy(() => import('./pages/HifuDetails'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const RegionalServicesPage = React.lazy(() => import('./pages/RegionalServicesPage'));
const ServiceDetails = React.lazy(() => import('./pages/ServiceDetails'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const BlogList = React.lazy(() => import('./pages/BlogList'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hifu" element={<HifuDetails />} />
          <Route path="/alugar_hifu" element={<AlugarHifu />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
