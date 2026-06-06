"use client"

import posthog from "posthog-js"
import { GitHubIcon } from "@/components/icons/github-icon"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowUpRight, Mail, MessageSquarePlus, Sparkles } from "lucide-react"

export function CtaSection() {
  return (
    <section id="suggest" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.12] via-background to-accent/[0.10] p-8 sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <div
            aria-hidden
            className="forge-grid-bg pointer-events-none absolute inset-0 opacity-30 dark:opacity-20"
          />

          <div className="relative max-w-3xl">
            <p className="forge-eyebrow forge-eyebrow-dot inline-flex items-center">
              <Sparkles className="ml-0 mr-2 size-3.5" />
              Open Collaboration
            </p>
            <h2 className="forge-section-title mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
              Help choose the next legacy app to modernize.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Suggest an open-source Android project you'd like to see rebuilt in modern Kotlin. The
              most compelling ideas get queued up next.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/bernaferrari/kotlin-reforge/issues/new?labels=app-suggestion&title=App+Suggestion:+"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 gap-2 px-6 shadow-[0_10px_30px_-10px_var(--color-primary)]",
                )}
                onClick={() => posthog.capture("suggest_app_clicked", { location: "cta_section" })}
              >
                <MessageSquarePlus className="size-4" />
                Suggest an App
              </a>
              <a
                href="mailto:bernaferrari2+reforge@gmail.com"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 gap-2 px-6",
                )}
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
    <footer className="border-t border-border/60 px-4 pt-10 pb-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Crafted by</span>
          <a
            href="https://bernaferrari.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground/90 underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Bernardo Ferrari
          </a>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <a
            href="https://github.com/bernaferrari/kotlin-reforge"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <GitHubIcon className="size-4" />
            GitHub
          </a>
          <span className="text-border">/</span>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Back to top
            <ArrowUpRight className="size-3.5 -rotate-45" />
          </a>
        </div>
      </div>
    </footer>
  )
}
