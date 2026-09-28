/**
 * FONTE ÚNICA DE CONTEÚDO DO PORTFÓLIO
 *
 * Todo o texto do site sai daqui. Para atualizar o portfólio você só mexe
 * neste arquivo, sem tocar em componente nenhum.
 *
 * Conteúdo extraído do currículo em /public/curriculo-eleazar-nascimento.pdf
 * (exportação do LinkedIn). Os itens marcados com `// TODO:` são os que ainda
 * dependem de informação sua.
 */

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export type Social = {
  label: string
  /** Texto exibido na tela (sem https:// para ficar mais limpo) */
  display: string
  href: string
  /** Nome do ícone lucide-react usado no mapa de ícones da UI */
  icon: 'Github' | 'Mail' | 'Linkedin' | 'PhoneCall' | 'MapPin'
}

export type Experience = {
  role: string
  company: string
  /** O que a empresa faz / contexto da atuação */
  companyDescription?: string
  /** Ex.: "out 2025" */
  start: string
  /** Ex.: "atual" */
  end: string
  /** Duração como aparece no LinkedIn, ex.: "10 meses" */
  duration?: string
  location?: string
  /** 2 a 4 bullets focados em resultado, não em tarefa */
  highlights: string[]
  stack: string[]
}

export type SkillGroup = {
  title: string
  description: string
  icon: 'Code2' | 'Palette' | 'Boxes' | 'Server' | 'TestTube2' | 'Wrench'
  skills: string[]
}

export type Service = {
  title: string
  description: string
  icon:
    | 'LayoutDashboard'
    | 'Boxes'
    | 'GitBranch'
    | 'Gauge'
    | 'Plug'
    | 'TestTube2'
  /** O que o cliente recebe na prática */
  deliverables: string[]
}

export type Project = {
  slug: string
  name: string
  /** Uma linha: qual problema resolve */
  tagline: string
  description: string
  image: string
  /** Usadas também como filtro na seção de projetos */
  tech: string[]
  repo?: string
  demo?: string
  /** Destaca o projeto em card maior */
  featured?: boolean
  year?: string
}

export type Education = {
  course: string
  institution: string
  period: string
  /** Curso em andamento */
  ongoing?: boolean
}

// ---------------------------------------------------------------------------
// Perfil
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Eleazar Nascimento',
  fullName: 'Eleazar da Silva Nascimento',
  role: 'Desenvolvedor de Software Front-end',
  seniority: 'React · Next.js · TypeScript · Clean Architecture',
  location: 'Cariacica, ES · Brasil',
  availability: 'Aberto a novas oportunidades',
  photo: '/images/image.png',
  resume: '/cv-eleazar-da-silva-nascimento-2.pdf',
  headline:
    'Construo interfaces escaláveis e de alta performance no ecossistema React.',
  summary:
    'Desenvolvedor Front-end com mais de 6 anos de experiência em React, TypeScript, Next.js e JavaScript, especializado na construção de interfaces escaláveis e de alta performance. Aplico Clean Architecture para desenvolver soluções sustentáveis e manuteníveis, conectando qualidade técnica às necessidades e aos resultados do negócio.',
}

// ---------------------------------------------------------------------------
// Sobre
// ---------------------------------------------------------------------------

export const about = {
  title: 'Sobre mim',
  subtitle: 'Minha trajetória, do suporte de TI à engenharia de front-end',
  /** Cada item é um parágrafo */
  paragraphs: [
    'Minha história com tecnologia começou de baixo: entrei como menor aprendiz e depois auxiliar de TI numa indústria, resolvendo problemas de infraestrutura e suporte. Foi ali que descobri que queria construir software, não só mantê-lo funcionando.',
    'Desde 2020 atuo como desenvolvedor front-end, passando por governo (SEFAZ-ES), venture builder, produtos de RH e, mais recentemente, sistemas de gestão financeira. Nesse caminho me especializei no ecossistema React e em Clean Architecture, S.O.L.I.D e Design Patterns aplicados ao front-end.',
    'O que me move é código que continua fácil de mudar depois de um ano. Boa parte do meu trabalho envolveu justamente isso: refatorar estruturas existentes, migrar sistemas legados para novas bases e criar design systems que evitam retrabalho entre telas.',
    'Hoje sigo estudando arquitetura e inteligência artificial aplicada — comecei uma pós-graduação em Engenharia de IA Aplicada para levar isso para dentro dos produtos que construo.',
  ],
  /** Números que aparecem em destaque */
  stats: [
    { value: '6', label: 'anos em desenvolvimento front-end' },
    { value: '2020', label: 'construindo com React desde' },
    { value: '6', label: 'empresas e produtos no currículo' },
  ],
  /** Como você trabalha — vira uma lista de checks */
  values: [
    'Clean Architecture, S.O.L.I.D e Design Patterns aplicados no front-end',
    'Refatoração contínua guiada pelos princípios de Martin Fowler',
    'Componentes reutilizáveis e design system em vez de tela por tela',
    'Testes unitários com Jest para mudar o código sem medo',
    'Decisões técnicas conectadas ao resultado de negócio',
  ],
}

