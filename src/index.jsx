import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { preloadRoute } from './App';
import { hydration } from './utils/prerender';
import './styles/global.css';

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const renderFromScratch = () => {
  container.textContent = '';
  ReactDOM.createRoot(container).render(app);
};

// HTML pré-renderizado no build (scripts/prerender.cjs): carrega os módulos
// da rota atual e hidrata o conteúdo existente em vez de recriá-lo.
if (container.dataset.prerendered === 'true' && container.firstElementChild) {
  preloadRoute(window.location.pathname)
    .then(() => {
      hydration.pending = true;
      ReactDOM.hydrateRoot(container, app);
    })
    .catch(renderFromScratch);
} else {
  ReactDOM.createRoot(container).render(app);
}
