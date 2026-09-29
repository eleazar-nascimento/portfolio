import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Link } from 'next-view-transitions'
import { Image } from '@nextui-org/react'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  Github,
  Minus,
  Wrench,
} from 'lucide-react'
import { projects } from '../../data/profile'

type CaseStudyPageProps = {
  params: { slug: string }
}

/** Só projetos com estudo de caso ganham página própria */
const caseStudyProjects = projects.filter((project) => project.caseStudy)

export function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }))
}

export function generateMetadata({ params }: CaseStudyPageProps): Metadata {
  const project = caseStudyProjects.find((item) => item.slug === params.slug)

  if (!project?.caseStudy) return {}

  return {
    title: project.caseStudy.title,
    description: project.caseStudy.subtitle,
    openGraph: {
      title: project.caseStudy.title,
      description: project.caseStudy.subtitle,
      images: [{ url: project.image }],
    },
  }
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const project = caseStudyProjects.find((item) => item.slug === params.slug)

  if (!project?.caseStudy) notFound()

  const study = project.caseStudy
  const currentIndex = caseStudyProjects.findIndex(
    (item) => item.slug === project.slug,
  )
  const nextProject =
    caseStudyProjects.length > 1
      ? caseStudyProjects[(currentIndex + 1) % caseStudyProjects.length]
      : undefined

  return (
    <article className="w-full bg-white dark:bg-zinc-950">
      {/* Topo: título, ficha técnica e links */}
      <header className="px-6 pb-14 pt-14 sm:pt-20">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-8">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Voltar para os projetos
          </Link>

          <div className="flex flex-col gap-4">
            <span className="font-bold text-xs tracking-[0.2em] text-green-500">
              {study.eyebrow}
            </span>
            <h1 className="max-w-3xl font-bold text-[2.25rem] leading-tight text-zinc-900 dark:text-white sm:text-5xl">
              {study.title}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
              {study.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-2.5 text-zinc-900 transition-colors hover:bg-green-400"
              >
                Ver aplicação
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-5 py-2.5 text-zinc-700 transition-colors hover:border-zinc-400 dark:border-white/15 dark:text-zinc-200 dark:hover:border-white/40"
              >
                Código no GitHub
                <Github size={15} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Print da aplicação */}
      <div className="px-6">
        <div className="mx-auto w-full max-w-[1100px] overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900">
          <Image
            alt={`Interface do projeto ${project.name}`}
            className="h-auto w-full object-cover"
            src={project.image}
            radius="none"
            width="100%"
            removeWrapper
          />
        </div>
      </div>

      {/* Ficha técnica */}
      <section className="px-6 py-14 sm:py-20">
        <div className="mx-auto w-full max-w-[1100px]">
          <dl className="grid gap-8 border-t border-zinc-100 pt-10 dark:border-white/5 sm:grid-cols-2 lg:grid-cols-4">
            {study.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-2">
                <dt className="text-xs font-bold uppercase tracking-wider text-green-500">
                  {fact.label}
                </dt>
                <dd className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Visão geral */}
      <section className="px-6 pb-16 sm:pb-20">
        <div className="mx-auto grid w-full max-w-[1100px] gap-8 lg:grid-cols-[240px_1fr]">
          <h2 className="font-bold text-2xl text-zinc-900 dark:text-white">
            Visão geral
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {study.intro}
          </p>
        </div>
      </section>

      {/* O problema */}
      <section className="bg-zinc-50 px-6 py-16 dark:bg-zinc-900 sm:py-20">
        <div className="mx-auto grid w-full max-w-[1100px] gap-8 lg:grid-cols-[240px_1fr]">
          <h2 className="font-bold text-2xl text-zinc-900 dark:text-white">
            {study.problem.title}
          </h2>

          <div className="flex max-w-2xl flex-col gap-6">
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {study.problem.description}
            </p>

            <ul className="flex flex-col gap-3">
              {study.problem.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/15"
                    aria-hidden="true"
                  >
                    <AlertTriangle size={11} className="text-amber-500" />
                  </span>
                  <span className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Decisões arquiteturais */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-2xl text-zinc-900 dark:text-white">
              Decisões arquiteturais
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Cada escolha com os dois lados da moeda
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {study.decisions.map((decision) => (
              <div
                key={decision.choice}
                className="flex flex-col gap-4 rounded-2xl border border-zinc-100 p-6 dark:border-white/5 dark:bg-zinc-900/50"
              >
                <h3 className="font-bold text-base leading-snug text-zinc-900 dark:text-white">
                  {decision.choice}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {decision.why}
                </p>

                <div className="mt-auto flex flex-col gap-3 pt-1">
                  <ul className="flex flex-col gap-2">
                    {decision.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2.5">
                        <Check
                          size={14}
                          strokeWidth={3}
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-green-500"
                        />
                        <span className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                          {pro}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <ul className="flex flex-col gap-2 border-t border-zinc-100 pt-3 dark:border-white/5">
                    {decision.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2.5">
                        <Minus
                          size={14}
                          strokeWidth={3}
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-zinc-400 dark:text-zinc-500"
                        />
                        <span className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                          {con}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Desafios técnicos */}
      <section className="bg-zinc-50 px-6 py-16 dark:bg-zinc-900 sm:py-20">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-8">
          <h2 className="font-bold text-2xl text-zinc-900 dark:text-white">
            Desafios técnicos enfrentados
          </h2>

          <div className="flex flex-col gap-4">
            {study.challenges.map((item, index) => (
              <div
                key={item.title}
                className="flex flex-col gap-4 rounded-2xl bg-white p-6 dark:bg-zinc-800/50 sm:flex-row sm:gap-6"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-500/10 font-bold text-sm text-green-600 dark:text-green-400"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>

                <div className="flex flex-col gap-3">
                  <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                      O desafio:{' '}
                    </span>
                    {item.challenge}
                  </p>

                  <p className="flex gap-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    <Wrench
                      size={15}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-green-500"
                    />
                    <span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                        A solução:{' '}
                      </span>
                      {item.solution}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Métricas */}
      {study.metrics && (
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-8">
            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-2xl text-zinc-900 dark:text-white">
                {study.metrics.title}
              </h2>
              {study.metrics.note && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {study.metrics.note}
                </p>
              )}
            </div>

            <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {study.metrics.items.map((metric) => (
                <div
                  key={metric.label}
                  className="flex flex-col gap-1 rounded-2xl border border-zinc-100 p-6 dark:border-white/5 dark:bg-zinc-900/50"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                    {metric.label}
                  </dt>
                  <dd className="font-bold text-3xl text-zinc-900 dark:text-white">
                    {metric.value}
                  </dd>
                  {metric.detail && (
                    <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {metric.detail}
                    </p>
                  )}
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Navegação de saída */}
      <footer className="border-t border-zinc-100 px-6 py-14 dark:border-white/5">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Todos os projetos
          </Link>

          {nextProject && (
            <Link
              href={`/work/${nextProject.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 transition-colors hover:text-green-500 dark:text-white"
            >
              Próximo estudo de caso: {nextProject.name}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          )}
        </div>
      </footer>
    </article>
  )
}
