import { Button, Image } from '@nextui-org/react'
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react'
import { profile, sectionIds, socials } from '../data/profile'

const heroSocialIcons = {
  Github,
  Linkedin,
  Mail,
} as const

export function HeroSection() {
  const heroSocials = socials.filter(
    (social): social is (typeof socials)[number] & {
      icon: keyof typeof heroSocialIcons
    } => social.icon in heroSocialIcons,
  )

  return (
    <section
      id={sectionIds.hero}
      className="w-full scroll-mt-20 bg-white px-6 py-16 sm:py-28"
    >
      <div className="mx-auto flex w-full max-w-[980px] flex-col-reverse items-center justify-between gap-10 sm:flex-row">
        <div className="flex flex-col gap-4">
          <span className="flex w-fit items-center gap-2 self-center rounded-full border border-green-400 bg-green-400/10 px-3 py-1 text-xs font-bold text-green-700 sm:self-start">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            {profile.availability}
          </span>

          <h1 className="font-bold text-3xl text-center text-zinc-900 sm:text-5xl sm:text-left">
            Olá, eu sou <br /> {profile.name}
          </h1>

          <p className="text-center font-semibold text-zinc-900/50 sm:text-medium sm:text-left">
            {profile.role} · {profile.seniority}
          </p>

          <p className="max-w-lg text-center text-sm font-semibold text-zinc-900 sm:text-medium sm:text-left">
            {profile.summary}
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
            <Button
              as="a"
              className="flex w-40 items-center font-bold text-sm text-zinc-900 bg-green-400"
              endContent={<Download size={15} />}
              href={profile.resume}
              rel="noopener noreferrer"
              target="_blank"
            >
              Ver Currículo
            </Button>
            <Button
              as="a"
              className="w-40 hover:bg-zinc-100"
              endContent={<ArrowRight size={15} />}
              href={`#${sectionIds.contact}`}
              variant="bordered"
            >
              Entre em contato
            </Button>
          </div>

          <div className="flex justify-center gap-3 pt-2 sm:justify-start">
            {heroSocials.map((social) => {
              const Icon = heroSocialIcons[social.icon]

              return (
                <a
                  key={social.label}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition-colors hover:border-green-400 hover:text-green-600"
                  href={social.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        </div>

        <Image
          alt={`Foto de ${profile.name}`}
          className="object-cover sm:h-[420px] sm:w-[420px]"
          height={300}
          src={profile.photo}
          width={300}
          isBlurred
          isZoomed
        />
      </div>
    </section>
  )
}
