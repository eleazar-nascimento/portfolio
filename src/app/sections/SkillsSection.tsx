import {
  Boxes,
  Code2,
  Palette,
  Server,
  TestTube2,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { SectionTitle } from '../components/SectionTitle'
import { sectionIds, skillGroups, type SkillGroup } from '../data/profile'

const iconMap: Record<SkillGroup['icon'], LucideIcon> = {
  Code2,
  Palette,
  Boxes,
  Server,
  TestTube2,
  Wrench,
}

export function SkillsSection() {
  return (
    <section
      id={sectionIds.skills}
      className="w-full scroll-mt-20 bg-zinc-950 px-6 py-20 sm:py-28"
    >
      <div className="mx-auto flex w-full max-w-[980px] flex-col gap-12">
        <SectionTitle
          eyebrow="STACK"
          title="Habilidades"
          subtitle="As tecnologias que uso no dia a dia para construir e manter produtos"
          inverted
          align="left"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => {
            const Icon = iconMap[group.icon]

            return (
              <div
                key={group.title}
                className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-800/60 p-6 transition-colors hover:border-green-400/50"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-yellow-400/60 bg-zinc-900">
                    <Icon size={18} className="text-yellow-400" />
                  </span>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-base text-white">
                      {group.title}
                    </h3>
                    <p className="text-xs font-semibold text-gray-50/50">
                      {group.description}
                    </p>
                  </div>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-white/10 bg-zinc-900/70 px-3 py-1 text-xs font-semibold text-gray-50/80"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
