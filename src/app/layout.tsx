import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { ViewTransitions } from 'next-view-transitions'
import './globals.css'
import { Providers } from './providers'
import { profile } from './data/profile'
import { NavbarHeader } from './components/Navbar'
import { Footer } from './components/Footer'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
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
    <ViewTransitions>
      <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
        <body className={nunito.className}>
          <Providers>
            <div className="flex min-h-screen flex-col">
              <NavbarHeader />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  )
}
