import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portifólio',
  description: 'Meu portfólio pessoal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* <Providers> */}
        <body className={nunito.className}>{children}</body>
      {/* </Providers> */}
    </html>
  )
}
