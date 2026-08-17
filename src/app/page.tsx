import { NavbarHeader } from './components/Navbar'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { ProjectSection } from './sections/ProjectSection'
import { ServicesSection } from './sections/ServicesSection'
import { SkillsSection } from './sections/SkillsSection'
import { ContactSection } from './sections/ContactSection'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <NavbarHeader />
      <main className="w-full">
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <ServicesSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </div>
  )
}
