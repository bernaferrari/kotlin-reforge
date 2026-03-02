import { ProjectCard, type ProjectData } from "./project-card"
import { ComingSoonCard } from "./coming-soon-card"
import { ExtraSection } from "./extra-section"

const projects: ProjectData[] = [
  {
    name: "Markor",
    category: "Markdown Editor",
    summary:
      "Java-to-KMP migration with a redesigned Material editor experience.",
    repoUrl: "https://github.com/bernaferrari/Markor",
    showcaseImages: [
      "/markor/more.png",
      "/markor/onboarding.png",
      "/markor/home.png",
      "/markor/editor.png",
      "/markor/settings.png",
    ],
    wins: [
      "Migrated core app architecture from Java to Kotlin Multiplatform",
      "Refined editor and file-navigation flow",
      "Improved visual consistency across key screens",
    ],
    comparisonImages: {
      before: ["/images/markor-before.jpg", "/images/markor-before-2.jpg"],
      after: ["/images/markor-after.jpg", "/images/markor-after-2.jpg"],
    },
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
    wins: [
      "Ported major screens and flows to Jetpack Compose",
      "Redesigned DNS and privacy controls for faster navigation",
      "Improved dashboard clarity across app, stats, and settings surfaces",
    ],
  },
  {
    name: "NetGuard",
    category: "Network Firewall",
    summary:
      "Java-to-Kotlin migration with a Compose-based redesign for clearer firewall control.",
    repoUrl: "https://github.com/bernaferrari/NetGuard",
    showcaseImages: [
      "/netguard/more%20-%20light.png",
      "/netguard/home.png",
      "/netguard/firewall.png",
      "/netguard/details.png",
      "/netguard/settings.png",
      "/netguard/more%20-%20dark.png",
    ],
    wins: [
      "Migrated legacy Java layers to Kotlin",
      "Rebuilt key user-facing surfaces with Jetpack Compose",
      "Improved day-to-day firewall interaction flow",
    ],
    comparisonImages: {
      before: ["/images/netguard-before.jpg", "/images/netguard-before-2.jpg"],
      after: ["/images/netguard-after.jpg", "/images/netguard-after-2.jpg"],
    },
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 sm:mb-14">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Case Studies</p>
          <h2 className="forge-section-title mt-3 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Each app follows a different modernization path.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Markor is a Java to KMP migration, RethinkDNS is a full redesign with a Compose
            port, and NetGuard is a Java to Kotlin migration with Compose.
          </p>
        </header>

        <div className="space-y-6 sm:space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} reversed={index % 2 === 1} />
          ))}

          <ExtraSection />

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
    </section>
  )
}