// ---------------------------------------------------------------------------
// Experiência profissional (timeline da seção Sobre)
// ---------------------------------------------------------------------------

export const experiences: Experience[] = [
  {
    role: 'Frontend Engineer',
    company: 'Hub Crédito',
    companyDescription:
      'Empresa do setor financeiro, com atuação em sistemas de gestão financeira, motores de crédito e soluções comerciais.',
    start: 'out 2025',
    end: 'jul 2026',
    duration: '10 meses',
    location: 'Vila Velha, ES',
    highlights: [
      'Desenvolvo e modernizo sistemas de gestão financeira com React, Next.js e TypeScript, conduzindo a migração de aplicações legadas para novas soluções.',
      'Estruturo aplicações com Clean Architecture, princípios SOLID e Design Patterns, melhorando a separação de responsabilidades e a manutenibilidade do código.',
      'Desenvolvo painéis para o motor de crédito, organizando informações operacionais para facilitar o acompanhamento das atividades financeiras.',
      'Refatoro o painel de vendas, reorganizando a base de código e tornando a evolução de novas funcionalidades mais eficiente.',
      'Implemento testes unitários para aumentar a confiabilidade das alterações e reduzir riscos de regressão.',
    ],
    stack: [
      'React',
      'Next.js',
      'TypeScript',
      'Clean Architecture',
      'SOLID',
      'Testes unitários',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'UseRH',
    companyDescription:
      'Produtos digitais para Recursos Humanos: painel administrativo, rede social profissional e soluções de auditoria de folha de pagamento.',
    start: 'jan 2023',
    end: 'set 2025',
    duration: '2 anos 9 meses',
    highlights: [
      'Desenvolvi funcionalidades para um painel administrativo de RH com React, TypeScript, React Hooks, Next.js e CSS, apoiando a digitalização dos processos de gestão de pessoas.',
      'Contribuí para a construção de uma rede social voltada ao setor de RH, criando novas experiências para os usuários da plataforma.',
      'Desenvolvi funcionalidades para projetos de auditoria de folha de pagamento, apoiando a análise e a conferência de informações salariais.',
      'Refatorei diversos projetos internos aplicando os princípios de refatoração de Martin Fowler, tornando o código mais legível, limpo e sustentável.',
    ],
    stack: [
      'React',
      'Next.js',
      'TypeScript',
      'React Hooks',
      'CSS',
      'Refatoração',
    ],
  },
  {
    role: 'Fullstack Developer',
    company: 'Mesh Automação e Sistemas',
    companyDescription:
      'Empresa de automação e sistemas. Desenvolvi uma solução fullstack para gestão de recursos de irrigação conectados a Arduinos.',
    start: 'fev 2023',
    end: 'mai 2023',
    duration: '4 meses',
    location: 'Espírito Santo, Brasil',
    highlights: [
      'Desenvolvi de ponta a ponta um painel intranet para gestão de recursos de irrigação conectados a Arduinos, centralizando as informações operacionais em uma única interface.',
      'Implementei o frontend com React, Vite, TypeScript e Bootstrap.',
      'Desenvolvi o backend com Node.js, TypeScript, PostgreSQL e Prisma.js, organizando a persistência e o acesso aos dados.',
      'Integrei interface, serviços e banco de dados em uma solução fullstack coesa.',
    ],
    stack: [
      'React',
      'Vite',
      'TypeScript',
      'Node.js',
      'Prisma',
      'PostgreSQL',
      'Bootstrap',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Growth Venture',
    companyDescription:
      'Produtos digitais para vendas, multipropriedades, geração de leads, e-commerce e modelos de assinatura.',
    start: 'jul 2022',
    end: 'out 2022',
    duration: '4 meses',
    highlights: [
      'Implementei um dashboard de funil de vendas, ampliando a visibilidade sobre as etapas do processo comercial.',
      'Refatorei o projeto de multipropriedades com Clean Architecture, Domain-Driven Design e separação de responsabilidades.',
      'Desenvolvi landing pages orientadas à captação de leads e conversão.',
      'Desenvolvi um e-commerce de cosméticos e projetos de assinatura de planos odontológicos e chips internacionais.',
    ],
    stack: [
      'React',
      'Next.js',
      'TypeScript',
      'Clean Architecture',
      'DDD',
      'Landing pages',
    ],
  },
  {
    role: 'Desenvolvedor Web Front-end',
    company: '2Share Multipropriedades',
    companyDescription:
      'Soluções digitais para gestão de multipropriedades e acompanhamento de funis de vendas.',
    start: 'out 2020',
    end: 'ago 2022',
    duration: '1 ano 11 meses',
    location: 'Brasil',
    highlights: [
      'Desenvolvi funcionalidades para sistemas de gestão de multipropriedades e funil de vendas com React, Next.js e TypeScript.',
      'Refatorei e reescrevi o painel de multipropriedades, ampliando a componentização e a manutenibilidade do código.',
      'Estruturei a aplicação frontend com Clean Architecture, DDD, React Hooks, Redux e Styled Components.',
      'Implementei testes automatizados com Jest, aumentando a segurança das alterações.',
    ],
    stack: [
      'React',
      'Next.js',
      'TypeScript',
      'Redux',
      'Styled Components',
      'Jest',
      'Clean Architecture',
    ],
  },
  {
    role: 'Desenvolvedor',
    company: 'Secretaria de Estado da Fazenda do Espírito Santo (SEFAZ-ES)',
    companyDescription:
      'Órgão público estadual. Atuei no desenvolvimento frontend do projeto de ITCMD, modernizando uma solução voltada aos processos tributários.',
    start: 'jun 2020',
    end: 'out 2020',
    duration: '5 meses',
    location: 'Brasil',
    highlights: [
      'Desenvolvi funcionalidades frontend para o projeto de ITCMD com PHP, Laravel, HTML5, CSS3, Bootstrap e jQuery.',
      'Refatorei o sistema para melhorar a performance e modernizar a experiência visual da aplicação.',
    ],
    stack: ['PHP', 'Laravel', 'HTML5', 'CSS3', 'Bootstrap', 'jQuery'],
  },
  {
    role: 'Auxiliar de TI (antes: estagiário e menor aprendiz)',
    company: 'A Madeira Indústria e Comércio',
    companyDescription:
      'Onde iniciei minha trajetória profissional, do programa de menor aprendiz até funções de TI.',
    start: 'fev 2014',
    end: 'jun 2020',
    duration: '6 anos',
    location: 'Serra, ES',
    highlights: [
      'Suporte, manutenção e infraestrutura de TI na indústria.',
      'Base sólida em resolução de problemas que carrego até hoje no desenvolvimento.',
    ],
    stack: ['Suporte técnico', 'Infraestrutura', 'Windows'],
  },
]

// ---------------------------------------------------------------------------
// Formação e certificações
// ---------------------------------------------------------------------------

export const education: Education[] = [
  {
    course: 'Pós-Graduação em Engenharia de IA Aplicada',
    institution: 'UNIPDS',
    period: 'mar 2026 - mar 2027',
    ongoing: true,
  },
  {
    course: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
    institution: 'FAESA',
    period: 'jun 2018 - jul 2021',
  },
  {
    course: 'Laravel Developer',
    institution: 'UpInside Treinamentos',
    period: '2020',
  },
]

export const certifications: string[] = [
  'Scrum Foundation Professional Certificate',
  'React + Redux Course',
  'Certificate of SQL Fundamentals Course',
  'HTML Fundamental Course',
  'NLW Unite - React.js',
]

export const languages = [
  { name: 'Português', level: 'Nativo' },
  { name: 'Inglês', level: 'Básico (leitura técnica)' },
]

// ---------------------------------------------------------------------------
// Habilidades
// ---------------------------------------------------------------------------

export const skillGroups: SkillGroup[] = [
  {
    title: 'Front-end',
    description: 'O núcleo do meu trabalho desde 2020',
    icon: 'Code2',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript (ES6+)',
      'React Hooks',
      'Redux',
      'React Hook Form',
    ],
  },
  {
    title: 'Interface & Design System',
    description: 'Componentes que escalam entre produtos',
    icon: 'Palette',
    skills: [
      'Design System',
      'Styled Components',
      'Stitches',
      'Radix UI',
      'Tailwind CSS',
      'Bootstrap',
      'HTML5 semântico',
      'CSS3',
    ],
  },
  {
    title: 'Arquitetura & Boas práticas',
    description: 'Código que continua fácil de mudar',
    icon: 'Boxes',
    skills: [
      'Clean Architecture',
      'S.O.L.I.D',
      'Design Patterns',
      'Domain Driven Design',
      'Monorepo (NX)',
      'Refatoração (Martin Fowler)',
    ],
  },
  {
    title: 'Back-end & Dados',
    description: 'Full stack quando o projeto pede',
    icon: 'Server',
    skills: [
      'Node.js',
      'APIs REST',
      'Prisma',
      'PostgreSQL',
      'SQL',
      'PHP / Laravel',
    ],
  },
  {
    title: 'Qualidade',
    description: 'Confiança para entregar sem medo',
    icon: 'TestTube2',
    skills: ['Jest', 'Testes unitários', 'Code review', 'ESLint', 'Prettier'],
  },
  {
    title: 'Processos & Ferramentas',
    description: 'Do commit ao deploy, em time',
    icon: 'Wrench',
    skills: ['Git / GitHub', 'Vite', 'Scrum', 'Metodologias ágeis', 'Figma'],
  },
]

// ---------------------------------------------------------------------------
// Serviços
// ---------------------------------------------------------------------------

export const services: Service[] = [
  {
    title: 'Interfaces em React & Next.js',
    description:
      'Telas e fluxos completos a partir do layout, com atenção a performance e usabilidade.',
    icon: 'LayoutDashboard',
    deliverables: [
      'Aplicação em React ou Next.js (SSR/SSG)',
      'Layout responsivo fiel ao Figma',
      'Deploy configurado e projeto no ar',
    ],
  },
  {
    title: 'Painéis e sistemas de gestão',
    description:
      'Dashboards administrativos com tabelas, filtros, permissões e formulários complexos.',
    icon: 'Gauge',
    deliverables: [
      'Autenticação e controle de acesso por perfil',
      'Tabelas com filtros, ordenação e exportação',
      'Formulários validados com React Hook Form',
    ],
  },
  {
    title: 'Design System e componentes',
    description:
      'Biblioteca de componentes reutilizáveis para parar de reconstruir a mesma tela.',
    icon: 'Boxes',
    deliverables: [
      'Componentes acessíveis com Radix UI ou NextUI',
      'Tokens de tema e documentação de uso',
      'Monorepo pronto para compartilhar entre apps',
    ],
  },
  {
    title: 'Refatoração e migração de legado',
    description:
      'Assumo projetos existentes para reorganizar o código e destravar novas entregas.',
    icon: 'GitBranch',
    deliverables: [
      'Diagnóstico técnico do que existe hoje',
      'Migração gradual para React/Next.js sem parar a operação',
      'Estrutura reorganizada com Clean Architecture',
    ],
  },
  {
    title: 'Integração com APIs',
    description:
      'Conexão do front-end com back-ends REST, serviços externos e Node.js quando necessário.',
    icon: 'Plug',
    deliverables: [
      'Camada de dados isolada e tipada com TypeScript',
      'Tratamento de erros, loading e cache',
      'Endpoints em Node.js quando o back-end não existe ainda',
    ],
  },
  {
    title: 'Testes e qualidade',
    description:
      'Cobertura de testes e padrões de código para o time entregar com segurança.',
    icon: 'TestTube2',
    deliverables: [
      'Testes unitários com Jest nas regras críticas',
      'ESLint e Prettier padronizando o time',
      'Code review e documentação das decisões',
    ],
  },
]

// ---------------------------------------------------------------------------
// Projetos
// ---------------------------------------------------------------------------

/**
 * Para adicionar um projeto novo, copie o bloco abaixo e troque os dados.
 * A lista de filtros da seção é gerada automaticamente a partir de `tech`.
 *
 * {
 *   slug: 'identificador-unico',
 *   name: 'Nome do Projeto',
 *   tagline: 'Uma linha: qual problema resolve',
 *   description: 'O que faz, como foi construído e o que tem de interessante.',
 *   image: '/images/nome-do-print.png',
 *   tech: ['React', 'TypeScript'],
 *   repo: 'https://github.com/...',
 *   demo: 'https://...',
 *   year: '2026',
 * }
 */
export const projects: Project[] = [
  {
    slug: 'quiz-estilo-de-apego',
    name: 'Quiz de Estilo de Apego',
    tagline: 'Questionário que revela como você se conecta nos relacionamentos',
    description:
      'Aplicação interativa que identifica o estilo de apego do usuário — seguro, ansioso, evitativo ou desorganizado — com base na Teoria do Apego de Bowlby e Ainsworth, entregando uma análise com pontos fortes e caminhos de crescimento. Interface em glassmorphism, suporte a português e inglês, e regras isoladas em hooks próprios (useQuizLogic, useQuizData e useLocalization) para manter as telas simples.',
    image: '/images/quiz-app.png',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'i18n'],
    repo: 'https://github.com/eleazar-nascimento/quiz-app',
    demo: 'https://quiz-app-chi-drab-27.vercel.app',
    featured: true,
    year: '2025',
  },
  {
    slug: 'moveit',
    name: 'move.it',
    tagline: 'Pomodoro gamificado para quem passa o dia no computador',
    description:
      'App de produtividade que une a técnica Pomodoro a um sistema de níveis: cada ciclo de 20 minutos termina em um desafio de alongamento ou descanso visual que rende XP e faz o usuário subir de level. Estado global com Context API, progresso salvo em cookies para não perder o avanço e notificação nativa do navegador com som ao fim do ciclo.',
    image: '/images/moveit.png',
    tech: ['React', 'Next.js', 'TypeScript', 'Context API', 'CSS Modules'],
    repo: 'https://github.com/eleazar-nascimento/moveit-next',
    demo: 'https://moveit-next-two-amber.vercel.app',
    year: '2021',
  },
]

