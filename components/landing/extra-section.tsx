"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import posthog from "posthog-js"
import { GitHubIcon } from "@/components/icons/github-icon"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ExtraSection() {
  return (
    <div id="extra" className="pt-2">
      <article className="forge-panel overflow-hidden rounded-3xl">
        <div className="grid items-stretch gap-0 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground/80">EX</span>
                <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                  Library
                </p>
              </div>
              <h3 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                Diagonal Wipe Icon
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                A single-file icon transition component for Compose Multiplatform. Built to emulate
                iOS-style wipe animations using two icons and a mask.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="https://bernaferrari.github.io/diagonal-wipe-icon/"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-5")}
                onClick={() =>
                  posthog.capture("extra_demo_clicked", { project: "Diagonal Wipe Icon" })
                }
              >
                Live Demo
                <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href="https://github.com/bernaferrari/diagonal-wipe-icon"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 gap-2 px-5",
                )}
                onClick={() =>
                  posthog.capture("extra_repo_clicked", { project: "Diagonal Wipe Icon" })
                }
              >
                <GitHubIcon className="size-4" />
                GitHub Repo
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center border-t border-border/60 bg-gradient-to-br from-muted/40 via-transparent to-muted/20 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/60 bg-background/40">
              <Image
                src="https://raw.githubusercontent.com/bernaferrari/diagonal-wipe-icon/main/assets/animated-icons.webp"
                alt="Diagonal Wipe Icon Animation"
                fill
                className="object-contain p-4"
                unoptimized
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5"
              />
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
