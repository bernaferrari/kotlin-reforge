import { ProjectCard, type ProjectData } from "./project-card"
import { ComingSoonCard } from "./coming-soon-card"
import { ExtraSection } from "./extra-section"

const projects: ProjectData[] = [
  {
    name: "Markor",
    category: "Markdown Editor",
    summary: "Java-to-KMP migration with a redesigned Material editor experience.",
    repoUrl: "https://github.com/bernaferrari/Markor",
    demoUrl: "https://markor-five.vercel.app/",
    showcaseImages: [
      "/markor/more.png",
      "/markor/onboarding.png",
      "/markor/home.png",
      "/markor/editor.png",
      "/markor/settings.png",
    ],
  },
  {
    name: "RethinkDNS",
    category: "DNS & Firewall Privacy",
    summary:
      "Full redesign with a Jetpack Compose port across core privacy and networking surfaces.",
    repoUrl: "https://github.com/bernaferrari/rethink-app",
    showcaseImages: [
      "/rethink/more-dark.png",
      "/rethink/more-light.png",
      "/rethink/even-more-light.png",
      "/rethink/apps.png",
      "/rethink/stats.png",
      "/rethink/home.png",
      "/rethink/settings.png",
    ],
  },
  {
    name: "QuietGuard",
    category: "Network Firewall",
    summary:
      "NetGuard modernization: Java-to-Kotlin migration with a Compose-based redesign for clearer firewall control.",
    repoUrl: "https://github.com/bernaferrari/QuietGuard",
    demoUrl: "https://quietguard.vercel.app/",
    showcaseImages: [
      "/netguard/more%20-%20light.png",
      "/netguard/home.png",
      "/netguard/firewall.png",
      "/netguard/details.png",
      "/netguard/settings.png",
      "/netguard/more%20-%20dark.png",
    ],
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 max-w-3xl sm:mb-16">
          <p className="forge-eyebrow forge-eyebrow-dot inline-flex items-center">Case Studies</p>
          <h2 className="forge-section-title mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
            Each app follows a different modernization path.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Markor is a Java to KMP migration. RethinkDNS is a full redesign with a Compose port.
            QuietGuard modernizes NetGuard with Kotlin and Compose. App sources live in separate
            repos — open Live Demo or Source on each card.
          </p>
        </header>

        <div className="space-y-6 sm:space-y-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              reversed={index % 2 === 1}
              index={index}
            />
          ))}

          <ExtraSection />

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            <ComingSoonCard
              name="Calculator++"
              summary="Compose redesign is in final polish and scheduled to ship in the next few days."
              repoUrl="https://github.com/bernaferrari/android-calculatorpp"
              planned={["Compose UI", "Scientific Workflow", "History", "Material 3"]}
            />

            <ComingSoonCard
              name="ChangeDetection"
              summary="Planned Kotlin modernization focused on reliable polling, cleaner state updates, and improved readability."
              repoUrl="https://github.com/bernaferrari/ChangeDetection"
              planned={["Kotlin Port", "Compose UI", "Coroutines", "Material 3"]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
