'use client'

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-full bg-zinc-900 dark:bg-white px-6 py-2.5 text-sm font-semibold text-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
    >
      Imprimir / Salvar como PDF
    </button>
  )
}
