import type { Metadata } from 'next'
import {
  profile,
  experiences,
  education,
  certifications,
  skillGroups,
  socials,
} from '../data/profile'
import { PrintButton } from './PrintButton'

export const metadata: Metadata = {
  title: 'Resume',
}

export default function ResumePage() {
  // Pegar só as experiências de dev (excluir A Madeira que é pré-dev)
  const devExperiences = experiences.filter(
    (exp) => !exp.role.includes('Auxiliar de TI'),
  )

  const email = socials.find((s) => s.icon === 'Mail')?.display
  const linkedin = socials.find((s) => s.icon === 'Linkedin')?.display
  const github = socials.find((s) => s.icon === 'Github')?.display

  return (
    <div className="w-full bg-white dark:bg-zinc-950 print:bg-white print:dark:bg-white">
      {/* Container A4 centralizado */}
      <div className="mx-auto max-w-[850px] px-6 py-12 print:px-12 print:py-8 print:max-w-none">
        {/* Header */}
        <header className="flex flex-col gap-1 pb-8 border-b border-zinc-200 dark:border-zinc-800 print:border-zinc-300">
          <div className="flex items-baseline gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500 print:bg-green-600">
              <span className="font-bold text-sm text-white">E</span>
            </div>
            <h1 className="font-bold text-3xl text-green-500 print:text-green-600 tracking-tight">
              {profile.fullName.toUpperCase()}
            </h1>
          </div>
          <p className="pl-11 text-sm text-zinc-600 dark:text-zinc-400 print:text-zinc-600">
            Frontend Engineer · React · TypeScript · Clean Architecture
          </p>
          <div className="pl-11 flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs text-zinc-500 print:text-zinc-500">
            {email && <span>{email}</span>}
            {github && <span>{github}</span>}
            {linkedin && <span>{linkedin}</span>}
            <span>{profile.location}</span>
          </div>
        </header>

        {/* Body: 2 colunas */}
        <div className="grid grid-cols-1 gap-10 pt-8 sm:grid-cols-[1fr_1.6fr] print:grid-cols-[1fr_1.6fr]">
          {/* Coluna esquerda */}
          <div className="flex flex-col gap-8">
            {/* Education */}
            <section>
              <h2 className="font-bold text-xs uppercase tracking-[0.15em] text-green-500 print:text-green-600 pb-3">
                Formação
              </h2>
              <div className="flex flex-col gap-4">
                {education.map((item) => (
                  <div key={item.course} className="flex flex-col gap-0.5">
                    <span className="font-bold text-sm text-zinc-900 dark:text-white print:text-zinc-900">
                      {item.institution}
                    </span>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400 print:text-zinc-600">
                      {item.course}
                    </span>
                    <span className="text-xs text-zinc-400 print:text-zinc-400">
                      {item.period}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="font-bold text-xs uppercase tracking-[0.15em] text-green-500 print:text-green-600 pb-3">
                Skills
              </h2>
              <div className="flex flex-col gap-3">
                {skillGroups.map((group) => (
                  <div key={group.title} className="flex flex-col gap-1">
                    <span className="font-bold text-xs text-zinc-900 dark:text-white print:text-zinc-900">
                      {group.title}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 print:text-zinc-500 leading-relaxed">
                      {group.skills.join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Certificações */}
            <section>
              <h2 className="font-bold text-xs uppercase tracking-[0.15em] text-green-500 print:text-green-600 pb-3">
                Certificações
              </h2>
              <div className="flex flex-col gap-2">
                {certifications.map((cert) => (
                  <span
                    key={cert}
                    className="text-xs text-zinc-600 dark:text-zinc-400 print:text-zinc-600"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Coluna direita — Experiência */}
          <div className="flex flex-col gap-0">
            <h2 className="font-bold text-xs uppercase tracking-[0.15em] text-green-500 print:text-green-600 pb-3">
              Experiência
            </h2>
            <div className="flex flex-col gap-6">
              {devExperiences.map((exp) => (
                <div
                  key={`${exp.company}-${exp.start}`}
                  className="flex flex-col gap-1"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                    <h3 className="text-sm text-zinc-900 dark:text-white print:text-zinc-900">
                      <span className="font-bold">{exp.company}</span>
                      {' / '}
                      <span className="font-semibold">{exp.role}</span>
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400 print:text-zinc-400">
                    {exp.location || 'Brasil'}, {exp.start} - {exp.end}
                  </p>
                  <ul className="flex flex-col gap-1 pt-1">
                    {exp.highlights.map((h) => (
                      <li
                        key={h}
                        className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 print:text-zinc-600 pl-3 relative before:absolute before:left-0 before:top-[0.45em] before:h-1 before:w-1 before:rounded-full before:bg-zinc-400 print:before:bg-zinc-400"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Print helper */}
        <div className="mt-12 flex justify-center print:hidden">
          <PrintButton />
        </div>
      </div>
    </div>
  )
}
