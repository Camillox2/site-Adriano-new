// Dados centrais do site — Dr. Adriano Camillo
// Edite aqui e o site inteiro atualiza.

export const SITE = {
  name: 'Dr. Adriano Camillo',
  title: 'Cirurgião-Dentista',
  url: 'https://dradrianocamillo.com',
  phone: '(49) 9 9836-2864',
  phoneRaw: '5549998362864',
  email: 'contato@dradrianocamillo.com',
  instagram: 'https://www.instagram.com/dr.adrianocamillo/',
  instagramHandle: '@dr.adrianocamillo',
};

export const ADDRESS = {
  street: 'Rua Coronel Bertaso, 1243 — Sala 206, Centro',
  city: 'São Lourenço do Oeste',
  state: 'SC',
  zip: '89990-000',
  mapsUrl:
    'https://maps.google.com/?q=Rua+Coronel+Bertaso,+1243+-+Sala+206+-+Centro,+S%C3%A3o+Louren%C3%A7o+do+Oeste+-+SC,+89990-000',
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

export const WHATSAPP_EMERGENCY = whatsapp(
  'Olá! Tenho uma urgência odontológica e preciso de atendimento.'
);

export const LOCATIONS = [
  {
    city: 'São Lourenço do Oeste — SC',
    type: 'Consultório principal',
    address: ADDRESS.street,
    mapsUrl: ADDRESS.mapsUrl,
    main: true,
  },
  {
    city: 'Realeza — PR',
    type: 'Atendimento com agendamento',
    address: 'Agende pelo WhatsApp',
    mapsUrl: 'https://maps.google.com/?q=Realeza,+PR',
    main: false,
  },
  {
    city: 'Ampére — PR',
    type: 'Atendimento com agendamento',
    address: 'Agende pelo WhatsApp',
    mapsUrl: 'https://maps.google.com/?q=Amp%C3%A9re,+PR',
    main: false,
  },
  {
    city: 'Curitiba — PR',
    type: 'Atendimento domiciliar',
    address: 'Agende pelo WhatsApp',
    mapsUrl: 'https://maps.google.com/?q=Curitiba,+PR',
    main: false,
  },
];
