import { Flame, Layers, Zap, Repeat } from "lucide-react"

const principles = [
  {
    icon: <Flame className="size-6 text-primary" />,
    title: "Not migration \u2014 transformation",
    description:
      "We don\u2019t just convert syntax. We rethink legacy code and rebuild it using idiomatic Kotlin patterns, modern APIs, and current best practices.",
  },
  {
    icon: <Layers className="size-6 text-primary" />,
    title: "Pragmatic modernization",
    description:
      "Every reforged app gets the architecture it needs \u2014 whether that\u2019s MVVM, MVI, or something in between. Structured concurrency and dependency injection where it matters.",
  },
  {
    icon: <Zap className="size-6 text-primary" />,
    title: "Modern by default",
    description:
      "Coroutines, Flow, Compose, Material 3 Expressive, and KMP are not afterthoughts \u2014 they\u2019re the foundation of every reforged app.",
  },
  {
    icon: <Repeat className="size-6 text-primary" />,
    title: "Repeatable blueprint",
    description:
      "Each transformation establishes patterns and tooling that can be applied to any legacy Android application. The learnings are open-source too.",
  },
]

export function ApproachSection() {
  return (
    <section id="approach" className="border-t border-border bg-card py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-20 text-center">
          <p className="mb-4 font-mono text-sm font-semibold uppercase tracking-widest text-primary">
            Philosophy
          </p>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            The Reforge approach
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Modernization is not cosmetic. It is architectural. Here&apos;s how
            we think about transforming mature open-source software.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-8 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 will-change-transform"
            >
              <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-500 group-hover:bg-primary/20">
                {principle.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground">
                {principle.title}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
