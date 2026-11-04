const steps = [
  {
    title: "Keep what people love",
    description:
      "Start from how the app is really used. The features people count on stay, and nothing important gets cut to make it look tidy.",
    detail: "Same features",
  },
  {
    title: "Rewrite the inside",
    description:
      "The code moves to Kotlin with one shared codebase, so the same app can also run on iPhone, desktop and the web.",
    detail: "Kotlin Multiplatform",
  },
  {
    title: "Redesign every screen",
    description:
      "A modern Android look, plain words, dark mode, your wallpaper's colors, and layouts that use a tablet's extra room.",
    detail: "Material 3 · Dark mode · Tablets",
  },
  {
    title: "Show the result",
    description:
      "Real screenshots of the real app, before-and-after pictures for every rebuild, and the code on GitHub.",
    detail: "Open source",
  },
]

export function ApproachSection() {
  return (
    <section id="approach" className="relative scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <header className="lg:sticky lg:top-32 lg:self-start">
          <p className="forge-eyebrow">How it works</p>
          <h2 className="forge-section-title mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
            One recipe, every app.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every app goes through the same four steps, whether it is ten years old or brand new.
          </p>
        </header>

        <ol className="border-t border-border/70">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-b border-border/70 py-7 sm:grid-cols-[4rem_minmax(0,1fr)] sm:py-9"
            >
              <span className="pt-1.5 font-mono text-[13px] tabular-nums text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{step.title}</h3>
                <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                  {step.description}
                </p>
                <p className="mt-4 font-mono text-xs text-foreground/70">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
