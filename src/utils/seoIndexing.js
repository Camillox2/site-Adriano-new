import policy from '../data/seo-index-policy.json';

const INDEX_DIRECTIVE = 'index, follow, max-image-preview:large';
const NOINDEX_DIRECTIVE = 'noindex, follow';

const normalizePath = (pathname = '/') => {
  const withoutQuery = pathname.split('?')[0].split('#')[0] || '/';
  if (withoutQuery === '/') return '/';
  return withoutQuery.replace(/\/+$/, '');
};

export const isIndexablePath = (pathname) => {
  const path = normalizePath(pathname);

  if (policy.corePaths.includes(path) || path.startsWith('/blog')) return true;

  if (path.startsWith('/servicos/')) {
    const city = path.slice('/servicos/'.length);
    return policy.indexableRegionalCities.includes(city);
  }

  if (!/^\/[a-z0-9-]+$/.test(path)) return false;

  const slug = path.slice(1);
  return Object.entries(policy.indexableServiceCities).some(([service, cities]) => {
    if (slug === service) return cities.includes(policy.primaryCity);
    if (!slug.startsWith(`${service}-`)) return false;
    return cities.includes(slug.slice(service.length + 1));
  });
};

export const getRobotsDirective = (pathname) =>
  isIndexablePath(pathname) ? INDEX_DIRECTIVE : NOINDEX_DIRECTIVE;
