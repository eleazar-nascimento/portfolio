import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import {
  Boxes,
  Code2,
  Palette,
  Server,
  TestTube2,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import {
  about,
  certifications,
  education,
  experiences,
  languages,
  services,
  skillGroups,
  type SkillGroup,
  type Service,
} from '../data/profile'
import {
  ArrowRight,
  Gauge,
  GitBranch,
  LayoutDashboard,
  Plug,
} from 'lucide-react'
import { sectionIds } from '../data/profile'

export const metadata: Metadata = {
  title: 'About',
}

const skillIconMap: Record<SkillGroup['icon'], LucideIcon> = {
  Code2,
  Palette,
  Boxes,
  Server,
  TestTube2,
  Wrench,
}

const serviceIconMap: Record<Service['icon'], LucideIcon> = {
  LayoutDashboard,
  Boxes,
  GitBranch,
  Gauge,
  Plug,
  TestTube2,
}

export default function AboutPage() {
  return (
    <div className="w-full bg-white dark:bg-zinc-950">
      {/* Intro */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-8">
          <h1 className="font-bold text-3xl text-zinc-900 dark:text-white sm:text-4xl">
            {about.title}
          </h1>

          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            {/* Bio */}
            <div className="flex flex-col gap-5">
              {about.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
                >
                  {paragraph}
                </p>
              ))}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                {about.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="font-bold text-3xl text-zinc-900 dark:text-white">
                      {stat.value}
                    </span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Valores */}
              <ul className="flex flex-col gap-3 pt-4">
                {about.values.map((value) => (
                  <li key={value} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500">
                      <Check size={12} className="text-white" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Foto ou ilustração (opcional — usa a foto do perfil) */}
            <div className="hidden lg:flex items-start justify-center">
              <div className="w-full max-w-sm rounded-3xl bg-zinc-50 dark:bg-zinc-900 p-8">
                <div className="flex flex-col gap-3">
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
                    Idiomas
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {languages.map((lang) => (
                      <li key={lang.name} className="flex justify-between text-sm">
                        <span className="text-zinc-700 dark:text-zinc-300">
                          {lang.name}
                        </span>
                        <span className="text-zinc-400 dark:text-zinc-500">
                          {lang.level}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiência */}
      <section className="bg-zinc-50 dark:bg-zinc-900 px-6 py-20 sm:py-28">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-10">
          <h2 className="font-bold text-3xl text-zinc-900 dark:text-white">
            Experiência
          </h2>

          <div className="flex flex-col gap-8">
            {experiences.map((exp) => (
              <div
                key={`${exp.company}-${exp.start}`}
                className="flex flex-col gap-1.5 border-l-2 border-zinc-200 dark:border-zinc-700 pl-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                  <h3 className="font-semibold text-zinc-900 dark:text-white">
                    {exp.role}
                  </h3>
                  <span className="shrink-0 text-xs text-zinc-400 dark:text-zinc-500">
                    {exp.start} — {exp.end}
                    {exp.duration ? ` · ${exp.duration}` : ''}
                  </span>
                </div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {exp.company}
                  {exp.location ? ` · ${exp.location}` : ''}
                </p>
                <ul className="flex flex-col gap-1 pt-1">
                  {exp.highlights.map((h) => (
                    <li key={h} className="text-sm text-zinc-500 dark:text-zinc-400">
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-zinc-200 dark:bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-600 dark:text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Habilidades */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-10">
          <h2 className="font-bold text-3xl text-zinc-900 dark:text-white">
            Habilidades
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => {
              const Icon = skillIconMap[group.icon]

              return (
                <div
                  key={group.title}
                  className="flex flex-col gap-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 p-6"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className="text-green-500" />
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white">
                        {group.title}
                      </h3>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-white dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="bg-zinc-50 dark:bg-zinc-900 px-6 py-20 sm:py-28">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-10">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-3xl text-zinc-900 dark:text-white">
              Serviços
            </h2>
            <p className="text-base text-zinc-500 dark:text-zinc-400">
              Como posso ajudar no seu próximo projeto
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = serviceIconMap[service.icon]

              return (
                <div
                  key={service.title}
                  className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-zinc-800/50 p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
                    <Icon size={20} className="text-green-500" />
                  </span>
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {service.description}
                  </p>
                  <ul className="mt-auto flex flex-col gap-1.5 pt-2">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="text-xs text-zinc-400 dark:text-zinc-500"
                      >
                        — {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Formação e certificações */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto flex w-full max-w-[1100px] grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-2xl text-zinc-900 dark:text-white">
              Formação
            </h2>
            <div className="flex flex-col gap-4">
              {education.map((item) => (
                <div key={item.course} className="flex flex-col gap-0.5">
                  <span className="font-semibold text-sm text-zinc-900 dark:text-white">
                    {item.course}
                    {item.ongoing && (
                      <span className="ml-2 text-xs font-medium text-green-500">
                        em andamento
                      </span>
                    )}
                  </span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {item.institution} · {item.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-2xl text-zinc-900 dark:text-white">
              Certificações
            </h2>
            <ul className="flex flex-col gap-2">
              {certifications.map((cert) => (
                <li
                  key={cert}
                  className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