// ---------------------------------------------------------------------------
// Contato
// ---------------------------------------------------------------------------

export const socials: Social[] = [
  {
    label: 'GitHub',
    display: 'github.com/eleazar-nascimento',
    href: 'https://github.com/eleazar-nascimento',
    icon: 'Github',
  },
  {
    label: 'LinkedIn',
    display: 'in/eleazar-da-silva-nascimento',
    href: 'https://www.linkedin.com/in/eleazar-da-silva-nascimento-ba033816b',
    icon: 'Linkedin',
  },
  {
    label: 'E-mail',
    display: 'eleazar.nascimento@gmail.com',
    href: 'mailto:eleazar.nascimento@gmail.com',
    icon: 'Mail',
  },
  {
    label: 'WhatsApp',
    display: '(27) 99733-9162',
    href: 'https://wa.me/5527997339162',
    icon: 'PhoneCall',
  },
]

/** Ids usados nas âncoras da navbar. Mantenha em sincronia com as seções. */
export const sectionIds = {
  hero: 'inicio',
  about: 'sobre',
  projects: 'projetos',
  services: 'servicos',
  skills: 'habilidades',
  contact: 'contato',
} as const

export const navLinks = [
  { label: 'SOBRE', href: `#${sectionIds.about}`, id: sectionIds.about },
  { label: 'PROJETOS', href: `#${sectionIds.projects}`, id: sectionIds.projects },
  { label: 'SERVIÇOS', href: `#${sectionIds.services}`, id: sectionIds.services },
  { label: 'HABILIDADES', href: `#${sectionIds.skills}`, id: sectionIds.skills },
  { label: 'CONTATO', href: `#${sectionIds.contact}`, id: sectionIds.contact },
]
