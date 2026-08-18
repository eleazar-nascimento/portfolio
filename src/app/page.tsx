import { Image } from '@nextui-org/react'
import { Lock } from 'lucide-react'
import { profile, projects, socials, type Project } from './data/profile'

function ProjectCard({ project }: { project: Project }) {
  const href = project.demo || project.repo || '#'
  const isLocked = !project.demo && !project.repo

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-4"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800/60">
        <Image
          alt={`Captura de tela do projeto ${project.name}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={project.image}
          radius="none"
          width="100%"
          removeWrapper
        />
        {isLocked && (
          <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900/80">
            <Lock size={14} className="text-white" />
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-xl text-zinc-900 dark:text-white group-hover:text-green-500 transition-colors">
          {project.name}
        </h3>
        <p className="text-sm font-semibold text-zinc-400 dark:text-zinc-500">
          {project.tech.slice(0, 3).join(' · ')}
          {project.year ? ` · ${project.year}` : ''}
        </p>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {project.tagline}
        </p>
      </div>
    </a>
  )
}

export default function WorkPage() {
  const github = socials.find((s) => s.icon === 'Github')
  const linkedin = socials.find((s) => s.icon === 'Linkedin')

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="w-full bg-white dark:bg-zinc-950 px-6 py-20 sm:py-32">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col-reverse items-center gap-12 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-5 max-w-xl">
            <h1 className="font-bold text-[2.5rem] leading-tight text-zinc-900 dark:text-white sm:text-[3.2rem]">
              Olá, sou Eleazar, um{' '}
              <span className="text-green-500">desenvolvedor front-end</span>
              {' '}focado em interfaces que escalam.
            </h1>

            <div className="flex flex-col gap-1.5 text-base text-zinc-500 dark:text-zinc-400">
              <p>
                Frontend Engineer na{' '}
                <span className="font-semibold text-zinc-900 dark:text-white">Hub Crédito</span>
                {' '}ex-{' '}
                <span className="font-semibold text-zinc-900 dark:text-white">UseRH</span>
                {' '}e{' '}
                <span className="font-semibold text-zinc-900 dark:text-white">Growth Venture</span>
              </p>
              <p>Clean Architecture, S.O.L.I.D e React desde 2020</p>
              <p>
                Pós-graduando em{' '}
                <span className="font-semibold text-zinc-900 dark:text-white">Engenharia de IA Aplicada</span>
              </p>
            </div>

            <div className="flex gap-5 pt-2 text-sm font-semibold">
              {linkedin && (
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {github && (
                <a
                  href={github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>

          <div className="shrink-0">
            <Image
              alt={`Foto de ${profile.name}`}
              className="rounded-3xl object-cover"
              height={340}
              src={profile.photo}
              width={340}
              isBlurred
            />
          </div>
        </div>
      </section>

      {/* Projetos - Grid 2 colunas */}
      <section className="w-full bg-white dark:bg-zinc-950 px-6 pb-20 sm:pb-28">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-12">
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>

          {github && (
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Ver todos no GitHub →
            </a>
          )}
        </div>
      </section>
    </div>
  )
}
