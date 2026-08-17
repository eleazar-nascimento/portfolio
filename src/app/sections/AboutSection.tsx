import { Award, Check, GraduationCap, Languages, MapPin } from 'lucide-react'
import { SectionTitle } from '../components/SectionTitle'
import {
  about,
  certifications,
  education,
  experiences,
  languages,
  profile,
  sectionIds,
} from '../data/profile'

export function AboutSection() {
  return (
    <section
      id={sectionIds.about}
      className="w-full scroll-mt-20 bg-zinc-50 px-6 py-20 sm:py-28"
    >
      <div className="mx-auto flex w-full max-w-[980px] flex-col gap-12">
        <SectionTitle
          eyebrow="QUEM SOU"
          title={about.title}
          subtitle={about.subtitle}
          align="left"
        />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Bio + valores */}
          <div className="flex flex-col gap-6">
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-sm leading-relaxed text-zinc-700 sm:text-base"
              >
                {paragraph}
              </p>
            ))}

            <ul className="flex flex-col gap-3">
              {about.values.map((value) => (
                <li key={value} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-400">
                    <Check size={13} className="text-zinc-900" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-semibold text-zinc-800">
                    {value}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-500">
              <MapPin size={16} className="text-green-500" />
              {profile.location}
            </div>

            <dl className="grid grid-cols-3 gap-4 rounded-2xl border border-zinc-200 bg-white p-5">
              {about.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <dt className="font-extrabold text-2xl text-zinc-900 sm:text-3xl">
                    {stat.value}
                  </dt>
                  <dd className="text-xs font-semibold leading-tight text-zinc-500">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Timeline de experiência */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-lg text-zinc-900">Experiência</h3>

            <ol className="relative flex flex-col gap-8 border-l border-zinc-200 pl-6">
              {experiences.map((experience) => (
                <li
                  key={`${experience.company}-${experience.start}`}
                  className="relative flex flex-col gap-2"
                >
                  <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-green-400" />

                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    {experience.start} — {experience.end}
                    {experience.duration ? ` · ${experience.duration}` : ''}
                    {experience.location ? ` · ${experience.location}` : ''}
                  </span>

                  <h4 className="font-bold text-base text-zinc-900">
                    {experience.role}
                    <span className="font-semibold text-zinc-500">
                      {' '}
                      · {experience.company}
                    </span>
                  </h4>

                  <ul className="flex flex-col gap-1.5">
                    {experience.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-2 text-sm leading-relaxed text-zinc-600"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {experience.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Formação, certificações e idiomas */}
        <div className="grid gap-6 border-t border-zinc-200 pt-10 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <h3 className="flex items-center gap-2 font-bold text-lg text-zinc-900">
              <GraduationCap size={18} className="text-green-500" />
              Formação
            </h3>
            <ul className="flex flex-col gap-4">
              {education.map((item) => (
                <li key={item.course} className="flex flex-col gap-0.5">
                  <span className="font-bold text-sm text-zinc-900">
                    {item.course}
                    {item.ongoing && (
                      <span className="ml-2 rounded-full bg-green-400/20 px-2 py-0.5 text-xs font-bold text-green-700">
                        em andamento
                      </span>
                    )}
                  </span>
                  <span className="text-sm font-semibold text-zinc-600">
                    {item.institution}
                  </span>
                  <span className="text-xs font-semibold text-zinc-400">
                    {item.period}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="flex items-center gap-2 font-bold text-lg text-zinc-900">
              <Award size={18} className="text-green-500" />
              Certificações
            </h3>
            <ul className="flex flex-col gap-2">
              {certifications.map((certification) => (
                <li
                  key={certification}
                  className="flex items-start gap-2 text-sm font-semibold text-zinc-600"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
                  {certification}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="flex items-center gap-2 font-bold text-lg text-zinc-900">
              <Languages size={18} className="text-green-500" />
              Idiomas
            </h3>
            <ul className="flex flex-col gap-2">
              {languages.map((language) => (
                <li key={language.name} className="flex flex-col">
                  <span className="font-bold text-sm text-zinc-900">
                    {language.name}
                  </span>
                  <span className="text-sm font-semibold text-zinc-500">
                    {language.level}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
