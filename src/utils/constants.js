// Dados centrais do site — Dr. Adriano Camillo
// Edite aqui e o site inteiro atualiza.

export const SITE = {
  name: 'Dr. Adriano Camillo',
  title: 'Cirurgião-Dentista',
  cro: 'CRO-SC 4011',
  url: 'https://dradrianocamillo.com',
  phone: '(49) 9 9836-2864',
  phoneRaw: '5549998362864',
  instagram: 'https://www.instagram.com/dr.adrianocamillo/',
  instagramHandle: '@dr.adrianocamillo',
};

export const ADDRESS = {
  street: 'Rua Coronel Bertaso, 1243 — Sala 206, Centro',
  city: 'São Lourenço do Oeste',
  state: 'SC',
  zip: '89990-000',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Adriano+Camillo+Odontologia+e+Face%2C+S%C3%A3o+Louren%C3%A7o+do+Oeste%2C+SC',
};

// Gera link do WhatsApp com mensagem pré-preenchida
export const whatsapp = (text) =>
  `https://wa.me/${SITE.phoneRaw}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const WHATSAPP_DEFAULT = whatsapp(
  'Olá, Dr. Adriano! Vim pelo site e gostaria de agendar uma avaliação.'
);

export const WHATSAPP_HIFU = whatsapp(
  'Olá, Dr. Adriano! Gostaria de agendar uma avaliação para o HIFU (Ultrassom Microfocado).'
);

export const WHATSAPP_ALUGAR_HIFU = whatsapp(
  'Olá! Gostaria de mais informações sobre a locação do equipamento HIFU Ultramed.'
);

export const WHATSAPP_RENTAL = WHATSAPP_ALUGAR_HIFU;

export const WHATSAPP_EMERGENCY = whatsapp(
  'Olá! Tenho uma urgência odontológica e preciso de atendimento.'
);

export const LOCATIONS = [
  {
    city: 'São Lourenço do Oeste — SC',
    type: 'Consultório Principal (Sede)',
    address: ADDRESS.street,
    mapsUrl: ADDRESS.mapsUrl,
    pageUrl: '/servicos',
    main: true,
  },
  {
    city: 'Chapecó — SC',
    type: 'Pacientes da região • Fácil acesso (~50 min)',
    address: 'Agendamento planejado pelo WhatsApp',
    mapsUrl: 'https://maps.google.com/?q=Chapeco,+SC',
    main: false,
  },
  {
    city: 'Pato Branco — PR',
    type: 'Pacientes da região • Fácil acesso (~45 min)',
    address: 'Agendamento planejado pelo WhatsApp',
    mapsUrl: 'https://maps.google.com/?q=Pato+Branco,+PR',
    main: false,
  },
  {
    city: 'Realeza — PR',
    type: 'Atendimento com agendamento',
    address: '25 km (~20 min) — cidade vizinha',
    mapsUrl: 'https://maps.google.com/?q=Realeza,+PR',
    pageUrl: '/servicos/realeza',
    main: false,
  },
  {
    city: 'Ampére — PR',
    type: 'Atendimento com agendamento',
    address: '30 km (~25 min) — cidade vizinha',
    mapsUrl: 'https://maps.google.com/?q=Amp%C3%A9re,+PR',
    pageUrl: '/servicos/ampere',
    main: false,
  },
  {
    city: 'Curitiba — PR',
    type: 'Atendimento domiciliar especializado',
    address: 'Agende pelo WhatsApp',
    mapsUrl: 'https://maps.google.com/?q=Curitiba,+PR',
    pageUrl: '/servicos/curitiba',
    main: false,
  },
];

