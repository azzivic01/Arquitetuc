/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface ActionItem {
  label: string;
  href: string;
}

export interface ChapterItem {
  enabled: boolean;
  id: string;
  stepNumber: string;
  stepName: string;
  title: string;
  highlightedWord: string;
  subtitle: string;
  description: string;
  details: string[];
  image: string;
  imageAlt: string;
}

export interface ServiceItem {
  enabled: boolean;
  id: string;
  title: string;
  highlightedWord: string;
  category: string;
  summary: string;
  description: string;
  tags: string[];
  note: string;
}

export interface GalleryItem {
  enabled: boolean;
  id: string;
  title: string;
  category: string;
  aspect: 'landscape' | 'portrait' | 'square';
  image: string;
  imageAlt: string;
  caption: string;
}

export interface FaqItem {
  enabled: boolean;
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SiteContent {
  brand: {
    enabled: boolean;
    name: string;
    descriptor: string;
    tagline: string;
  };
  header: {
    enabled: boolean;
    nav: NavItem[];
    primaryAction: ActionItem;
    sound: {
      labelOn: string;
      labelOff: string;
      audioSrc?: string;
    };
  };
  intro: {
    enabled: boolean;
    kicker: string;
    title: {
      leadingText: string;
      highlightedWord: string;
      trailingText: string;
    };
    description: string;
    manifestoPoints: string[];
  };
  hero: {
    enabled: boolean;
    kicker: string;
    title: {
      leadingText: string;
      highlightedWord: string;
      trailingText: string;
    };
    description: string;
    primaryAction: ActionItem;
    secondaryAction: ActionItem;
    metadataNote: string;
    image: string;
    mobileImage: string;
    imageAlt: string;
  };
  capitulos: ChapterItem[];
  servicos: ServiceItem[];
  galeria: GalleryItem[];
  visite: {
    enabled: boolean;
    kicker: string;
    title: string;
    highlightedWord: string;
    description: string;
    address: string;
    schedule: string;
    contact: string;
    note: string;
    primaryAction: ActionItem;
  };
  depoimentos: {
    enabled: boolean;
    items: Array<{
      id: string;
      quote: string;
      author: string;
      role: string;
    }>;
  };
  faq: FaqItem[];
  ctaFinal: {
    enabled: boolean;
    kicker: string;
    title: {
      leadingText: string;
      highlightedWord: string;
      trailingText: string;
    };
    description: string;
    primaryAction: ActionItem;
    secondaryAction: ActionItem;
    metadataNote: string;
  };
  rodape: {
    enabled: boolean;
    brandName: string;
    tagline: string;
    addressMarker: string;
    rights: string;
    reducedMotionAction: {
      enableLabel: string;
      disableLabel: string;
    };
    links: {
      label: string;
      href: string;
    }[];
  };
}

export const siteContent: SiteContent = {
  brand: {
    enabled: true,
    name: 'Alba',
    descriptor: 'Dermatologia & Cuidados com a Pele',
    tagline: 'Luz natural, escuta atenta e cuidado sem pressa.',
  },

  header: {
    enabled: true,
    nav: [
      { label: 'Cuidado', href: '#capitulos' },
      { label: 'Serviços', href: '#servicos' },
      { label: 'Espaço', href: '#galeria' },
      { label: 'Visite', href: '#visite' },
      { label: 'Dúvidas', href: '#faq' },
      { label: 'Kit de UI', href: '#laboratorio-ui' },
    ],
    primaryAction: {
      label: 'Agendar conversa',
      href: '#visite',
    },
    sound: {
      labelOn: 'Ligar som ambiente',
      labelOff: 'Desligar som ambiente',
    },
  },

  intro: {
    enabled: true,
    kicker: 'Princípios do Cuidado',
    title: {
      leadingText: 'A saúde da pele começa com',
      highlightedWord: 'tempo',
      trailingText: 'para observar.',
    },
    description:
      'Criamos um ambiente onde cada consulta acontece sem pressa, com luz difusa e diálogo aberto, priorizando o equilíbrio e a individualidade de cada pele.',
    manifestoPoints: [
      'Escuta clínica aprofundada antes de qualquer recomendação',
      'Rotinas sustentáveis e adaptadas ao seu cotidiano real',
      'Ambiente com silêncio, luz natural e respeito ao seu ritmo',
    ],
  },

  hero: {
    enabled: true,
    kicker: 'Clínica Dermatológica',
    title: {
      leadingText: 'Cuidado dermatológico com',
      highlightedWord: 'calma',
      trailingText: 'e escuta atenta.',
    },
    description:
      'Um espaço pensado para acolher a sua pele com luz natural, atenção aos detalhes e um plano claro construído em conjunto para o seu dia a dia.',
    primaryAction: {
      label: 'Conhecer o atendimento',
      href: '#capitulos',
    },
    secondaryAction: {
      label: 'Como agendar',
      href: '#visite',
    },
    metadataNote: 'Atendimento presencial em [endereço da unidade]',
    image: '/src/assets/images/hero_ambiente.jpg',
    mobileImage: '/src/assets/images/hero_mobile.jpg',
    imageAlt: 'Ambiente iluminado da clínica Alba com luz natural e elementos de cerâmica',
  },

  capitulos: [
    {
      enabled: true,
      id: 'capitulo-acolhimento',
      stepNumber: '01',
      stepName: 'Acolhimento',
      title: 'Escutar',
      highlightedWord: 'primeiro',
      subtitle: 'Compreender seu histórico sem julgamentos ou pressa',
      description:
        'A primeira conversa é dedicada a entender sua rotina, suas queixas e o que você realmente sente no dia a dia. Sem listas prontas nem imposições.',
      details: [
        'Tempo dedicado exclusivamente para você',
        'Avaliação das sensibilidades e hábitos diários',
        'Espaço de diálogo com perguntas claras',
      ],
      image: '/src/assets/images/capitulo_acolhimento.jpg',
      imageAlt: 'Consultório com poltrona confortável em linho e luz suave matinal',
    },
    {
      enabled: true,
      id: 'capitulo-avaliacao',
      stepNumber: '02',
      stepName: 'Avaliação',
      title: 'Entender a sua',
      highlightedWord: 'pele',
      subtitle: 'Exame minucioso da barreira e das necessidades atuais',
      description:
        'Examinamos a textura, a hidratação e as alterações cutâneas sob iluminação adequada, buscando a causa das queixas e não apenas o disfarce temporário.',
      details: [
        'Análise da barreira de proteção cutânea',
        'Mapeamento de pontos de sensibilidade e ressecamento',
        'Explicação transparente sobre cada aspecto observado',
      ],
      image: '/src/assets/images/capitulo_avaliacao.jpg',
      imageAlt: 'Textura suave de pele bem cuidada sob iluminação difusa natural',
    },
    {
      enabled: true,
      id: 'capitulo-plano',
      stepNumber: '03',
      stepName: 'Plano',
      title: 'Um plano que cabe na sua',
      highlightedWord: 'rotina',
      subtitle: 'Orientações realistas que você consegue manter',
      description:
        'Desenvolvemos um conjunto conciso de cuidados que se encaixa no seu horário real. Fórmulas acessíveis, passos simples e respeito ao seu tempo.',
      details: [
        'Menos etapas, com maior consistência diária',
        'Critérios claros para limpeza, hidratação e proteção',
        'Alternativas pensadas para o clima e rotina local',
      ],
      image: '/src/assets/images/capitulo_plano.jpg',
      imageAlt: 'Frascos minimalistas de vidro fosco sobre pedra clara',
    },
    {
      enabled: true,
      id: 'capitulo-acompanhamento',
      stepNumber: '04',
      stepName: 'Acompanhamento',
      title: 'Ficar por',
      highlightedWord: 'perto',
      subtitle: 'Retornos pensados para ajustar o que for necessário',
      description:
        'A pele muda com as estações e com os momentos da vida. Estamos presentes para revisar o plano, esclarecer dúvidas e adaptar o cuidado sempre que preciso.',
      details: [
        'Canal direto para dúvidas entre as visitas',
        'Reavaliações periódicas para acompanhar a resposta',
        'Adaptações graduais conforme a mudança de estação',
      ],
      image: '/src/assets/images/capitulo_acompanhamento.jpg',
      imageAlt: 'Luz matinal sobre vaso de cerâmica com folhas verdes suaves',
    },
  ],

  servicos: [
    {
      enabled: true,
      id: 'servico-avaliacao-pele',
      title: 'Avaliação da pele',
      highlightedWord: 'integral',
      category: 'Consulta Clínica',
      summary: 'Diagnóstico calmo e cuidadoso da saúde cutânea',
      description:
        'Investigação completa de queixas como acne, rosácea, dermatites, manchas e ressecamento, com foco na restauração da barreira da pele.',
      tags: ['Diagnóstico clínico', 'Barreira cutânea', 'Escuta atenta'],
      note: 'Duração estimada: [tempo de consulta sugerido]',
    },
    {
      enabled: true,
      id: 'servico-cuidados-diarios',
      title: 'Cuidados do dia a',
      highlightedWord: 'dia',
      category: 'Rotina e Manutenção',
      summary: 'Desenho de rotinas viáveis e sustentáveis',
      description:
        'Planejamento personalizado de etapas de higienização, hidratação e fotoproteção, priorizando ingredientes gentis e hábitos descomplicados.',
      tags: ['Rotina descomplicada', 'Fotoproteção', 'Hidratação consciente'],
      note: 'Foco em simplicidade e constância',
    },
    {
      enabled: true,
      id: 'servico-acompanhamento-continuo',
      title: 'Acompanhamento',
      highlightedWord: 'contínuo',
      category: 'Cuidado em Longo Prazo',
      summary: 'Revisão periódica e ajustes sazonais',
      description:
        'Sessões de retorno para observar como a pele responde às mudanças de temperatura, rotina de trabalho e fases da vida.',
      tags: ['Revisão periódica', 'Ajuste de fórmulas', 'Suporte a dúvidas'],
      note: 'Agendamento prévio com intervalo planejado',
    },
  ],

  galeria: [
    {
      enabled: true,
      id: 'galeria-arquitetura',
      title: 'Luz e serenidade',
      category: 'Espaço',
      aspect: 'portrait',
      image: '/src/assets/images/galeria_luz_arquitetura.jpg',
      imageAlt: 'Detalhe de vidro fosco canelado e luz difusa filtrada no corredor',
      caption: 'Vidro fosco canelado e luz solar suave, criando privacidade e calma.',
    },
    {
      enabled: true,
      id: 'galeria-textura',
      title: 'Toque e textura',
      category: 'Cuidados',
      aspect: 'square',
      image: '/src/assets/images/galeria_detalhe_textura.jpg',
      imageAlt: 'Gotícula de creme hidratante suave em prato de cerâmica verde sálvia',
      caption: 'Texturas leves e fórmulas formuladas para o conforto imediato da pele.',
    },
    {
      enabled: true,
      id: 'galeria-consultorio',
      title: 'Canto de acolhimento',
      category: 'Consultório',
      aspect: 'landscape',
      image: '/src/assets/images/capitulo_acolhimento.jpg',
      imageAlt: 'Consultório calmo com linho natural e paleta neutra',
      caption: 'Mobiliário em tons crus e materiais táteis que desaceleram a respiração.',
    },
    {
      enabled: true,
      id: 'galeria-frascos',
      title: 'Simplicidade na bancada',
      category: 'Elementos',
      aspect: 'landscape',
      image: '/src/assets/images/capitulo_plano.jpg',
      imageAlt: 'Frascos de vidro e cerâmica sobre pedra clara',
      caption: 'Apenas os passos essenciais para a sua pele, sem acúmulo desnecessário.',
    },
    {
      enabled: true,
      id: 'galeria-natureza',
      title: 'Presença botânica',
      category: 'Atmosfera',
      aspect: 'portrait',
      image: '/src/assets/images/hero_mobile.jpg',
      imageAlt: 'Folhagens suaves e água fresca em bacia cerâmica',
      caption: 'O frescor da água e a serenidade da luz natural no dia da sua consulta.',
    },
    {
      enabled: true,
      id: 'galeria-harmonia',
      title: 'Equilíbrio da luz',
      category: 'Atmosfera',
      aspect: 'landscape',
      image: '/src/assets/images/hero_ambiente.jpg',
      imageAlt: 'Sala principal com ampla janela e sombra suave',
      caption: 'Luz matinal abundante que valoriza o silêncio e o bem-estar.',
    },
  ],

  visite: {
    enabled: true,
    kicker: 'Nosso Espaço',
    title: 'Visite a clínica',
    highlightedWord: 'Alba',
    description:
      'Um ponto de encontro silencioso na cidade, planejado para que você chegue com calma e seja recebido com cuidado.',
    address: '[endereço da clínica em bairro acessível e arborizado]',
    schedule: '[horário de atendimento: segunda a sexta, mediante agendamento]',
    contact: '[canal de contato e agendamento via mensagem]',
    note: 'Atendimento estritamente com agendamento prévio para garantir o tempo de cada pessoa.',
    primaryAction: {
      label: 'Solicitar horário',
      href: '#cta-final',
    },
  },

  depoimentos: {
    enabled: false,
    items: [],
  },

  faq: [
    {
      enabled: true,
      id: 'faq-primeira-consulta',
      question: 'Como funciona a primeira conversa no Alba?',
      answer:
        'A consulta inicial é mais longa e focada na escuta. Conversamos sobre seu histórico, hábitos, cosméticos que já utiliza e aquilo que incomoda a sua pele, sem pré-julgamentos ou soluções padronizadas.',
      category: 'Atendimento',
    },
    {
      enabled: true,
      id: 'faq-o-que-levar',
      question: 'Preciso levar os produtos que já uso em casa?',
      answer:
        'Sim, é muito útil. Você pode anotar ou trazer os frascos dos produtos que costuma usar no cotidiano (sabonetes, protetores, hidratantes). Isso nos ajuda a entender o que já faz parte do seu hábito.',
      category: 'Preparação',
    },
    {
      enabled: true,
      id: 'faq-acompanhamento',
      question: 'Com que frequência os retornos acontecem?',
      answer:
        'O intervalo é definido em conjunto, de acordo com o plano traçado e a resposta da sua pele. Algumas rotinas necessitam de reavaliação em semanas, enquanto outras são acompanhadas semestralmente.',
      category: 'Acompanhamento',
    },
    {
      enabled: true,
      id: 'faq-agendamento',
      question: 'Como são realizados os agendamentos?',
      answer:
        'Os horários são reservados com antecedência pelo nosso canal de atendimento [canal de contato], garantindo intervalos generosos entre as consultas para preservar o silêncio e a pontualidade.',
      category: 'Agendamento',
    },
    {
      enabled: true,
      id: 'faq-privacidade',
      question: 'Como são tratados meus dados e histórico?',
      answer:
        'Todo o histórico conversado e os registros de observação são confidenciais e mantidos em prontuário seguro, acessível apenas pela equipe diretamente envolvida no seu atendimento.',
      category: 'Privacidade',
    },
  ],

  ctaFinal: {
    enabled: true,
    kicker: 'Agendamento e Contato',
    title: {
      leadingText: 'Dê tempo e atenção à sua',
      highlightedWord: 'pele',
      trailingText: 'com serenidade.',
    },
    description:
      'Envie uma mensagem para verificar os horários disponíveis e tirar suas primeiras dúvidas com a nossa equipe.',
    primaryAction: {
      label: 'Conversar com a recepção',
      href: '#visite',
    },
    secondaryAction: {
      label: 'Ver perguntas frequentes',
      href: '#faq',
    },
    metadataNote: 'Respondemos em horário comercial em [canal de mensagens]',
  },

  rodape: {
    enabled: true,
    brandName: 'Alba',
    tagline: 'Clínica de Dermatologia e Cuidados com a Pele.',
    addressMarker: '[endereço da unidade · cidade e estado]',
    rights: 'Todos os direitos reservados. Projeto fictício para fins de demonstração.',
    reducedMotionAction: {
      enableLabel: 'Ativar animações completas',
      disableLabel: 'Reduzir animações',
    },
    links: [
      { label: 'Cuidado', href: '#capitulos' },
      { label: 'Serviços', href: '#servicos' },
      { label: 'Espaço', href: '#galeria' },
      { label: 'Visite', href: '#visite' },
      { label: 'Perguntas', href: '#faq' },
      { label: 'Kit de UI', href: '#laboratorio-ui' },
    ],
  },
};
