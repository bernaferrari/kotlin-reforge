import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Github, Star, ArrowUp } from "lucide-react"

export function CtaSection() {
  return (
    <section id="suggest" className="relative overflow-hidden bg-muted/20 py-24 md:py-32 border-t border-border">
      {/* Dynamic background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Got an app to reforge?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Whether you maintain a closed-source app that needs modernization,
          or you have an open-source app you'd love to see reforged. We are
          ready to build together. Star the repo, suggest an app, or contact me directly.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://github.com/nickthecoder/kotlin-reforge/issues/new?labels=app-suggestion&title=App+Suggestion:+"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "gap-2 px-8 text-base transition-transform duration-300 hover:scale-105 active:scale-95 will-change-transform"
            )}
          >
            Suggest an App
          </a>
          <a
            href="mailto:bernaferrari2+reforge@gmail.com"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "gap-2 px-8 text-base transition-transform duration-300 hover:scale-105 active:scale-95 will-change-transform"
            )}
          >
            Contact Me
          </a>
          <a
            href="https://github.com/nickthecoder/kotlin-reforge"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "gap-2 px-8 text-base transition-transform duration-300 hover:bg-primary/10 hover:text-primary active:scale-95 will-change-transform"
            )}
          >
            <Github className="size-5" />
            Contribute
          </a>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:px-6 md:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-4 text-primary-foreground"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-foreground">
            Kotlin Reforge
          </span>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          An open-source initiative to modernize Android infrastructure.
        </p>

        <a
          href="#"
          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Back to top"
        >
          Back to top
          <ArrowUp className="size-3" />
        </a>
      </div>
    </footer>
  )
}
