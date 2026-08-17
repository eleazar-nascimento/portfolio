import {
  ArrowRight,
  Boxes,
  Check,
  Gauge,
  GitBranch,
  LayoutDashboard,
  Plug,
  TestTube2,
  type LucideIcon,
} from 'lucide-react'
import { SectionTitle } from '../components/SectionTitle'
import { sectionIds, services, type Service } from '../data/profile'

const iconMap: Record<Service['icon'], LucideIcon> = {
  LayoutDashboard,
  Boxes,
  GitBranch,
  Gauge,
  Plug,
  TestTube2,
}

export function ServicesSection() {
  return (
    <section
      id={sectionIds.services}
      className="w-full scroll-mt-20 bg-white px-6 py-20 sm:py-28"
    >
      <div className="mx-auto flex w-full max-w-[980px] flex-col gap-12">
        <SectionTitle
          eyebrow="COMO POSSO AJUDAR"
          title="Serviços"
          subtitle="Do primeiro rascunho ao deploy em produção, com acompanhamento em cada etapa"
          align="left"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon]

            return (
              <article
                key={service.title}
                className="group flex h-full flex-col gap-4 rounded-2xl border border-zinc-200 bg-zinc-50/60 p-6 transition-all hover:-translate-y-1 hover:border-green-400 hover:bg-white hover:shadow-lg"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 transition-colors group-hover:bg-green-400">
                  <Icon
                    size={20}
                    className="text-green-400 transition-colors group-hover:text-zinc-900"
                  />
                </span>

                <div className="flex flex-col gap-1.5">
                  <h3 className="font-bold text-lg text-zinc-900">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600">
                    {service.description}
                  </p>
                </div>

                <ul className="mt-auto flex flex-col gap-2 border-t border-zinc-100 pt-4">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs font-semibold text-zinc-500"
                    >
                      <Check
                        size={13}
                        className="mt-0.5 shrink-0 text-green-500"
                        strokeWidth={3}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>

        <div className="flex flex-col items-center gap-4 rounded-2xl bg-zinc-900 px-8 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-xl text-white sm:text-2xl">
              Tem um projeto em mente?
            </h3>
            <p className="text-sm font-semibold text-gray-50/60">
              Me conte a ideia e eu te digo como podemos tirar do papel.
            </p>
          </div>
          <a
            href={`#${sectionIds.contact}`}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-green-400 px-6 py-3 font-bold text-sm text-zinc-900 transition-opacity hover:opacity-90"
          >
            Vamos conversar
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
