"use client";

import { ThemeSwitcher } from './components/ThemeSwitcher'
import { NavbarHeader } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { ProjectSection } from './sections/ProjectSection';
import FilterCard from './components/FilterCard';
import { ContactSection } from './sections/ContactSection';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <NavbarHeader />
      <HeroSection />
      {/* <ProjectSection />
      <ContactSection /> */}
      {/* <FilterCard /> */}
      {/* <Header /> */}
     {/* <ThemeSwitcher /> */}
    </div>
  )
}
