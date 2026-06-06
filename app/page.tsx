import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { ProjectsSection } from "@/components/landing/projects-section"
import { ApproachSection } from "@/components/landing/approach-section"
import { CtaSection, Footer } from "@/components/landing/cta-footer"

export default function Home() {
  return (
    <div className="forge-shell min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <ProjectsSection />
        <ApproachSection />
        {/* <StatsBar /> */}
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
