import { ProjectCard, type ProjectData } from "./project-card"
import { ComingSoonCard } from "./coming-soon-card"
import { FileEdit, Shield, Wifi, Calculator } from "lucide-react"

const projects: ProjectData[] = [
    {
        name: "Markor",
        tagline: "Markdown Editor",
        description:
            "A beloved open-source Markdown editor reforged from its Java roots into a modern, expressive Kotlin application with Material 3 design, structured concurrency, and a plugin-ready architecture.",
        icon: <FileEdit className="size-6 text-emerald-400" />,
        accentClass: "text-emerald-400",
        accentBg: "bg-emerald-400/10",
        beforeImages: ["/images/markor-before.jpg", "/images/markor-before-2.jpg"],
        afterImages: ["/images/markor-after.jpg", "/images/markor-after-2.jpg"],
        repoUrl: "https://github.com/bernaferrari/Markor",
        transformations: [
            { label: "Rewrote Everything", description: "Complete rebuild" },
            { label: "Kotlin Multiplatform", description: "KMP Foundation" },
            { label: "Material 3", description: "Expressive design system" },
            { label: "Coroutines", description: "Structured concurrency" },
        ],
        stats: {
            languageBefore: "Java",
            languageAfter: "Kotlin/KMP",
            architectureBefore: "Monolith",
            architectureAfter: "MVVM",
        },
    },
    {
        name: "RethinkDNS",
        tagline: "DNS & Firewall Privacy",
        description:
            "A critical privacy infrastructure app reforged with modern Kotlin, replacing legacy networking code with coroutine-based flows, and delivering a completely reimagined Material 3 dashboard.",
        icon: <Shield className="size-6 text-sky-400" />,
        accentClass: "text-sky-400",
        accentBg: "bg-sky-400/10",
        beforeImages: ["/images/rethinkdns-before.jpg", "/images/rethinkdns-before-2.jpg"],
        afterImages: ["/images/rethinkdns-after.jpg", "/images/rethinkdns-after-2.jpg"],
        repoUrl: "https://github.com/bernaferrari/rethink-app",
        transformations: [
            { label: "Java → Kotlin", description: "Full language migration" },
            { label: "Added Compose", description: "Modern UI layer" },
            { label: "Full Redesign", description: "Material 3 dashboard" },
            { label: "Coroutines + Flow", description: "Reactive networking" },
            { label: "KMP", description: "Shared DNS logic" },
        ],
        stats: {
            languageBefore: "Java",
            languageAfter: "Kotlin/KMP",
            architectureBefore: "Callbacks",
            architectureAfter: "MVI + Flow",
        },
    },
    {
        name: "NetGuard",
        tagline: "Network Firewall",
        description:
            "A foundational Android firewall reforged from legacy VPN-based Java code into an idiomatic Kotlin system with modern architecture, reactive state management, and a beautiful Material 3 interface.",
        icon: <Wifi className="size-6 text-amber-400" />,
        accentClass: "text-amber-400",
        accentBg: "bg-amber-400/10",
        beforeImages: ["/images/netguard-before.jpg", "/images/netguard-before-2.jpg"],
        afterImages: ["/images/netguard-after.jpg", "/images/netguard-after-2.jpg"],
        repoUrl: "https://github.com/bernaferrari/NetGuard",
        transformations: [
            { label: "Rewrote Everything", description: "Deep architectural rework" },
            { label: "Java → Kotlin", description: "Full language migration" },
            { label: "Compose", description: "Declarative UI" },
            { label: "Material 3", description: "Expressive firewall UI" },
        ],
        stats: {
            languageBefore: "Java",
            languageAfter: "Kotlin",
            architectureBefore: "God Activities",
            architectureAfter: "MVVM + Compose",
        },
    },
    {
        name: "Calculator++",
        tagline: "Scientific Calculator",
        description:
            "A powerful scientific calculator reborn in Kotlin with expression parsing rebuilt from scratch, a modern gesture-driven Material 3 UI, and Kotlin Multiplatform support for desktop targets.",
        icon: <Calculator className="size-6 text-rose-400" />,
        accentClass: "text-rose-400",
        accentBg: "bg-rose-400/10",
        beforeImages: ["/images/calculator-before.jpg", "/images/calculator-before-2.jpg"],
        afterImages: ["/images/calculator-after.jpg", "/images/calculator-after-2.jpg"],
        repoUrl: "https://github.com/bernaferrari/CalculatorPP",
        transformations: [
            { label: "Kotlin Multiplatform", description: "Desktop + Android" },
            { label: "Java → Kotlin", description: "Full language migration" },
            { label: "Compose", description: "Declarative UI layer" },
            { label: "Material 3", description: "Expressive calculator UI" },
        ],
        stats: {
            languageBefore: "Java",
            languageAfter: "Kotlin/KMP",
            architectureBefore: "Spaghetti",
            architectureAfter: "MVVM + Compose",
        },
    },
]

export function ProjectsSection() {
    return (
        <section id="projects" className="py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mb-20 text-center">
                    <p className="mb-4 font-mono text-sm font-semibold uppercase tracking-widest text-primary">
                        Showcase
                    </p>
                    <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        Four apps. Four transformations.
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                        Each project undergoes a complete architectural rewrite &mdash; from
                        legacy Java to idiomatic, modern Kotlin-first systems.
                    </p>
                </div>

                <div className="flex flex-col gap-12 lg:gap-16">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.name}
                            project={project}
                            reversed={index % 2 !== 0}
                        />
                    ))}

                    <ComingSoonCard
                        name="ChangeDetection"
                        tagline="Track website changes"
                        description="An open-source app that monitors web pages for changes and notifies you. Next in line to be reforged with modern Kotlin, Coroutines-based polling, and a Material 3 interface."
                        repoUrl="https://github.com/bernaferrari/ChangeDetection"
                        accentClass="text-teal-400"
                        accentBg="bg-teal-400/10"
                        plannedTransformations={[
                            "Java → Kotlin",
                            "Material 3",
                            "Coroutines",
                            "Compose",
                            "KMP Ready",
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}
