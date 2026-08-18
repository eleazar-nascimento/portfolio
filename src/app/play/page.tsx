import type { Metadata } from 'next'
import { Image } from '@nextui-org/react'
import { projects, type Project } from '../data/profile'

export const metadata: Metadata = {
  title: 'Play',
}

/**
 * "Play" mostra os mesmos projetos em um grid de 3 colunas, mais visual
 * (imagens maiores, menos texto). Quando você tiver projetos pessoais,
 * side projects ou experimentos, separe-os do array principal
 * criando um `playProjects` em profile.ts.
 */

function PlayCard({ project }: { project: Project }) {
  const href = project.demo || project.repo || '#'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800/60">
        <Image
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={project.image}
          radius="none"
          width="100%"
          removeWrapper
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <h3 className="font-bold text-base text-zinc-900 dark:text-white group-hover:text-green-500 transition-colors">
          {project.name}
        </h3>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          {project.tech.slice(0, 3).join(', ')}
        </p>
      </div>
    </a>
  )
}

export default function PlayPage() {
  return (
    <div className="w-full bg-white dark:bg-zinc-950 px-6 py-20 sm:py-28">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-12">
        {/* Intro */}
        <div className="flex flex-col gap-3 max-w-2xl">
          <h1 className="font-bold text-3xl text-zinc-900 dark:text-white sm:text-4xl">
            Play
          </h1>
          <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            Projetos pessoais, experimentos e side projects. Construções onde
            testo ideias novas, exploro tecnologias diferentes e me divirto
            codando sem compromisso de prazo.
          </p>
        </div>

        {/* Grid 3 colunas */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <PlayCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}
