export const REGIONAL_SERVICE_CITIES = {
  'sao-lourenco-do-oeste': {
    slug: 'sao-lourenco-do-oeste',
    name: 'São Lourenço do Oeste',
    state: 'SC',
    isPrimary: true,
    badge: 'Atendimento em São Lourenço do Oeste e região',
    titleLocation: 'em São Lourenço do Oeste',
    intro:
      'Conheça os tratamentos odontológicos e de estética facial realizados no consultório do Dr. Adriano Camillo em São Lourenço do Oeste.',
  },
  chapeco: {
    slug: 'chapeco',
    name: 'Chapecó',
    state: 'SC',
    badge: 'Atendimento para pacientes de Chapecó e região',
    titleLocation: 'para pacientes de Chapecó',
    intro:
      'Pacientes de Chapecó podem agendar avaliação e realizar o tratamento no consultório do Dr. Adriano Camillo em São Lourenço do Oeste.',
  },
  'pato-branco': {
    slug: 'pato-branco',
    name: 'Pato Branco',
    state: 'PR',
    badge: 'Atendimento para pacientes de Pato Branco e região',
    titleLocation: 'para pacientes de Pato Branco',
    intro:
      'Pacientes de Pato Branco podem organizar a avaliação pelo WhatsApp e realizar o atendimento no consultório em São Lourenço do Oeste.',
  },
  ampere: {
    slug: 'ampere',
    name: 'Ampére',
    state: 'PR',
    badge: 'Atendimento para pacientes de Ampére e região',
    titleLocation: 'para pacientes de Ampére',
    intro:
      'Conheça as opções de tratamento disponíveis para pacientes de Ampére, com atendimento no consultório em São Lourenço do Oeste.',
  },
  realeza: {
    slug: 'realeza',
    name: 'Realeza',
    state: 'PR',
    badge: 'Atendimento para pacientes de Realeza e região',
    titleLocation: 'para pacientes de Realeza',
    intro:
      'Pacientes de Realeza podem conversar diretamente pelo WhatsApp e agendar avaliação no consultório do Dr. Adriano Camillo.',
  },
  'novo-horizonte': {
    slug: 'novo-horizonte',
    name: 'Novo Horizonte',
    state: 'SC',
    badge: 'Atendimento para pacientes de Novo Horizonte e região',
    titleLocation: 'para pacientes de Novo Horizonte',
    intro:
      'Veja os tratamentos disponíveis para pacientes de Novo Horizonte, com atendimento individual no consultório em São Lourenço do Oeste.',
  },
  'francisco-beltrao': {
    slug: 'francisco-beltrao',
    name: 'Francisco Beltrão',
    state: 'PR',
    badge: 'Atendimento para pacientes de Francisco Beltrão e região',
    titleLocation: 'para pacientes de Francisco Beltrão',
    intro:
      'Pacientes de Francisco Beltrão podem agendar avaliação e receber orientação prévia pelo WhatsApp antes de se deslocar ao consultório.',
  },
  'dois-vizinhos': {
    slug: 'dois-vizinhos',
    name: 'Dois Vizinhos',
    state: 'PR',
    badge: 'Atendimento para pacientes de Dois Vizinhos e região',
    titleLocation: 'para pacientes de Dois Vizinhos',
    intro:
      'Conheça os serviços disponíveis para pacientes de Dois Vizinhos e organize seu atendimento no consultório em São Lourenço do Oeste.',
  },
  palmas: {
    slug: 'palmas',
    name: 'Palmas',
    state: 'PR',
    badge: 'Atendimento para pacientes de Palmas e região',
    titleLocation: 'para pacientes de Palmas',
    intro:
      'Pacientes de Palmas podem entrar em contato pelo WhatsApp para tirar dúvidas e agendar avaliação com o Dr. Adriano Camillo.',
  },
  xanxere: {
    slug: 'xanxere',
    name: 'Xanxerê',
    state: 'SC',
    badge: 'Atendimento para pacientes de Xanxerê e região',
    titleLocation: 'para pacientes de Xanxerê',
    intro:
      'Veja os tratamentos oferecidos a pacientes de Xanxerê, com planejamento individual e atendimento em São Lourenço do Oeste.',
  },
  maravilha: {
    slug: 'maravilha',
    name: 'Maravilha',
    state: 'SC',
    badge: 'Atendimento para pacientes de Maravilha e região',
    titleLocation: 'para pacientes de Maravilha',
    intro:
      'Pacientes de Maravilha podem organizar o primeiro contato pelo WhatsApp e agendar avaliação no consultório do Dr. Adriano Camillo.',
  },
  pinhalzinho: {
    slug: 'pinhalzinho',
    name: 'Pinhalzinho',
    state: 'SC',
    badge: 'Atendimento para pacientes de Pinhalzinho e região',
    titleLocation: 'para pacientes de Pinhalzinho',
    intro:
      'Conheça as opções de atendimento para pacientes de Pinhalzinho e converse com a equipe antes de agendar sua avaliação.',
  },
  concordia: {
    slug: 'concordia',
    name: 'Concórdia',
    state: 'SC',
    badge: 'Atendimento para pacientes de Concórdia e região',
    titleLocation: 'para pacientes de Concórdia',
    intro:
      'Pacientes de Concórdia podem consultar os tratamentos, tirar dúvidas e agendar avaliação no consultório em São Lourenço do Oeste.',
  },
};

export const REGIONAL_SERVICE_CITY_LIST = Object.values(REGIONAL_SERVICE_CITIES);

export const getRegionalServicePath = (baseSlug, city) =>
  city.isPrimary ? `/${baseSlug}` : `/${baseSlug}-${city.slug}`;
