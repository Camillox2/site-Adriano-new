export const CITIES = {
  'sao-lourenco-do-oeste': {
    name: 'São Lourenço do Oeste',
    state: 'SC',
    slugSuffix: 'sao-lourenco-do-oeste',
    isPrimary: true,
    locationTitle: 'em São Lourenço do Oeste - SC',
    contextText: 'no consultório do Dr. Adriano Camillo em São Lourenço do Oeste - SC.',
  },
  'chapeco': {
    name: 'Chapecó',
    state: 'SC',
    slugSuffix: 'chapeco',
    isPrimary: false,
    locationTitle: 'para pacientes de Chapecó - SC',
    contextText: 'atendimento odontológico especializado para pacientes de Chapecó no consultório em São Lourenço do Oeste - SC.',
  },
  'pato-branco': {
    name: 'Pato Branco',
    state: 'PR',
    slugSuffix: 'pato-branco',
    isPrimary: false,
    locationTitle: 'para pacientes de Pato Branco - PR',
    contextText: 'atendimento odontológico de referência para pacientes de Pato Branco - PR no consultório em São Lourenço do Oeste - SC.',
  },
  'ampere': {
    name: 'Ampére',
    state: 'PR',
    slugSuffix: 'ampere',
    isPrimary: false,
    locationTitle: 'para pacientes de Ampére - PR',
    contextText: 'atendimento odontológico de alta precisão para moradores de Ampére - PR com fácil acesso em São Lourenço do Oeste - SC.',
  },
  'realeza': {
    name: 'Realeza',
    state: 'PR',
    slugSuffix: 'realeza',
    isPrimary: false,
    locationTitle: 'para pacientes de Realeza - PR',
    contextText: 'excelência em tratamentos odontológicos para a população de Realeza - PR no consultório em São Lourenço do Oeste - SC.',
  },
  'novo-horizonte': {
    name: 'Novo Horizonte',
    state: 'SC',
    slugSuffix: 'novo-horizonte',
    isPrimary: false,
    locationTitle: 'para pacientes de Novo Horizonte - SC',
    contextText: 'atendimento personalizado e acolhedor para moradores de Novo Horizonte - SC no consultório em São Lourenço do Oeste.',
  },
};

