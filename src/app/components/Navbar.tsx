'use client'

import { usePathname } from 'next/navigation'
import { Link } from 'next-view-transitions'
import { profile } from '../data/profile'
import { ThemeSwitcher } from './ThemeSwitcher'
import { useState } from 'react'

const navLinks = [
  { label: 'Work', href: '/' },
  { label: 'Play', href: '/play' },
  { label: 'About', href: '/about' },
]

export function NavbarHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-white/5">
      <nav className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
        {/* Nome */}
        <Link
          href="/"
          className="font-bold text-lg text-zinc-900 dark:text-white"
        >
          {profile.name}
        </Link>

        {/* Links desktop */}
        <div className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive
                    ? 'font-semibold text-zinc-900 dark:text-white'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Resume
          </a>
          <ThemeSwitcher />
        </div>

        {/* Mobile: toggle + switcher */}
        <div className="flex items-center gap-3 sm:hidden">
          <ThemeSwitcher />
          <button
            type="button"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 items-center justify-center text-zinc-900 dark:text-white"
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="flex flex-col gap-4 border-t border-zinc-100 dark:border-white/5 px-6 py-6 sm:hidden bg-white dark:bg-zinc-950">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-base font-medium ${
                (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href))
                  ? 'text-zinc-900 dark:text-white'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-medium text-zinc-500 dark:text-zinc-400"
          >
            Resume
          </a>
        </div>
      )}
    </header>
  )
}
