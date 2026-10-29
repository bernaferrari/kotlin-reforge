import { apps } from "@/lib/apps"
import { ProjectCard } from "./project-card"
import { ExtraSection } from "./extra-section"

export function ProjectsSection() {
  return (
    <section id="apps" className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 max-w-3xl sm:mb-16">
          <p className="forge-eyebrow forge-eyebrow-dot inline-flex items-center">The apps</p>
          <h2 className="forge-section-title mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
            Seven apps so far.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Five apps people already rely on keep what made them useful and gain a cleaner design,
            clearer words, dark mode and room for tablets. The before-and-after pictures show
            exactly what changed. WiFi Weakspot and Lumina are new, built the same way from day one.
          </p>
        </header>

        <div className="space-y-6 sm:space-y-8">
          {apps.map((app) => (
            <ProjectCard key={app.slug} app={app} />
          ))}

          <ExtraSection />
        </div>
      </div>
    </section>
  )
}
