// Perguntas frequentes das páginas fixas (fonte única).
// Usadas pelos componentes React (acordeões visíveis + JSON-LD em tempo de execução)
// e por scripts/generate-static-seo-pages.cjs (FAQPage no HTML estático).

export const HIFU_FAQS = [
  {
    question: 'O que é HIFU (Ultrassom Microfocado)?',
    answer:
      'HIFU é a sigla de High Intensity Focused Ultrasound — ultrassom focado de alta intensidade. É uma tecnologia não invasiva que concentra energia em pontos precisos das camadas profundas da pele, provocando a contração imediata das fibras e estimulando a produção de colágeno novo. O resultado é um efeito lifting sem cirurgia.',
  },
  {
    question: 'Para quem o HIFU é indicado?',
    answer:
      'É indicado principalmente para pessoas a partir dos 30 anos com flacidez leve a moderada na face, papada ou pescoço, que desejam rejuvenescer sem cirurgia. A avaliação profissional define se o HIFU é a melhor opção para o seu caso.',
  },
  {
    question: 'Quando os resultados aparecem?',
    answer:
      'Há um efeito tensor discreto já nos primeiros dias, mas o principal resultado vem da produção de colágeno novo: a melhora se torna visível a partir de 30 dias e evolui progressivamente por até 6 meses após a sessão.',
  },
  {
    question: 'O procedimento dói?',
    answer:
      'A maioria dos pacientes sente apenas pontadas leves ou calor durante a aplicação, bem tolerados. Não é necessária anestesia geral e o desconforto termina junto com a sessão.',
  },
  {
    question: 'Quantas sessões são necessárias?',
    answer:
      'Na maioria dos casos, uma única sessão é suficiente. Dependendo do grau de flacidez, pode ser recomendada uma sessão de manutenção após 12 a 18 meses.',
  },
  {
    question: 'Quais os cuidados após o HIFU?',
    answer:
      'Os cuidados são simples: usar protetor solar diariamente, manter a pele hidratada e evitar exposição solar intensa nos primeiros dias. Não há restrição para atividades do dia a dia.',
  },
  {
    question: 'HIFU substitui a cirurgia plástica?',
    answer:
      'O HIFU trata flacidez leve a moderada com excelentes resultados, mas não substitui um lifting cirúrgico em casos de flacidez acentuada. Na avaliação, o Dr. Adriano indica com transparência o tratamento mais adequado ao seu caso.',
  },
];

export const SERVICES_FAQS = [
  {
    question: 'Como saber qual tratamento é indicado para mim?',
    answer:
      'A indicação depende da avaliação clínica, do seu histórico de saúde e dos seus objetivos. Durante a consulta, o Dr. Adriano explica as alternativas, benefícios, limitações e etapas antes de qualquer decisão.',
  },
  {
    question: 'Posso agendar diretamente pelo WhatsApp?',
    answer:
      'Sim. No celular, toque no botão do WhatsApp. No computador, você também pode preencher o formulário para abrir a conversa com as informações iniciais já organizadas.',
  },
  {
    question: 'O consultório atende pacientes de outras cidades?',
    answer:
      'Sim. O consultório fica em São Lourenço do Oeste e recebe pacientes da região. Ao entrar em contato, informe sua cidade para facilitar a organização do atendimento.',
  },
  {
    question: 'Os resultados são iguais para todas as pessoas?',
    answer:
      'Não. Resultados, duração e número de sessões variam conforme o quadro clínico, os hábitos e a resposta individual. A avaliação é essencial para alinhar expectativas com segurança.',
  },
];

export const ALUGAR_HIFU_FAQS = [
  {
    "question": "É possível contratar com CPF?",
    "answer": "Sim, a consulta pode ser feita como profissional autônomo, com CPF, ou como clínica e empresa, com CNPJ. Os documentos e a habilitação do responsável são verificados antes da confirmação."
  },
  {
    "question": "Quais ponteiras acompanham o aparelho?",
    "answer": "Consulte a disponibilidade das ponteiras faciais de 1,5 mm, 3,0 mm e 4,5 mm. A configuração e os disparos incluídos são definidos na proposta de locação."
  },
  {
    "question": "Como funcionam a entrega e a retirada?",
    "answer": "Informe sua cidade e a data desejada. A logística, os horários e eventuais custos são combinados antes da reserva."
  },
  {
    "question": "Quem pode operar o Ultramed HIFU?",
    "answer": "Profissionais habilitados e capacitados para operar o equipamento. Informe sua formação e experiência na consulta para alinhar os requisitos de uso e a orientação operacional."
  },
  {
    "question": "Qual é o valor da locação?",
    "answer": "O valor depende do período, da configuração e da logística. A proposta informa as condições de uso, as ponteiras e os disparos incluídos."
  }
];

// Nó FAQPage (schema.org) com exatamente o texto visível das perguntas/respostas.
export const faqPageSchema = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
});

