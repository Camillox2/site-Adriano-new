import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

// Configuração de performance
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderização da aplicação
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance monitoring (opcional)
if (typeof window !== 'undefined') {
  // Web Vitals
  const reportWebVitals = (onPerfEntry) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      });
    }
  };

  // Para desenvolvimento, você pode ativar o monitoramento
  // reportWebVitals(console.log);
}

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Configurações globais
document.title = 'Dr. Adriano Camillo - Cirurgião Dentista | HIFU, Ortodontia, Implantes';

// Meta tags dinâmicas
const metaDescription = document.querySelector('meta[name="description"]');
if (metaDescription) {
  metaDescription.setAttribute('content', 
    'Dr. Adriano Camillo - Especialista em Ortodontia, Implantes, Harmonização Orofacial e HIFU. Atendimento em São Lourenço do Oeste, Realeza e Ampére.'
  );
}

// Prevenção de zoom no mobile para melhor UX
document.addEventListener('touchstart', function() {}, { passive: true });

// Smooth scroll para navegação
document.documentElement.style.scrollBehavior = 'smooth';