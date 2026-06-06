import { Blocks, Compass, RefreshCw } from "lucide-react"

const steps = [
  {
    icon: Compass,
    title: "Port carefully",
    description: "Move critical Java surfaces to Kotlin without breaking project identity.",
  },
  {
    icon: Blocks,
    title: "Improve structure",
    description: "Refactor weak boundaries, state management, and async behavior where it matters.",
  },
  {
    icon: RefreshCw,
    title: "Modernize experience",
    description:
      "Upgrade interaction patterns and visual language with pragmatic Material 3 updates.",
  },
]

export function ApproachSection() {
  return (
    <section id="approach" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 max-w-3xl sm:mb-16">
          <p className="forge-eyebrow forge-eyebrow-dot inline-flex items-center">Approach</p>
          <h2 className="forge-section-title mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
            A repeatable modernization process.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every project follows the same disciplined arc — preserve what works, rebuild what
            doesn't, polish the surface.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            const stepNumber = String(index + 1).padStart(2, "0")

            return (
              <article
                key={step.title}
                className="forge-panel group relative overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-6 -top-6 font-mono text-7xl font-semibold text-muted-foreground/[0.06] transition-colors group-hover:text-primary/[0.12]"
                >
                  {stepNumber}
                </span>

                <div className="relative">
                  <div className="inline-flex size-11 items-center justify-center rounded-xl border border-border/60 bg-gradient-to-br from-muted/80 to-muted/30">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
