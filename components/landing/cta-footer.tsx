"use client"

import posthog from "posthog-js"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowUpRight, Mail, MessageSquarePlus, Sparkles } from "lucide-react"

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
                href="https://github.com/bernaferrari/kotlin-reforge/issues/new?labels=app-suggestion&title=App+Suggestion:+"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-6")}
                onClick={() => posthog.capture("suggest_app_clicked", { location: "cta_section" })}
              >
                <MessageSquarePlus className="size-4" />
                Suggest an App
              </a>
              <a
                href="mailto:bernaferrari2+reforge@gmail.com"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 gap-2 px-6")}
                onClick={() => posthog.capture("contact_clicked")}
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
    <footer className="border-t border-border/70 px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <a
            href="https://bernaferrari.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Bernardo Ferrari
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Top
            <ArrowUpRight className="size-3.5 -rotate-45" />
          </a>
        </div>
      </div>
    </footer>
  )
}
