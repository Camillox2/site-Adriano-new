import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import HifuDetails from './pages/HifuDetails';
import ServiceDetails from './pages/ServiceDetails';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AnalyticsConsent from './components/AnalyticsConsent';
import './styles/global.css';

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
          <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
          <Route path="/:slug" element={<ServiceDetails />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
