import { SERVICE_PAGE_LIST, SERVICE_PAGES, RENTAL_CITY_SLUGS } from './servicePages';
import policy from './seo-index-policy.json';

describe('páginas de serviço', () => {
  it('tratamentos para pacientes existem só na versão de São Lourenço do Oeste', () => {
    const patientPages = SERVICE_PAGE_LIST.filter((page) => !page.isRental);
    expect(patientPages.length).toBeGreaterThan(0);
    patientPages.forEach((page) => {
      expect(page.citySlug).toBe('sao-lourenco-do-oeste');
      expect(page.slug).not.toMatch(/-(chapeco|pato-branco|curitiba|ampere|realeza)$/);
      expect(`${page.title} ${page.heading} ${page.description}`).not.toMatch(/Atendendo|e clínicas|clínicas e pacientes/);
      expect(page.heading).toMatch(/São Lourenço do Oeste/);
    });
  });

  it('locação de HIFU mantém páginas por cidade com título, descrição e H1 próprios', () => {
    const rental = SERVICE_PAGE_LIST.filter((page) => page.isRental);
    expect(rental.map((page) => page.citySlug).sort()).toEqual([...RENTAL_CITY_SLUGS].sort());
    ['title', 'description', 'heading', 'intro'].forEach((field) => {
      expect(new Set(rental.map((page) => page[field])).size).toBe(rental.length);
    });
  });

  it('a política de indexação cobre exatamente as páginas geradas', () => {
    const fromPolicy = Object.entries(policy.indexableServiceCities).flatMap(([service, cities]) =>
      cities.map((city) => (city === policy.primaryCity ? service : `${service}-${city}`))
    );
    expect(fromPolicy.sort()).toEqual(Object.keys(SERVICE_PAGES).sort());
    expect(policy.indexableRegionalCities).toEqual([]);
  });
});
