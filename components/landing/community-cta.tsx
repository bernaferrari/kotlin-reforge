"use client"

import posthog from "posthog-js"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MessageSquarePlus, Heart, Send, Smartphone } from "lucide-react"

const avenues = [
  {
    icon: <Smartphone className="size-5 text-primary" />,
    title: "Suggest an open-source app",
    description:
      "Is there an Android app you love that deserves a modern Kotlin rewrite? Open an issue and let us know.",
  },
  {
    icon: <Send className="size-5 text-primary" />,
    title: "Submit your own app",
    description:
      "You maintain an app (even closed-source!) and want help modernizing it? Reach out. We are here to help.",
  },
  {
    icon: <Heart className="size-5 text-primary" />,
    title: "Contribute code",
    description:
      "Pick any active reforge project and submit a PR. Every contribution counts, no matter the size.",
  },
]

export function CommunityCta() {
  return (
    <section
      id="suggest"
      className="relative overflow-hidden border-y border-border bg-muted/30 py-20 md:py-32"
    >
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/3 h-[300px] w-[600px] -translate-y-1/2 rounded-full bg-primary/[0.03] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 font-mono text-sm font-medium uppercase tracking-widest text-primary">
            Open Call
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Got an app that needs reforging?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Whether you love an open-source app and wish it got modernized, or
            you maintain one and want help bringing it up to date &mdash;
            this initiative is for you. All suggestions welcome,
            all skill levels appreciated.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {avenues.map((avenue) => (
            <div
              key={avenue.title}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 sm:gap-4 sm:p-6"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                {avenue.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {avenue.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {avenue.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://github.com/bernaferrari/kotlin-reforge/issues/new?labels=app-suggestion&title=App+Suggestion:+"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "gap-2 px-8 text-base")}
            onClick={() => posthog.capture("suggest_app_clicked", { location: "community_cta" })}
          >
            <MessageSquarePlus className="size-5" />
            Suggest an App
          </a>
          <a
            href="https://github.com/bernaferrari/kotlin-reforge/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2 px-8 text-base")}
            onClick={() => posthog.capture("start_discussion_clicked")}
          >
            Start a Discussion
          </a>
        </div>
      </div>
    </section>
  )
}
