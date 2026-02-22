import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { StatsBar } from "@/components/landing/stats-bar"
import { ProjectsSection } from "@/components/landing/projects-section"
import { ApproachSection } from "@/components/landing/approach-section"
import { CtaSection, Footer } from "@/components/landing/cta-footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <ProjectsSection />
        <ApproachSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
