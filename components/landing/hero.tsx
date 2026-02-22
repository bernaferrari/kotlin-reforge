"use client"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Github, ArrowRight, Flame } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-44 md:pb-32">
      {/* Subtle glow effect */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
        <Badge
          variant="outline"
          className="mb-6 gap-2 border-primary/30 px-4 py-1.5 text-sm text-primary"
        >
          <Flame className="size-3.5" />
          Open-Source Initiative
        </Badge>

        <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out delay-150 fill-mode-both">
          Reforging Android&apos;s{" "}
          <span className="text-primary">open-source</span>{" "}
          foundations
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out delay-300 fill-mode-both">
          Systematically rebuilding legacy Android applications in modern
          Kotlin, Compose and Kotlin Multiplatform. Not cosmetic migration
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out delay-500 fill-mode-both">
          <a
            href="https://github.com/nickthecoder/kotlin-reforge"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "group/btn gap-2 px-8 text-base transition-all duration-300 hover:scale-105 active:scale-95 will-change-transform"
            )}
          >
            <Github className="size-5 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:rotate-6" />
            View on GitHub
          </a>
          <a
            href="#projects"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "group/btn2 gap-2 px-8 text-base transition-all duration-300 hover:bg-primary/5 hover:scale-105 active:scale-95 will-change-transform"
            )}
          >
            See the transformations
            <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn2:translate-x-1" />
          </a>
        </div>

        {/* Floating tech badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3 animate-in fade-in duration-1000 ease-out delay-700 fill-mode-both">
          {[
            "Kotlin",
            "KMP",
            "Coroutines",
            "Material 3",
            "Compose",
            "Jetpack",
          ].map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-card px-4 py-1.5 font-mono text-xs text-muted-foreground transition-colors duration-300 hover:border-primary/50 hover:text-foreground cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
