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
    description: "Upgrade interaction patterns and visual language with pragmatic Material 3 updates.",
  },
]

export function ApproachSection() {
  return (
    <section id="approach" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 sm:mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Approach</p>
          <h2 className="forge-section-title mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            A repeatable modernization process.
          </h2>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon

            return (
              <article key={step.title} className="forge-panel rounded-2xl p-6">
                <div className="inline-flex size-10 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-5 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {step.description}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
