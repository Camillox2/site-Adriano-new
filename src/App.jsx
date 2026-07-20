import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import HifuDetailsEnhanced from './pages/HifuDetailsEnhanced';
import HifuRental from './pages/HifuRental';
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
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hifu" element={<HifuDetailsEnhanced />} />
          <Route path="/alugar_hifu" element={<HifuRental />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
