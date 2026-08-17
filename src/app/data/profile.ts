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
  resume: '/curriculo-eleazar-nascimento.pdf',
  headline:
    'Construo interfaces escaláveis e de alta performance no ecossistema React.',
  summary:
    'Desenvolvedor Front-end com mais de 6 anos de experiência (desde 2020) na criação de interfaces escaláveis e de alta performance. Especialista no ecossistema React, com sólido domínio de Clean Architecture e foco constante em entregar código sustentável e orientado a resultados de negócio.',
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
    start: 'out 2025',
    end: 'jul 2026',
    duration: '10 meses',
    location: 'Vila Velha, ES',
    highlights: [
      'Desenvolvimento de sistemas de gestão financeira em React, Next.js e TypeScript.',
      'Migração de sistemas legados para novos projetos, sem interromper a operação.',
      'Aplicação de Clean Architecture, S.O.L.I.D e Design Patterns na base de código.',
      'Cobertura de regras críticas com testes unitários.',
    ],
    stack: [
      'React',
      'Next.js',
      'TypeScript',
      'Clean Architecture',
      'S.O.L.I.D',
      'Testes unitários',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'UseRH',
    start: 'jan 2023',
    end: 'set 2025',
    duration: '2 anos 9 meses',
    highlights: [
      'Construção de painel administrativo para RH e de uma rede social corporativa.',
      'Desenvolvimento de projetos de auditoria de folha de pagamento.',
      'Refatoração da estrutura de organização do código em diversos projetos internos, seguindo os princípios de refatoração de Martin Fowler.',
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
    start: 'fev 2023',
    end: 'mai 2023',
    duration: '4 meses',
    location: 'Espírito Santo, Brasil',
    highlights: [
      'Desenvolvimento de um painel intranet de ponta a ponta.',
      'Front-end em React com Vite e TypeScript; back-end em Node.js com Prisma e PostgreSQL.',
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
    start: 'jul 2022',
    end: 'out 2022',
    duration: '4 meses',
    highlights: [
      'Front-end de produtos em monorepo com NX, dentro de uma venture builder.',
      'Construção de design system com Radix UI e Stitches, reaproveitado entre aplicações.',
      'Arquitetura orientada a domínio (DDD) e Clean Architecture, com testes em Jest.',
    ],
    stack: [
      'React',
      'Next.js',
      'TypeScript',
      'NX',
      'Radix UI',
      'Stitches',
      'Redux',
      'React Hook Form',
      'Node.js',
      'Jest',
      'DDD',
    ],
  },
  {
    role: 'Desenvolvedor Web Front-end',
    company: '2Share Multipropriedades',
    start: 'out 2020',
    end: 'ago 2022',
    duration: '1 ano 11 meses',
    location: 'Brasil',
    highlights: [
      'Desenvolvimento das interfaces do produto de multipropriedade.',
      'Aplicação de Clean Architecture e DDD com React, Next.js e TypeScript.',
      'Testes automatizados com Jest e estilização com Styled Components.',
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
    start: 'jun 2020',
    end: 'out 2020',
    duration: '5 meses',
    location: 'Brasil',
    highlights: [
      'Front-end do projeto do ITCMD dentro do time de desenvolvimento da SEFAZ.',
      'Primeira experiência profissional em desenvolvimento, em ambiente de governo.',
    ],
    stack: ['PHP', 'Laravel', 'HTML5', 'CSS3', 'Bootstrap', 'jQuery'],
  },
  {
    role: 'Auxiliar de TI (antes: estagiário e menor aprendiz)',
    company: 'A Madeira Indústria e Comércio',
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

// TODO: substituir pelos seus projetos reais (é só trocar os dados abaixo).
export const projects: Project[] = [
  {
    slug: 'exemplo-gestao-financeira',
    name: 'Sistema de Gestão Financeira',
    tagline: 'Controle de operações de crédito ponta a ponta',
    description:
      'Exemplo de card. Substitua pelos dados do projeto: qual problema resolve, o que você construiu e qual foi o resultado.',
    image: '/images/image.png',
    tech: ['React', 'Next.js', 'TypeScript', 'Clean Architecture'],
    repo: 'https://github.com/eleazar-nascimento',
    featured: true,
    year: '2026',
  },
  {
    slug: 'exemplo-painel-rh',
    name: 'Painel Administrativo de RH',
    tagline: 'Gestão de pessoas e auditoria de folha de pagamento',
    description:
      'Exemplo de card. Substitua pelos dados do projeto: qual problema resolve, o que você construiu e qual foi o resultado.',
    image: '/images/image.png',
    tech: ['React', 'TypeScript', 'React Hooks'],
    repo: 'https://github.com/eleazar-nascimento',
    year: '2025',
  },
  {
    slug: 'exemplo-design-system',
    name: 'Design System em Monorepo',
    tagline: 'Componentes compartilhados entre múltiplos produtos',
    description:
      'Exemplo de card. Substitua pelos dados do projeto: qual problema resolve, o que você construiu e qual foi o resultado.',
    image: '/images/image.png',
    tech: ['React', 'NX', 'Radix UI', 'Stitches'],
    repo: 'https://github.com/eleazar-nascimento',
    year: '2022',
  },
  {
    slug: 'exemplo-intranet',
    name: 'Painel Intranet Full Stack',
    tagline: 'Front-end e back-end na mesma entrega',
    description:
      'Exemplo de card. Substitua pelos dados do projeto: qual problema resolve, o que você construiu e qual foi o resultado.',
    image: '/images/image.png',
    tech: ['React', 'Vite', 'Node.js', 'Prisma', 'PostgreSQL'],
    repo: 'https://github.com/eleazar-nascimento',
    year: '2023',
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
