'use client'

import { useEffect, useState } from 'react'
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react'
import { navLinks, profile, sectionIds } from '../data/profile'

export function NavbarHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>(sectionIds.about)

  /** Destaca no menu a seção visível na tela */
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((element): element is HTMLElement => element !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <Navbar
      className="bg-zinc-900"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="lg"
      classNames={{
        base: 'bg-zinc-900 border-white/10',
        wrapper: 'px-6',
        item: [
          'flex',
          'relative',
          'h-full',
          'items-center',
          "data-[active=true]:after:content-['']",
          'data-[active=true]:after:absolute',
          'data-[active=true]:after:bottom-0',
          'data-[active=true]:after:left-0',
          'data-[active=true]:after:right-0',
          'data-[active=true]:after:h-[2px]',
          'data-[active=true]:after:rounded-[2px]',
          'data-[active=true]:after:bg-green-400',
        ],
        menu: 'bg-zinc-900/95 pt-6',
        toggleIcon: 'text-white',
      }}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          className="text-white sm:hidden"
        />
        <NavbarBrand>
          <Link
            className="font-bold text-white sm:text-lg"
            href={`#${sectionIds.hero}`}
          >
            {profile.name}
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-5 sm:flex" justify="center">
        {navLinks.map((link) => {
          const isActive = activeSection === link.id

          return (
            <NavbarItem
              key={link.id}
              isActive={isActive}
              className="data-[active=true]:font-bold"
            >
              <Link
                aria-current={isActive ? 'page' : undefined}
                className={`text-sm ${isActive ? 'text-green-400' : 'text-white'}`}
                href={link.href}
              >
                {link.label}
              </Link>
            </NavbarItem>
          )
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Button
            as="a"
            className="font-bold text-sm text-zinc-900 bg-green-400"
            href={`#${sectionIds.contact}`}
            size="sm"
          >
            Contato
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {navLinks.map((link) => (
          <NavbarMenuItem key={link.id} isActive={activeSection === link.id}>
            <Link
              className={`w-full font-semibold ${
                activeSection === link.id ? 'text-green-400' : 'text-white'
              }`}
              href={link.href}
              size="lg"
              onPress={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
