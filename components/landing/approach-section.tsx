import { Code2, Heart, Images, Palette } from "lucide-react"

const steps = [
  {
    icon: Heart,
    title: "Keep what people love",
    description:
      "Start from how the app is really used. The features people count on stay, and nothing important gets cut to make it look tidy.",
  },
  {
    icon: Code2,
    title: "Rewrite the inside",
    description:
      "The code moves to Kotlin with one shared codebase, so the same app can also run on iPhone, desktop and the web.",
  },
  {
    icon: Palette,
    title: "Redesign every screen",
    description:
      "A modern Android look, plain words, dark mode, your wallpaper's colors, and layouts that use a tablet's extra room.",
  },
  {
    icon: Images,
    title: "Show the result",
    description:
      "Real screenshots of the real app, before-and-after pictures for every rebuild, and the code on GitHub.",
  },
]

export function ApproachSection() {
  return (
    <section id="approach" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 max-w-3xl sm:mb-16">
          <p className="forge-eyebrow forge-eyebrow-dot inline-flex items-center">How it works</p>
          <h2 className="forge-section-title mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
            One recipe, every app.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every app goes through the same four steps, whether it is ten years old or brand new.
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            const stepNumber = String(index + 1).padStart(2, "0")

            return (
              <article
                key={step.title}
                className="forge-panel group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30"
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
