export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  highlights: string[];
};

export type EducationItem = {
  degree: string;
  institution: string;
  status: string;
};

export type ProfileData = {
  name: string;
  pronouns: string;
  title: string;
  headline: string;
  location: string;
  phone: string;
  email: string;
  bio: string;
  status: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
  };
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: {
    category: string;
    items: string[];
  }[];
  languages: {
    language: string;
    level: string;
  }[];
};

export const PROFILE: ProfileData = {
  name: 'Gabriel Vinicius dos Santos',
  pronouns: 'ele/dele',
  title: 'Analista de Suporte Técnico & Desenvolvedor de Software',
  headline: 'Perfil híbrido entre Suporte/Infraestrutura (Linux, Redes, Automação) e Desenvolvimento Web/Mobile (TypeScript, React, Python, SQL)',
  location: 'Toledo, PR — Brasil',
  phone: '(45) 98008-2147',
  email: 'gabriel.v.santos23@gmail.com',
  bio: 'Profissional de Tecnologia da Informação com experiência prática em suporte técnico corporativo, infraestrutura e atendimento a usuários. Atua na investigação e resolução de incidentes envolvendo redes TCP/IP, servidores Linux e Windows, Samba, permissões e rotinas de backup. Desenvolve scripts Bash para automação administrativa e mantém estudos e projetos próprios em Python, JavaScript, TypeScript, React e React Native, conectando infraestrutura ao desenvolvimento de software.',
  status: 'Atuando na German Tech Sistemas & Aberto a conexões profissionais',
  links: {
    github: 'https://github.com/gabriellsdev',
    linkedin: 'https://www.linkedin.com/in/gabrielvindev',
    email: 'mailto:gabriel.v.santos23@gmail.com',
  },
  education: [
    {
      degree: 'Sistemas para Internet',
      institution: 'UTFPR — Universidade Tecnológica Federal do Paraná',
      status: 'Previsão de conclusão: Março / 2029',
    },
    {
      degree: 'Técnico em Desenvolvimento de Sistemas',
      institution: 'PREMEN',
      status: 'Concluído',
    },
  ],
  experience: [
    {
      company: 'German Tech Sistemas',
      role: 'Analista de Suporte Técnico',
      period: 'Jan/2026 – Atual',
      highlights: [
        'Suporte a colaboradores e manutenção da infraestrutura tecnológica: hardware, software, redes, servidores Linux e sistemas ERP.',
        'Diagnóstico e resolução de incidentes presenciais e remotos em computadores, sistemas, aplicativos e periféricos.',
        'Administração de servidores Linux, suporte a ERP e resolução de incidentes com impacto em processos operacionais e fiscais.',
        'Investigação e reprodução de bugs, identificação de causa-raiz e integração com as equipes de engenharia.',
        'Aplicação de Node.js, Python, React, TypeScript e SQL para conectar infraestrutura a soluções de software.',
      ],
    },
    {
      company: 'German Tech Sistemas',
      role: 'Estagiário de Suporte Técnico',
      period: 'Abr/2025 – Dez/2025',
      highlights: [
        'Atendimento e suporte técnico a usuários internos e manutenção de sistemas operacionais.',
        'Apoio na configuração de redes corporativas, equipamentos e hardware.',
        'Participação ativa no fluxo de tickets e rotinas de atendimento de chamados.',
      ],
    },
    {
      company: 'Gruber Contabilidade',
      role: 'Estagiário Administrativo/Fiscal',
      period: 'Jun/2024 – Mar/2025',
      highlights: [
        'Organização, classificação e controle de documentos fiscais, contábeis e trabalhistas.',
        'Conferência documental, rastreabilidade de arquivos e dupla checagem de integridade.',
        'Contato direto com fluxos fiscais (NF-e, ADN), processos empresariais e rotinas contábeis.',
      ],
    },
  ],
  skills: [
    {
      category: 'Desenvolvimento & Engenharia',
      items: [
        'TypeScript',
        'JavaScript',
        'Python',
        'React',
        'React Native',
        'Expo',
        'Node.js',
        'Supabase / PostgreSQL',
        'SQL',
        'APIs REST / WebSockets',
        'Git & GitHub',
      ],
    },
    {
      category: 'Infraestrutura & Suporte',
      items: [
        'Servidores Linux',
        'Windows Server',
        'Redes TCP/IP & IPv4',
        'Servidores Samba & Compartilhamentos',
        'Scripts Bash & Automação',
        'Rotinas de Backup',
        'Troubleshooting de Hardware e Periféricos',
        'Sistemas ERP',
      ],
    },
    {
      category: 'Conhecimentos Complementares',
      items: [
        'Documentos Fiscais Eletrônicos (NF-e)',
        'Segurança & SMTP/TLS',
        'Acessibilidade WCAG 2.2',
        'Canvas 2D API',
        'Design Responsivo & Figma',
      ],
    },
  ],
  languages: [
    { language: 'Português', level: 'Nativo' },
    { language: 'Inglês', level: 'Avançado' },
  ],
};
