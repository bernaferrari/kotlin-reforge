import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowUpRight, Github, Mail, MessageSquarePlus, Sparkles } from "lucide-react"

export function CtaSection() {
  return (
    <section id="suggest" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/18 via-background to-accent/16 p-7 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/70 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-primary">
              <Sparkles className="size-3.5" />
              Open Collaboration
            </p>
            <h2 className="forge-section-title mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
              Help choose the next legacy app to modernize.
            </h2>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/nickthecoder/kotlin-reforge/issues/new?labels=app-suggestion&title=App+Suggestion:+"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-6")}
              >
                <MessageSquarePlus className="size-4" />
                Suggest an App
              </a>
              <a
                href="https://github.com/nickthecoder/kotlin-reforge"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 gap-2 px-6")}
              >
                <Github className="size-4" />
                Main Repo
              </a>
              <a
                href="mailto:bernaferrari2+reforge@gmail.com"
                className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "h-11 gap-2 px-6")}
              >
                <Mail className="size-4" />
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-7 text-sm sm:px-6 md:flex-row">
        <p className="text-muted-foreground">Kotlin Reforge</p>
        <p className="text-muted-foreground">Modern Kotlin ports for critical Android apps.</p>
        <a href="#" className="inline-flex min-h-11 items-center gap-1 text-muted-foreground hover:text-foreground">
          Top
          <ArrowUpRight className="size-3.5 -rotate-45" />
        </a>
      </div>
    </footer>
  )
}
