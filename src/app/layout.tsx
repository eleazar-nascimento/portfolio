import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { profile } from './data/profile'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  // TODO: troque pelo domínio final quando publicar (ex.: https://eleazar.dev)
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title: `${profile.name} | ${profile.role}`,
  description: profile.summary,
  keywords: [
    'desenvolvedor javascript',
    'desenvolvedor react',
    'next.js',
    'node.js',
    'typescript',
    'full stack',
    profile.name,
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: profile.headline,
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: profile.photo }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={nunito.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
