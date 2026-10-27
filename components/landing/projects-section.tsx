import { ProjectCard, type ProjectData } from "./project-card"
import { ExtraSection } from "./extra-section"

const projects: ProjectData[] = [
  {
    name: "Wordkeep",
    category: "Markdown Notes",
    summary:
      "Markor reforged: Gregor Santner's Java Markdown editor, rebuilt with Kotlin Multiplatform and Compose as plain-file notes for Android, iOS and the web.",
    repoUrl: "https://github.com/bernaferrari/markor",
    demoUrl: "https://markor-five.vercel.app/",
    showcaseImages: [
      "/wordkeep/hero.webp",
      "/wordkeep/before-after.webp",
      "/wordkeep/notes.webp",
      "/wordkeep/organize.webp",
      "/wordkeep/tablet.webp",
    ],
  },
  {
    name: "RethinkDNS",
    category: "DNS & Firewall Privacy",
    summary:
      "Full redesign with a Jetpack Compose port across core privacy and networking surfaces.",
    repoUrl: "https://github.com/bernaferrari/rethink-app",
    showcaseImages: [
      "/rethink/more-dark.webp",
      "/rethink/more-light.webp",
      "/rethink/even-more-light.webp",
      "/rethink/apps.webp",
      "/rethink/stats.webp",
      "/rethink/home.webp",
      "/rethink/settings.webp",
    ],
  },
  {
    name: "QuietGuard",
    category: "Network Firewall",
    summary:
      "NetGuard modernization: Marcel Bokhorst's Java firewall rewritten in Kotlin Multiplatform and Compose, with a packet engine in Rust.",
    repoUrl: "https://github.com/bernaferrari/QuietGuard",
    demoUrl: "https://quietguard.vercel.app/",
    showcaseImages: [
      "/quietguard/hero.webp",
      "/quietguard/before-after.webp",
      "/quietguard/firewall.webp",
      "/quietguard/rules.webp",
      "/quietguard/tablet.webp",
    ],
  },
  {
    name: "Calcula",
    category: "Scientific Calculator",
    summary:
      "Calculator++ reforged: Sergey Solovyev's Java swipe-key calculator, rebuilt with Kotlin Multiplatform and Compose for Android, iOS and the web.",
    repoUrl: "https://github.com/bernaferrari/calcula",
    showcaseImages: [
      "/calcula/keys.webp",
      "/calcula/before-after.webp",
      "/calcula/tools.webp",
      "/calcula/tablet.webp",
    ],
  },
  {
    name: "ChangeDetection",
    category: "Website Monitor",
    summary:
      "A 2018 Android app rebuilt: Architecture Components and XML layouts replaced by Kotlin Multiplatform with a shared Compose UI.",
    repoUrl: "https://github.com/bernaferrari/ChangeDetection",
    showcaseImages: [
      "/changedetection/changes.webp",
      "/changedetection/watch.webp",
      "/changedetection/tablet.webp",
    ],
  },
  {
    name: "Lumina",
    category: "Remote Desktop",
    summary:
      "Built from scratch, not a port: a remote desktop for Omarchy and Hyprland, with one Compose Multiplatform viewer and a Rust host.",
    showcaseImages: [
      "/lumina/hero.webp",
      "/lumina/session.webp",
      "/lumina/control.webp",
      "/lumina/tablet.webp",
    ],
  },
  {
    name: "WiFi Weakspot",
    category: "Wi-Fi Analyzer",
    summary:
      "Built from scratch, not a port: a Material 3 Expressive Wi-Fi analyzer for Android that maps where your signal gets weak.",
    repoUrl: "https://github.com/bernaferrari/wifi-weakspot",
    showcaseImages: [
      "/wifi-weakspot/signal.webp",
      "/wifi-weakspot/rooms.webp",
      "/wifi-weakspot/tablet.webp",
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
            Wordkeep, QuietGuard and Calcula carry Java apps (Markor, NetGuard, Calculator++) into
            Kotlin Multiplatform and Compose. RethinkDNS is a full redesign with a Compose port, and
            ChangeDetection rebuilds an older Kotlin app. Lumina and WiFi Weakspot are new apps
            built the same way. App sources live in separate repos — open Live Demo or Source on
            each card.
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
        </div>
      </div>
    </section>
  )
}
