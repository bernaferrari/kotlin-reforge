import { ProjectCard, type ProjectData } from "./project-card"
import { ComingSoonCard } from "./coming-soon-card"

const projects: ProjectData[] = [
  {
    name: "Markor",
    category: "Markdown Editor",
    summary:
      "Modernized editor experience with architectural cleanup and a redesigned Material interface.",
    repoUrl: "https://github.com/bernaferrari/Markor",
    showcaseImages: [
      "/markor/onboarding.png",
      "/markor/home.png",
      "/markor/editor.png",
      "/markor/settings.png",
      "/markor/more.png",
    ],
    wins: [
      "Refined editor and file-navigation flow",
      "Cleaned module boundaries and state handling",
      "Improved visual consistency across key screens",
    ],
  },
  {
    name: "RethinkDNS",
    category: "DNS & Firewall Privacy",
    summary:
      "Kotlin-first modernization of critical networking paths with a clearer privacy dashboard.",
    repoUrl: "https://github.com/bernaferrari/rethink-app",
    showcaseImages: ["/images/rethinkdns-after-2.jpg", "/images/rethinkdns-after.jpg"],
    wins: [
      "Migrated key networking surfaces to Kotlin + Flow",
      "Restructured DNS and privacy controls for clarity",
      "Reduced callback-heavy legacy behavior",
    ],
  },
  {
    name: "NetGuard",
    category: "Network Firewall",
    summary:
      "Firewall modernization focused on maintainability, interaction clarity, and redesigned control surfaces.",
    repoUrl: "https://github.com/bernaferrari/NetGuard",
    showcaseImages: [
      "/netguard/home.png",
      "/netguard/firewall.png",
      "/netguard/details.png",
      "/netguard/settings.png",
      "/netguard/more.png",
    ],
    wins: [
      "Simplified rule and state modeling",
      "Improved daily-use interaction flow",
      "Reshaped architecture for easier maintenance",
    ],
  },
  {
    name: "Calculator++",
    category: "Scientific Calculator",
    summary:
      "UI migrated from legacy Kotlin views to Compose, with a full redesign for scientific workflows.",
    repoUrl: "https://github.com/bernaferrari/CalculatorPP",
    showcaseImages: ["/images/calculator-after-2.jpg", "/images/calculator-after.jpg"],
    wins: [
      "Moved existing Kotlin UI stack to Compose",
      "Refined keypad, history, and expression interactions",
      "Improved feedback for complex calculations",
    ],
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
            Some projects are Java to Kotlin ports, others are Kotlin UI to Compose migrations.
            All of them are redesigned.
          </p>
        </header>

        <div className="space-y-6 sm:space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} reversed={index % 2 === 1} />
          ))}

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
