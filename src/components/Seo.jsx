import { useEffect } from 'react';
import { SITE } from '../utils/constants';

/**
 * Componente de SEO por rota (sem dependências externas).
 * Atualiza título, description, canonical, Open Graph e JSON-LD dinâmico.
 */
const Seo = ({ title, description, path = '/', jsonLd = null }) => {
  useEffect(() => {
    const url = `${SITE.url}${path === '/' ? '/' : path}`;

    document.title = title;

    const setMeta = (attr, key, content) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    // Canonical
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // JSON-LD dinâmico da rota
    const SCRIPT_ID = 'route-jsonld';
    document.getElementById(SCRIPT_ID)?.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = SCRIPT_ID;
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(SCRIPT_ID)?.remove();
    };
  }, [title, description, path, jsonLd]);

  return null;
};

export default Seo;
