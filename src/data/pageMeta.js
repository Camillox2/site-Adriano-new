// Fonte única de título, descrição e H1 das páginas fixas do site.
// Usada pelos componentes React (via <Seo />) e pelo script de build
// scripts/generate-static-seo-pages.cjs, para que o HTML estático entregue
// ao Google seja igual ao que o navegador mostra depois de carregar o React.
// Ao mudar um H1 no JSX, atualize o campo h1 correspondente aqui.

export const PAGE_META = {
  '/': {
    title: 'Dr. Adriano Camillo | Dentista em São Lourenço do Oeste',
    description: 'Dentista em São Lourenço do Oeste - SC. Dr. Adriano Camillo: Implantes, Ortodontia, Estética Dental e Harmonização Orofacial. Agende sua consulta!',
    h1: 'Dentista em São Lourenço do Oeste Odontologia Estética, Ortodontia & Harmonização Facial',
  },
  '/servicos': {
    title: 'Serviços Odontológicos em São Lourenço do Oeste | Dr. Adriano Camillo',
    description: 'Conheça os serviços do Dr. Adriano Camillo em São Lourenço do Oeste: HIFU, implantes, ortodontia, estética, harmonização, DTM e ozonioterapia.',
    h1: 'Serviços pensados para sua saúde, sorriso e autoestima',
    schemaType: 'CollectionPage',
  },
  '/hifu': {
    title: 'HIFU Ultrassom Microfocado em São Lourenço do Oeste - SC | Dr. Adriano Camillo',
    description: 'Lifting facial sem cirurgia com HIFU (Ultrassom Microfocado) em São Lourenço do Oeste - SC e região. Trata flacidez, papada e contorno facial estimulando o colágeno. Agende sua avaliação.',
    h1: 'HIFU: o lifting facial sem cirurgia',
  },
  '/alugar_hifu': {
    title: 'Locação de Ultramed HIFU para Clínicas | Dr. Adriano',
    description: 'Alugue o Ultramed HIFU para sua clínica com equipamento revisado, ponteiras faciais, logística agendada e orientação operacional. Consulte disponibilidade.',
    h1: 'Quer levar o HIFU para a sua clínica?',
  },
  '/politica-de-privacidade': {
    title: 'Política de Privacidade | Dr. Adriano Camillo',
    description: 'Política de privacidade do site do Dr. Adriano Camillo.',
    h1: 'Política de Privacidade',
    schema: false,
  },
  '/blog': {
    title: 'Blog e Novidades | Dr. Adriano Camillo',
    description: 'Acompanhe artigos e novidades sobre odontologia estética, harmonização orofacial e implantes em São Lourenço do Oeste.',
    h1: 'Blog da Clínica Odontológica Dr. Adriano Camillo',
    schemaType: 'CollectionPage',
  },
};

export const NOT_FOUND_META = {
  title: 'Página não encontrada | Dr. Adriano Camillo',
  description: 'A página que você procurou não existe ou mudou de endereço.',
  h1: 'Página não encontrada',
};

export const blogPostMeta = (post) => ({
  title: `${post.title} | Blog Dr. Adriano Camillo`,
  description: post.excerpt,
  h1: post.title,
});
