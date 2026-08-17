import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  PhoneCall,
  type LucideIcon,
} from 'lucide-react'
import { profile, sectionIds, socials, type Social } from '../data/profile'

const iconMap: Record<Social['icon'], LucideIcon> = {
  Github,
  Mail,
  Linkedin,
  PhoneCall,
  MapPin,
}

export function ContactSection() {
  return (
    <section
      id={sectionIds.contact}
      className="w-full scroll-mt-20 bg-zinc-900 px-6 pb-12 pt-20 sm:pt-28"
    >
      <div className="mx-auto flex w-full max-w-[980px] flex-col gap-12">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="font-bold text-xs tracking-[0.2em] text-green-500">
            CONTATO
          </span>
          <h2 className="font-extrabold text-3xl text-white sm:text-4xl lg:text-5xl">
            Vamos trabalhar juntos
          </h2>
          <p className="max-w-xl font-semibold text-sm text-gray-50/60 sm:text-base">
            Respondo rápido em qualquer um dos canais abaixo. Me chame para falar
            sobre vagas, freelances ou parcerias.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((social) => {
            const Icon = iconMap[social.icon]

            return (
              <a
                key={social.label}
                className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 p-6 text-center transition-colors hover:border-green-400/60"
                href={social.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-yellow-400 bg-zinc-800 transition-colors group-hover:border-green-400">
                  <Icon className="text-yellow-400 transition-colors group-hover:text-green-400" />
                </span>
                <span className="font-bold text-lg text-white">
                  {social.label}
                </span>
                <span className="break-all font-Nunito text-sm font-semibold text-gray-50/50">
                  {social.display}
                </span>
              </a>
            )
          })}
        </div>

        <footer className="flex flex-col items-center gap-2 border-t border-white/10 pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm font-semibold text-gray-50/40">
            © {new Date().getFullYear()} {profile.name}. Feito com Next.js,
            TypeScript e Tailwind CSS.
          </p>
          <p className="flex items-center gap-2 text-sm font-semibold text-gray-50/40">
            <MapPin size={14} className="text-green-500" />
            {profile.location}
          </p>
        </footer>
      </div>
    </section>
  )
}
