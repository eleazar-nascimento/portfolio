type SectionTitleProps = {
  /** Rótulo pequeno acima do título */
  eyebrow?: string
  title: string
  subtitle?: string
  /** Usa cores claras (para seções com fundo escuro) — só afeta no modo claro */
  inverted?: boolean
  align?: 'center' | 'left'
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  inverted = false,
  align = 'center',
}: SectionTitleProps) {
  const alignment =
    align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div className={`flex flex-col gap-2 ${alignment}`}>
      {eyebrow && (
        <span className="font-bold text-xs tracking-[0.2em] text-green-500">
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-extrabold text-3xl sm:text-4xl lg:text-5xl ${
          inverted
            ? 'text-white'
            : 'text-zinc-900 dark:text-white'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`font-semibold text-sm sm:text-base max-w-2xl ${
            inverted
              ? 'text-gray-50/60'
              : 'text-zinc-900/50 dark:text-gray-50/60'
          }`}
        >
          {subtitle}
        </p>
      )}
      <span className="mt-2 h-1 w-16 rounded-full bg-green-400" />
    </div>
  )
}
