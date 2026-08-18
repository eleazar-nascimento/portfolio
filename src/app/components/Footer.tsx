import { profile, socials } from '../data/profile'

export function Footer() {
  return (
    <footer className="w-full bg-zinc-900 dark:bg-zinc-950 px-6 py-16">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-10">
        <h2 className="font-bold text-2xl text-green-400 sm:text-3xl">
          Vamos trabalhar juntos!
        </h2>

        <div className="flex flex-col gap-2">
          <a
            href={`mailto:${socials.find((s) => s.icon === 'Mail')?.display}`}
            className="text-base text-zinc-300 hover:text-white transition-colors"
          >
            {socials.find((s) => s.icon === 'Mail')?.display}
          </a>
          <p className="text-sm text-zinc-500">
            Respondo rápido via e-mail ou WhatsApp.
          </p>
        </div>

        <div className="flex flex-col gap-4 border-t border-zinc-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} {profile.name}. Feito com Next.js e
            Tailwind CSS.
          </p>

          <div className="flex gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
