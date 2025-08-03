import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HifuDetails from './pages/HifuDetails';
import './styles/global.css';

function App() {
  // Scroll to top when route changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<Home />} />
          
          {/* Página detalhada do HIFU */}
          <Route path="/hifu" element={<HifuDetails />} />
          
          {/* Fallback para rotas não encontradas - redireciona para home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;