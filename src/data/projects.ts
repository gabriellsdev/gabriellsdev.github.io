export type ProjectAvailability = {
  sourceCode: 'public' | 'private' | 'not-published';
  localExecution: 'verified' | 'unverified' | 'not-applicable';
  publicDemo: 'available' | 'unavailable' | 'in-development';
};

export type ProjectMedia = {
  type: 'image' | 'video';
  src: string;
  alt: string;
  caption?: string;
  poster?: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  technologies: string[];
  architecture: string;
  features: string[];
  limitations: string[];
  workflowNotes?: string;
  links: {
    repository?: string;
    demo?: string;
    landingPage?: string;
    documentation?: string;
  };
  availability: ProjectAvailability;
  cover: ProjectMedia;
  media: ProjectMedia[];
  lastVerified: string;
  isPlaceholder?: boolean;
  visualTheme: {
    primaryColor: string;
    accentColor: string;
    badgeBg: string;
    badgeText: string;
    themeClass: string;
  };
};

export const PROJECTS: Project[] = [
  {
    slug: 'magi-system',
    title: 'MAGI-System (v4.6)',
    tagline: 'Supercomputador de deliberação tri-processadora com IA e consenso autônomo',
    summary:
      'Engine de deliberação tri-processador com arquitetura inspirada no supercomputador MAGI do anime Evangelion. Três personas autônomas de inteligência artificial (Melchior-1, Balthasar-2 e Casper-3) analisam problemas complexos, executam rodadas assíncronas de cross-critique com refutação cruzada e chegam a consensos auditáveis com exportação estruturada.',
    problem:
      'Modelos de linguagem individuais frequentemente sofrem de alucinações, inconsistências argumentativas e vieses cognitivos singulares quando submetidos a decisões de engenharia, dilemas técnicos ou análises sensíveis.',
    solution:
      'Implementação de uma bancada deliberativa com três nós avaliadores com personas e diretrizes divergentes (Cientista, Mãe e Mulher). O motor suporta estratégias de deliberação profunda com 7 requisições assíncronas concorrentes (análise individual + rodadas de refutação cruzada + síntese final), modo rápido, integração com Groq Cloud e Gemini Cloud, benchmarks comparativos e interface dupla (Command Center V4.6 e Anime MAGI 1:1 NERV CRT).',
    role:
      'Arquiteto e Desenvolvedor Full-Stack: modelagem das personas de IA, engenharia de prompts com esquemas de refutação, barramento de votação por maioria qualificada, implementação de interface HUD com scanlines e CRT em CSS3, suporte multilíngue (7 idiomas) e deploy na Vercel.',
    technologies: [
      'JavaScript / TypeScript',
      'Groq Cloud API (Llama 3 / Mixtral)',
      'Google Gemini API',
      'CSS3 Puro (HUD / Scanlines / CRT)',
      'Vercel Analytics & Speed Insights',
      'WebSockets / APIs Assíncronas',
      'Evangelion NERV Design System'
    ],
    architecture:
      'Arquitetura distribuída com barramento de deliberação assíncrono: a consulta do operador é despachada em paralelo aos 3 núcleos (Melchior, Balthasar e Casper). No modo Full Deliberation, cada núcleo analisa a proposta, recebe os pareceres dos demais para cross-critique, ajusta suas premissas e submete seu voto a um sintetizador que valida o consenso formal.',
    features: [
      'Interface dupla: Command Center moderno V4.6 e modo Anime MAGI 1:1 NERV com efeitos CRT e scanlines',
      'Estratégia de deliberação profunda: 7 requisições assíncronas com cross-critique entre agentes',
      'Conexão com motores reais na nuvem (Groq Cloud e Gemini) e modo de testes com fixtures',
      'Suporte multilíngue nativo para 7 idiomas (Inglês, Português, Espanhol, Francês, Alemão, Russo e Japonês)',
      'Ferramentas táticas: benchmark automatizado, exportação em diagrama ASCII e inspeção de JSON estruturado',
      'Persistência local e rotinas de backup e restauração'
    ],
    limitations: [
      'Latência associada à rodada completa de 7 requisições concorrentes de IA na nuvem (atenuada pela opção de modo rápido de 1 requisição)'
    ],
    workflowNotes:
      'Fluxo de desenvolvimento com dois repositórios: o repositório privado é utilizado como ambiente de staging, experimentação contínua, testes de integração e documentação aprofundada. Quando um marco estável é concluído, um release estruturado é comitado no repositório público no GitHub.',
    links: {
      demo: 'https://magi-six.vercel.app/',
      repository: 'https://github.com/gabriellsdev/MAGI-System.git'
    },
    availability: {
      sourceCode: 'public',
      localExecution: 'verified',
      publicDemo: 'available'
    },
    cover: {
      type: 'image',
      src: './projects/magi-system/cover.svg',
      alt: 'Interface do supercomputador MAGI V4.6 com núcleos Melchior, Balthasar e Casper em resolução de consenso'
    },
    media: [
      {
        type: 'image',
        src: './projects/magi-system/cover.svg',
        alt: 'Topologia hexagonal dos três nós deliberativos do sistema MAGI',
        caption: 'Consenso tri-processador com barramento de votação e modo Anime/Command Center'
      }
    ],
    lastVerified: '2026-10-14',
    isPlaceholder: false,
    visualTheme: {
      primaryColor: '#ef4444',
      accentColor: '#f59e0b',
      badgeBg: 'rgba(239, 68, 68, 0.15)',
      badgeText: '#f87171',
      themeClass: 'project-theme--magi'
    }
  },
  {
    slug: 'expense-tracker',
    title: 'ExpenseTracker (Credo)',
    tagline: 'Gestão financeira mobile com categorização, lembretes e persistência Supabase',
    summary:
      'Aplicativo mobile de finanças pessoais desenvolvido com React Native, Expo e Supabase. Permite registrar transações com rapidez, categorizar receitas e despesas, configurar lembretes e notificações, analisar o fluxo financeiro por períodos e manter sincronização segura na nuvem.',
    problem:
      'Dificuldade em controlar gastos do dia a dia e manter a disciplina financeira em dispositivos móveis devido à lentidão de planilhas manuais ou à sobrecarga de publicidade e lentidão dos aplicativos comerciais convencionais.',
    solution:
      'Solução mobile nativa, leve e intuitiva construída com React Native e Expo, utilizando Supabase para autenticação, banco de dados relacional PostgreSQL e persistência segura em tempo real.',
    role:
      'Desenvolvedor Mobile Full-Stack: concepção da interface, arquitetura de componentes React Native, tipagem TypeScript, configuração do Expo e integração com serviços de autenticação e banco de dados no Supabase.',
    technologies: [
      'React Native',
      'TypeScript',
      'Expo',
      'Supabase (PostgreSQL & Auth)',
      'Mobile Push Notifications',
      'Clean Mobile Architecture'
    ],
    architecture:
      'Arquitetura mobile orientada a componentes com gerenciamento de estado previsível. Integração direta com a API do Supabase para autenticação JWT e operações CRUD estruturadas no PostgreSQL, com regras de segurança no nível de linha (RLS).',
    features: [
      'Lançamento rápido e intuitivo de receitas e despesas',
      'Categorização personalizada e visualização de operações por período',
      'Sistema de lembretes e notificações para compromissos financeiros',
      'Autenticação de usuários e persistência criptografada na nuvem via Supabase',
      'Customização de configurações e preferências de uso'
    ],
    limitations: [
      'Aplicativo voltado para execução nativa em dispositivos móveis (Android/iOS via Expo); não requer deploy em navegador web'
    ],
    links: {
      repository: 'https://github.com/gabriellsdev/ExpenseTracker.git'
    },
    availability: {
      sourceCode: 'public',
      localExecution: 'verified',
      publicDemo: 'unavailable'
    },
    cover: {
      type: 'image',
      src: './projects/expense-tracker/cover.svg',
      alt: 'Interface mobile do aplicativo ExpenseTracker Credo com métricas de fluxo de caixa em tons violeta'
    },
    media: [
      {
        type: 'image',
        src: './projects/expense-tracker/cover.svg',
        alt: 'Visão geral do aplicativo mobile de gestão financeira',
        caption: 'Interface React Native com autenticação e persistência no Supabase'
      }
    ],
    lastVerified: '2026-10-14',
    isPlaceholder: false,
    visualTheme: {
      primaryColor: '#8b5cf6',
      accentColor: '#c084fc',
      badgeBg: 'rgba(139, 92, 246, 0.15)',
      badgeText: '#c084fc',
      themeClass: 'project-theme--fin'
    }
  },
  {
    slug: 'lumina',
    title: 'Lumina',
    tagline: 'Plataforma mobile para atendimento psicológico e gestão de pacientes',
    summary:
      'Projeto acadêmico e de ideação de startup desenvolvido no âmbito da PUCPR, focado na área de saúde mental. Plataforma mobile que conecta pacientes a psicólogos, integrando autenticação, controle de acesso baseado em papéis (RBAC), agenda de consultas, prontuários, chat em tempo real e suporte a chamadas de vídeo.',
    problem:
      'Gargalos na comunicação, fricção no agendamento e falta de plataformas seguras e acessíveis para atendimento psicológico remoto e gestão integrada de prontuários.',
    solution:
      'Aplicativo mobile completo em React Native e TypeScript, com suporte a perfis distintos de usuário (paciente e psicólogo), agendamento inteligente, mensageria instantânea e integração de backend no Supabase.',
    role:
      'Desenvolvedor Front-End Mobile: implementação de interfaces no React Native com Expo, modelagem de fluxos de agendamento e chat, e integração com autenticação e banco de dados Supabase.',
    technologies: [
      'React Native',
      'TypeScript',
      'Expo',
      'Supabase',
      'Controle de Acesso RBAC',
      'Chat em Tempo Real & Vídeo',
      'Figma'
    ],
    architecture:
      'Arquitetura mobile com autenticação e autorização por papéis no Supabase, gerenciamento de sessões com WebSockets para mensageria e interface modular desenvolvida em React Native com Expo.',
    features: [
      'Perfis diferenciados de usuário com controle de permissões (psicólogo e paciente)',
      'Sistema de agenda inteligente e gerenciamento de consultas',
      'Módulo de prontuário e acompanhamento do histórico do paciente',
      'Comunicação via chat em tempo real e suporte a teleconsultas em vídeo'
    ],
    limitations: [
      'Projeto desenvolvido em contexto acadêmico e de validação de startup na PUCPR com repositório privado'
    ],
    links: {
      repository: 'https://github.com/gabriellsdev'
    },
    availability: {
      sourceCode: 'private',
      localExecution: 'verified',
      publicDemo: 'unavailable'
    },
    cover: {
      type: 'image',
      src: './projects/lumina/cover.svg',
      alt: 'Interface mobile do Lumina Care com módulos de teleconsulta, agenda e prontuário em ciano e esmeralda'
    },
    media: [
      {
        type: 'image',
        src: './projects/lumina/cover.svg',
        alt: 'Painel do aplicativo mobile Lumina desenvolvido para a startup de saúde mental',
        caption: 'Plataforma mobile em React Native, Expo e Supabase'
      }
    ],
    lastVerified: '2026-10-14',
    isPlaceholder: false,
    visualTheme: {
      primaryColor: '#06b6d4',
      accentColor: '#2dd4bf',
      badgeBg: 'rgba(6, 182, 212, 0.15)',
      badgeText: '#22d3ee',
      themeClass: 'project-theme--lumina'
    }
  },
  {
    slug: 'jardim-web',
    title: 'Jardim Web',
    tagline: 'Demonstração de arquitetura puramente CSS inspirada no CSS Zen Garden',
    summary:
      'Projeto acadêmico de demonstração visual onde a mesma estrutura de marcação semântica HTML é estilizada unicamente por meio de CSS avançado, explorando o potencial expressivo e arquitetural das folhas de estilo.',
    problem:
      'Demonstrar que a separação estrita entre conteúdo semântico e camada de apresentação permite recriar identidades visuais completas sem alterar uma única linha do HTML estrutural.',
    solution:
      'Construção de uma folha de estilos limpa, responsiva e orgânica que reimagina o documento semântico sob uma perspectiva botânica e contemporânea, com tipografia refinada e diagramação fluida.',
    role:
      'Autor e Designer CSS: desenvolvimento integral da arquitetura CSS (`main.css`), composição tipográfica, paleta cromática e testes de renderização responsiva.',
    technologies: ['HTML4 Strict Semântico', 'CSS Puro', 'Design Responsivo', 'Web Standards'],
    architecture:
      'Zero dependências de build ou scripts de estilização: folhas de estilo em cascata puras, manipulação de seletores complexos e layout adaptativo preservando o DOM intacto.',
    features: [
      'Preservação rigorosa do HTML semântico original',
      'Identidade visual botânica e orgânica construída inteiramente com CSS',
      'Compatibilidade com navegadores modernos sem scripts de auxílio',
      'Publicação estática direta e leve hospedada no próprio GitHub Pages'
    ],
    limitations: [
      'Como demonstração acadêmica conceitual, o conteúdo textual reflete a proposta canônica do CSS Zen Garden em português'
    ],
    links: {
      demo: './jardim-web/',
      landingPage: './jardim-web/',
      repository: 'https://github.com/gabriellsdev/gabriellsdev.github.io/tree/main/jardim-web'
    },
    availability: {
      sourceCode: 'public',
      localExecution: 'verified',
      publicDemo: 'available'
    },
    cover: {
      type: 'image',
      src: './projects/jardim-web/cover.svg',
      alt: 'Capa do Jardim Web com folhagem estilizada em verde esmeralda e tipografia editorial'
    },
    media: [
      {
        type: 'image',
        src: './projects/jardim-web/cover.svg',
        alt: 'Composição visual do projeto Jardim Web com princípios do CSS Zen Garden',
        caption: 'Demonstração de estilização 100% em folhas de estilo puras'
      }
    ],
    lastVerified: '2026-10-14',
    isPlaceholder: false,
    visualTheme: {
      primaryColor: '#22c55e',
      accentColor: '#86efac',
      badgeBg: 'rgba(34, 197, 94, 0.15)',
      badgeText: '#4ade80',
      themeClass: 'project-theme--zen'
    }
  }
];