const BASE_SERVICES = {
  'odontologia-estetica': {
    baseSlug: 'odontologia-estetica',
    label: 'Odontologia Estética',
    eyebrow: 'Estética Odontológica & Harmonia do Sorriso',
    titlePattern: (city) => `Odontologia Estética ${city.locationTitle} | Dr. Adriano Camillo`,
    descriptionPattern: (city) => `Odontologia estética ${city.locationTitle}. Lentes de contato dental, facetas de resina, clareamento e planejamento digital do sorriso.`,
    headingPattern: (city) => `Odontologia Estética ${city.locationTitle}`,
    introPattern: (city) => `Transforme o seu sorriso com planejamento individualizado, tecnologia digital e preservação da saúde bucal ${city.contextText}`,
    sectionTitlePattern: (city) => `Estética Odontológica com Planejamento ${city.locationTitle}`,
    paragraphs: [
      'A odontologia estética moderna vai muito além da beleza visual. O Dr. Adriano Camillo busca unir a harmonia estética à saúde periodontal e à correta função mastigatória, garantindo tratamentos duradouros e seguros.',
      'Utilizamos recursos modernos de planejamento para prever o formato, a cor e a proporção ideais dos dentes. Seja através de clareamento dental, facetas de resina ou lentes de contato em cerâmica, cada detalhe é desenhado exclusivamente para o seu formato facial.',
      'Antes de indicar qualquer procedimento, realizamos uma avaliação criteriosa para entender o que incomoda você e definir a alternativa mais conservadora e eficiente.',
    ],
    benefits: [
      'Planejamento digital personalizado para a anatomia do seu rosto',
      'Preservação máxima da estrutura dental natural',
      'Restauração da cor, formato e alinhamento dos dentes',
      'Uso de materiais estéticos de alta durabilidade',
      'Clareamento dental seguro e sem hipersensibilidade indesejada',
      'Acompanhamento próximo em todas as etapas do tratamento',
    ],
    steps: [
      'Consulta inicial e escuta atenta dos seus objetivos',
      'Avaliação clínica completa e fotografias diagnósticas',
      'Apresentação do plano estético e simulação do resultado',
      'Execução dos procedimentos com conforto e precisão',
      'Polimento, ajustes finais e orientação de manutenção',
    ],
    faqs: [
      {
        question: 'Odontologia estética desgasta muito os dentes?',
        answer:
          'Não. Priorizamos técnicas minimamente invasivas. Em muitas situações (como restaurações em resina e facetas diretas), o desgaste é mínimo ou até nulo.',
      },
      {
        question: 'Qual a diferença entre facetas de resina e lentes de cerâmica?',
        answer:
          'As facetas de resina são confeccionadas diretamente em consultório com alta estética. As lentes de cerâmica/porcelana oferecem maior estabilidade de cor a longo prazo.',
      },
      {
        question: 'O clareamento dental danifica o esmalte?',
        answer:
          'Não. Quando realizado com supervisão profissional e produtos de qualidade comprovada, o clareamento age apenas nos pigmentos internos do dente.',
      },
    ],
    whatsappMessagePattern: (city) => `Olá, Dr. Adriano! Gostaria de agendar uma avaliação de odontologia estética (${city.name}).`,
  },

  'implantes-dentarios': {
    baseSlug: 'implantes-dentarios',
    label: 'Implantes Dentários',
    eyebrow: 'Implantodontia & Reabilitação Oral',
    titlePattern: (city) => `Implantes Dentários ${city.locationTitle} | Dr. Adriano Camillo`,
    descriptionPattern: (city) => `Implantes dentários ${city.locationTitle}. Reabilitação oral fixa com máxima segurança, estética natural e planejamento guiado.`,
    headingPattern: (city) => `Implantes Dentários ${city.locationTitle}`,
    introPattern: (city) => `Recupere a mastigação firme, a segurança para falar e a alegria de sorrir ${city.contextText}`,
    sectionTitlePattern: (city) => `Reabilitação Oral Segura e Planejada ${city.locationTitle}`,
    paragraphs: [
      'A perda de um ou mais dentes afeta diretamente a saúde, a digestão, o alinhamento da arcada e a autoestima. Os implantes dentários representam a solução mais avançada e estável para substituir raízes perdidas.',
      'Com mais de 30 anos de experiência clínica, o Dr. Adriano Camillo utiliza exames radiográficos e tomográficos para planejar o posicionamento exato de cada implante de titânio.',
      'Desde reposições unitárias até próteses protocolo sobre implantes (arcada total), o processo é realizado com anestesia eficiente, técnicas humanizadas e acompanhamento dedicado na fase de cicatrização.',
    ],
    benefits: [
      'Fixação firme que permite mastigar com total liberdade',
      'Aparência e sensação idênticas aos dentes naturais',
      'Preservação da estrutura óssea facial e dos dentes vizinhos',
      'Materiais de titânio e zircônia de altíssima biocompatibilidade',
      'Procedimentos planejados com exames tridimensionais',
      'Maior durabilidade e estabilidade se comparado às próteses removíveis',
    ],
    steps: [
      'Avaliação inicial e anamnese completa',
      'Exames de imagem (tomografia) para mapeamento ósseo',
      'Procedimento de instalação do implante com máximo conforto',
      'Acompanhamento do período de integração óssea (osseointegração)',
      'Instalação da prótese definitiva e revisão funcional',
    ],
    faqs: [
      {
        question: 'O procedimento de implante dentário dói?',
        answer:
          'Não. A cirurgia é realizada sob anestesia local eficaz e ambiente controlado. No pós-operatório, indicamos medicação adequada para garantir um processo tranquilo.',
      },
      {
        question: 'Quem não tem muito osso pode fazer implante?',
        answer:
          'Sim. Nesses casos, podemos avaliar a necessidade de enxertos ósseos ou técnicas específicas de reabilitação. A tomografia nos dá o diagnóstico exato.',
      },
      {
        question: 'Quanto tempo leva para colocar o dente definitivo?',
        answer:
          'O tempo médio de cicatrização varia entre 3 a 6 meses conforme a região e a resposta biológica de cada paciente. Em casos selecionados, é possível utilizar carga imediata.',
      },
    ],
    whatsappMessagePattern: (city) => `Olá, Dr. Adriano! Gostaria de agendar uma avaliação para implantes dentários (${city.name}).`,
  },

  'ortodontia': {
    baseSlug: 'ortodontia',
    label: 'Ortodontia',
    eyebrow: 'Ortodontia & Alinhamento Dental',
    titlePattern: (city) => `Ortodontia ${city.locationTitle} | Dr. Adriano Camillo`,
    descriptionPattern: (city) => `Ortodontia ${city.locationTitle}. Aparelhos estéticos, alinhadores transparentes e aparelhos fixos com acompanhamento próximo.`,
    headingPattern: (city) => `Ortodontia ${city.locationTitle}`,
    introPattern: (city) => `Conquiste um sorriso alinhado e melhore a sua saúde bucal ${city.contextText}`,
    sectionTitlePattern: (city) => `Alinhamento Dental e Correção da Mordida ${city.locationTitle}`,
    paragraphs: [
      'Dentes desalinhados ou problemas na mordida (oclusão) podem causar desgaste anormal do esmalte, dificuldade na higienização, dores de cabeça e tensões na articulação temporomandibular (ATM).',
      'No consultório do Dr. Adriano Camillo em São Lourenço do Oeste, realizamos o diagnóstico completo por meio de documentação ortodôntica para selecionar o tipo de aparelho mais adequado ao seu estilo de vida.',
      'Trabalhamos com aparelhos convencionais, estéticos de safira/cerâmica e alinhadores. O acompanhamento periódico garante movimentos suaves, eficientes e seguros para dentes e gengivas.',
    ],
    benefits: [
      'Harmonização e alinhamento estético do sorriso',
      'Correção da mastigação e melhora da articulação da fala',
      'Facilita a escovação e o uso do fio dental, prevenindo cáries',
      'Prevenção de dores articulares causadas por mordida cruzada ou aberta',
      'Opções de aparelhos estéticos e alinhadores discretos',
      'Atendimento preventivo e corretivo para crianças, jovens e adultos',
    ],
    steps: [
      'Consulta e avaliação ortodôntica inicial',
      'Análise de raio-X, molde e documentação ortodôntica',
      'Apresentação do plano de tratamento e escolha do aparelho',
      'Instalação e manutenções periódicas mensais',
      'Remoção, instalação de contenção e polimento',
    ],
    faqs: [
      {
        question: 'Existe idade limite para usar aparelho ortodôntico?',
        answer:
          'Não! Adultos de qualquer idade podem fazer tratamento ortodôntico, desde que possuam gengivas e estruturas ósseas saudáveis.',
      },
      {
        question: 'Qual a diferença entre aparelho convencional e estético?',
        answer:
          'O convencional utiliza bráquetes metálicos. O estético utiliza peças de cerâmica ou safira transparente, que ficam praticamente imperceptíveis no sorriso.',
      },
      {
        question: 'Quanto tempo dura em média um tratamento ortodôntico?',
        answer:
          'A duração depende da complexidade da mordida, variando geralmente entre 12 a 36 meses. O cumprimento das consultas de manutenção é fundamental para o prazo.',
      },
    ],
    whatsappMessagePattern: (city) => `Olá, Dr. Adriano! Gostaria de agendar uma avaliação de ortodontia (${city.name}).`,
  },

  'harmonizacao-orofacial': {
    baseSlug: 'harmonizacao-orofacial',
    label: 'Harmonização Orofacial',
    eyebrow: 'Estética Facial & Rejuvenescimento',
    titlePattern: (city) => `Harmonização Orofacial ${city.locationTitle} | Dr. Adriano Camillo`,
    descriptionPattern: (city) => `Harmonização orofacial ${city.locationTitle}. Toxina botulínica, preenchimento com ácido hialurônico e bioestimuladores com resultados naturais.`,
    headingPattern: (city) => `Harmonização Orofacial ${city.locationTitle}`,
    introPattern: (city) => `Realce seus traços marcantes e previna o envelhecimento precoce com procedimentos faciais seguros ${city.contextText}`,
    sectionTitlePattern: (city) => `Equilíbrio Facial com Indicação Responsável ${city.locationTitle}`,
    paragraphs: [
      'A Harmonização Orofacial (HOF) une saúde, estética e anatomia para promover a simetria entre o sorriso e a face. Nosso objetivo não é transformar seu rosto, mas sim suavizar marcas do tempo e valorizar a sua beleza natural.',
      'O Dr. Adriano Camillo realiza uma análise facial criteriosa antes de propor procedimentos como aplicação de toxina botulínica (botox), preenchimento labial/malar com ácido hialurônico e bioestimuladores de colágeno.',
      'Todos os produtos utilizados possuem registro na ANVISA e são aplicados com técnicas delicadas para garantir conforto, segurança e recuperação rápida.',
    ],
    benefits: [
      'Suavização de rugas dinâmicas na testa, pés de galinha e glabela',
      'Definição do contorno mandibular, lábios e maçãs do rosto',
      'Estímulo natural da produção de colágeno pela pele',
      'Procedimentos rápidos realizados em consultório',
      'Aspecto descansado, rejuvenescido e muito natural',
      'Protocolos personalizados respeitando suas proporções anatômicas',
    ],
    steps: [
      'Análise facial minuciosa e escuta das suas queixas',
      'Mapeamento dos pontos anatômicos de aplicação',
      'Aplicação dos produtos com anestésico local/tópico',
      'Orientações pós-procedimento e cuidados imediatos',
      'Consulta de retorno e reavaliação dos resultados',
    ],
    faqs: [
      {
        question: 'O resultado da harmonização orofacial fica artificial?',
        answer:
          'Não quando planejada com responsabilidade. Respeitamos a anatomia e as proporções individuais para que o resultado seja sutil e natural.',
      },
      {
        question: 'Quanto tempo dura a aplicação de Botox e Preenchimento?',
        answer:
          'A toxina botulínica dura em média de 4 a 6 meses. O preenchimento com ácido hialurônico varia entre 12 a 18 meses, sendo absorvido gradativamente.',
      },
      {
        question: 'Posso voltar às atividades normais após o procedimento?',
        answer:
          'Sim. A maioria dos procedimentos permite retorno imediato à rotina, exigindo apenas cuidados básicos nas primeiras 24h.',
      },
    ],
    whatsappMessagePattern: (city) => `Olá, Dr. Adriano! Gostaria de agendar uma avaliação de harmonização orofacial (${city.name}).`,
  },

  'dtm-dor-orofacial': {
    baseSlug: 'dtm-dor-orofacial',
    label: 'DTM e Dor Orofacial',
    eyebrow: 'Tratamento de Articulação (ATM) & Dores Faciais',
    titlePattern: (city) => `DTM e Dor Orofacial ${city.locationTitle} | Dr. Adriano Camillo`,
    descriptionPattern: (city) => `Tratamento de DTM e dor orofacial ${city.locationTitle}. Diagnóstico de bruxismo, estalos na mandíbula, dores na ATM e dores de cabeça.`,
    headingPattern: (city) => `DTM e Dor Orofacial ${city.locationTitle}`,
    introPattern: (city) => `Alivie dores na mandíbula, estalos articulares e dores de cabeça ${city.contextText}`,
    sectionTitlePattern: (city) => `Diagnóstico Criterioso para o Alívio da Dor ${city.locationTitle}`,
    paragraphs: [
      'A Disfunção Temporomandibular (DTM) afeta a articulação que liga a mandíbula ao crânio (ATM), além da musculatura da mastigação. Sintomas como estalos ao abrir a boca, zumbidos no ouvido, travamento articular e dores de cabeça frequentes indicam a necessidade de avaliação.',
      'O Dr. Adriano Camillo realiza uma investigação profunda que envolve análise palpatória muscular, teste de mobilidade articular, avaliação de desgaste dental por bruxismo e histórico de estresse.',
      'O tratamento pode incluir o uso de placas miorrelaxantes personalizadas, orientações comportamentais, terapias complementares como ozonioterapia e laserterapia para devolver o conforto no seu dia a dia.',
    ],
    benefits: [
      'Alívio de dores de cabeça tensionais e dores faciais recorrentes',
      'Redução de estalos, ruídos e desconforto ao mastigar',
      'Proteção contra desgaste excessivo dos dentes pelo bruxismo',
      'Placa miorrelaxante ajustada com precisão em articulador',
      'Melhoria na qualidade do sono e redução da tensão muscular',
      'Abordagem clínica integrativa e humanizada',
    ],
    steps: [
      'Mapeamento dos pontos de dor, hábitos e histórico de sintomas',
      'Exame palpatório e teste de movimentação articular',
      'Moldagem e confecção da placa de bruxismo/DTM se indicada',
      'Instalação, ajustes de oclusão e orientação de uso',
      'Acompanhamento da regressão dos sintomas',
    ],
    faqs: [
      {
        question: 'Aperto os dentes enquanto durmo. Isso é DTM?',
        answer:
          'O hábito de apertar ou ranger os dentes é chamado de bruxismo e pode desencadear ou agravar a DTM. Uma placa miorrelaxante personalizada ajuda a proteger dentes e articulações.',
      },
      {
        question: 'Dores de cabeça frequentes podem ter origem nos dentes?',
        answer:
          'Sim. A tensão nos músculos mastigatórios por causa de desequilíbrio na mordida ou DTM é uma causa comum de dores de cabeça tensionais.',
      },
      {
        question: 'O tratamento de DTM exige cirurgia?',
        answer:
          'Na grande maioria dos casos (mais de 90%), o tratamento é conservador e não cirúrgico, envolvendo placas, fisioterapia muscular e terapias de suporte.',
      },
    ],
    whatsappMessagePattern: (city) => `Olá, Dr. Adriano! Gostaria de agendar uma avaliação para DTM e dor orofacial (${city.name}).`,
  },

  'ozonioterapia': {
    baseSlug: 'ozonioterapia',
    label: 'Ozonioterapia',
    eyebrow: 'Terapia Bioestimulante & Cicatrização',
    titlePattern: (city) => `Ozonioterapia Odontológica ${city.locationTitle} | Dr. Adriano Camillo`,
    descriptionPattern: (city) => `Ozonioterapia odontológica ${city.locationTitle}. Terapia biológica com ação bactericida e aceleradora da cicatrização pós-operatória.`,
    headingPattern: (city) => `Ozonioterapia Odontológica ${city.locationTitle}`,
    introPattern: (city) => `Acelere a recuperação pós-operatória e previna infecções com o poder da Ozonioterapia medicinal ${city.contextText}`,
    sectionTitlePattern: (city) => `Tecnologia Biológica para a Saúde Bucal ${city.locationTitle}`,
    paragraphs: [
      'A Ozonioterapia é uma modalidade terapêutica avançada que utiliza a mistura de oxigênio e ozônio medicinal (O3) para promover potente ação germicida, imunomoduladora e estimuladora de reparo tecidual.',
      'Na odontologia, a ozonioterapia é aplicada pelo Dr. Adriano Camillo como um excelente recurso complementar em procedimentos cirúrgicos (como implantes e extrações), tratamentos de canal, afecções gengivais, aftas e herpes.',
      'O procedimento é totalmente indolor, rápido e sem efeitos colaterais químicos, melhorando a oxigenação celular e diminuindo significativamente a dor e o inchaço pós-operatório.',
    ],
    benefits: [
      'Potente ação bactericida, fungicida e virucida natural',
      'Aceleração da cicatrização tecidual em pós-operatórios',
      'Redução do inchaço, edema e desconforto pós-cirúrgico',
      'Auxílio no tratamento de sensibilidade dentária e aftas',
      'Terapia 100% biológica sem resíduos tóxicos no organismo',
      'Aplicação rápida, segura e indolor no próprio consultório',
    ],
    steps: [
      'Avaliação da indicação da terapia conforme o procedimento realizado',
      'Definição da concentração e forma de aplicação (gás ou água ozonizada)',
      'Aplicação tópica ou irrigação no local afetado',
      'Orientação sobre o protocolo de sessões complementares',
      'Acompanhamento do processo de regeneração tecidual',
    ],
    faqs: [
      {
        question: 'A aplicação de ozonioterapia dói?',
        answer:
          'Não. A aplicação é totalmente indolora e muito bem tolerada pelos pacientes.',
      },
      {
        question: 'Em quais procedimentos a ozonioterapia é recomendada?',
        answer:
          'Ela é indicada como coadjuvante na cicatrização de implantes, cirurgias de sisos, descontaminação de canais, tratamento de periodontite, aftas e feridas bucais.',
      },
      {
        question: 'A ozonioterapia substitui o tratamento odontológico tradicional?',
        answer:
          'Não. Trata-se de uma terapia complementar integrada que otimiza e potencializa os resultados dos tratamentos odontológicos tradicionais.',
      },
    ],
    whatsappMessagePattern: (city) => `Olá, Dr. Adriano! Gostaria de agendar uma avaliação de ozonioterapia (${city.name}).`,
  },
};

// Gera dinamicamente todas as combinações de Serviço + Cidade
const generatedPages = {};

Object.values(BASE_SERVICES).forEach((service) => {
  Object.values(CITIES).forEach((city) => {
    let slug = '';
    if (service.baseSlug === 'dtm-dor-orofacial') {
      slug = city.isPrimary ? 'dtm-dor-orofacial' : `dtm-dor-orofacial-${city.slugSuffix}`;
    } else {
      slug = `${service.baseSlug}-${city.slugSuffix}`;
    }

    generatedPages[slug] = {
      slug,
      cityName: city.name,
      cityState: city.state,
      label: service.label,
      eyebrow: service.eyebrow,
      title: service.titlePattern(city),
      description: service.descriptionPattern(city),
      heading: service.headingPattern(city),
      intro: service.introPattern(city),
      sectionTitle: service.sectionTitlePattern(city),
      paragraphs: service.paragraphs,
      benefits: service.benefits,
      steps: service.steps,
      faqs: service.faqs,
      whatsappMessage: service.whatsappMessagePattern(city),
    };
  });
});

export const SERVICE_PAGES = generatedPages;
export const SERVICE_PAGE_LIST = Object.values(SERVICE_PAGES);
