'use client'

import { useMemo, useState } from 'react'
import { Button } from '@nextui-org/react'
import { Github } from 'lucide-react'
import { ProjectCard } from '../components/ProjectCard'
import { SectionTitle } from '../components/SectionTitle'
import { projects, sectionIds, socials } from '../data/profile'

const ALL = 'Todos'

export function ProjectSection() {
  const [activeFilter, setActiveFilter] = useState<string>(ALL)

  const filters = useMemo(() => {
    const techs = projects.flatMap((project) => project.tech)
    return [ALL, ...Array.from(new Set(techs)).sort()]
  }, [])

  const visibleProjects = useMemo(() => {
    if (activeFilter === ALL) return projects
    return projects.filter((project) => project.tech.includes(activeFilter))
  }, [activeFilter])

  /** Com poucos projetos o filtro só ocupa espaço */
  const showFilters = projects.length >= 3

  /** Evita card solto ocupando 1/3 da largura quando há poucos projetos */
  const gridColumns =
    visibleProjects.length === 1
      ? 'max-w-2xl'
      : visibleProjects.length === 2
        ? 'sm:grid-cols-2'
        : 'sm:grid-cols-2 lg:grid-cols-3'

  const github = socials.find((social) => social.icon === 'Github')

  return (
    <section
      id={sectionIds.projects}
      className="w-full scroll-mt-20 bg-zinc-950 dark:bg-zinc-950 px-6 py-20 sm:py-28"
    >
      <div className="mx-auto flex w-full max-w-[980px] flex-col gap-10">
        <SectionTitle
          eyebrow="PORTFÓLIO"
          title="Projetos"
          subtitle="Alguns dos produtos e experimentos que construí"
          inverted
          align="left"
        />

        {/* Filtro por tecnologia (só faz sentido com alguns projetos na lista) */}
        {showFilters && (
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filtrar projetos por tecnologia"
        >
          {filters.map((filter) => {
            const isActive = filter === activeFilter

            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-1.5 text-xs font-bold transition-colors ${
                  isActive
                    ? 'border-green-400 bg-green-400 text-zinc-900'
                    : 'border-white/15 text-gray-50/70 hover:border-green-400/60 hover:text-white'
                }`}
              >
                {filter}
              </button>
            )
          })}
        </div>
        )}

        <div className={`grid gap-6 ${gridColumns}`}>
          {visibleProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {visibleProjects.length === 0 && (
          <p className="text-sm font-semibold text-gray-50/50">
            Nenhum projeto com essa tecnologia por aqui ainda.
          </p>
        )}

        {github && (
          <div className="flex justify-center">
            <Button
              as="a"
              className="font-bold text-white border-white/30"
              endContent={<Github size={16} />}
              href={github.href}
              rel="noopener noreferrer"
              target="_blank"
              variant="bordered"
            >
              Ver todos no GitHub
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
