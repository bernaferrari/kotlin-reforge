"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowDown } from "lucide-react"
import posthog from "posthog-js"
import { apps, iconSrc, imageSrc } from "@/lib/apps"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const advanceMs = 5000
const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"]

export function Hero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setTimeout(() => setActive((i) => (i + 1) % apps.length), advanceMs)
    return () => window.clearTimeout(timer)
  }, [active, paused])

  const rebuilt = apps.filter((app) => app.origin).length

  return (
    <section className="relative overflow-hidden px-4 pt-32 pb-12 sm:px-6 sm:pt-40 sm:pb-20">
      <div
        aria-hidden
        className="forge-grid-bg pointer-events-none absolute inset-0 -z-10 opacity-[0.35] dark:opacity-25"
      />

      <div className="mx-auto max-w-4xl text-center animate-fade-up">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-border/60 bg-card/60 py-1.5 pr-4 pl-1.5 backdrop-blur sm:gap-3">
          <span className="flex -space-x-2.5 sm:-space-x-2">
            {apps.map((app) => (
              <Image
                key={app.slug}
                src={iconSrc(app)}
                alt=""
                width={28}
                height={28}
                className="size-6 rounded-[8px] ring-2 ring-background sm:size-7 sm:rounded-[9px]"
              />
            ))}
          </span>
          <span className="whitespace-nowrap text-[13px] text-muted-foreground sm:text-sm">
            {apps.length} free, open-source apps
          </span>
        </div>

        <h1 className="forge-section-title mt-7 text-4xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
          Old Android apps,
          <span className="block bg-gradient-to-r from-[#7F52FF] via-[#E94392] to-[#FF7A1A] bg-clip-text pb-1 text-transparent">
            rebuilt to feel new.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {words[rebuilt]} well-loved open-source apps, rewritten in Kotlin and redesigned screen by
          screen, plus {words[apps.length - rebuilt].toLowerCase()} new ones made the same way. Many
          now run on iPhone, desktop and in the browser too.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#apps"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 gap-2 px-6 shadow-[0_10px_30px_-10px_var(--color-primary)]",
            )}
            onClick={() => posthog.capture("hero_explore_ports_clicked")}
          >
            See the apps
            <ArrowDown className="size-4" />
          </a>
          <a
            href="#suggest"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-6")}
            onClick={() => posthog.capture("hero_suggest_clicked")}
          >
            Suggest the next one
          </a>
        </div>
      </div>

      <div
        className="mx-auto mt-14 max-w-6xl animate-fade-up sm:mt-20"
        style={{ animationDelay: "60ms" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          role="tablist"
          aria-label="Apps"
          className="mx-auto mb-5 flex max-w-full gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] sm:justify-center"
        >
          {apps.map((app, index) => (
            <button
              key={app.slug}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls="hero-showcase"
              onClick={() => {
                setActive(index)
                posthog.capture("hero_app_selected", { project: app.name })
              }}
              className={cn(
                "relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full border py-1.5 pr-3.5 pl-1.5 text-sm font-medium transition-colors",
                index === active
                  ? "border-primary/50 bg-primary/10 text-foreground"
                  : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground",
              )}
            >
              <Image
                src={iconSrc(app)}
                alt=""
                width={24}
                height={24}
                className="size-6 rounded-[7px]"
              />
              {app.name}
              {index === active && !paused ? (
                <span
                  key={active}
                  aria-hidden
                  className="forge-progress absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary/70"
                  style={{ animationDuration: `${advanceMs}ms` }}
                />
              ) : null}
            </button>
          ))}
        </div>

        <a
          id="hero-showcase"
          role="tabpanel"
          href={`#${apps[active].slug}`}
          aria-label={`${apps[active].name}: ${apps[active].tagline} Jump to details`}
          className="forge-hero-frame relative block aspect-[40/21] w-full overflow-hidden rounded-xl sm:rounded-2xl"
        >
          {apps.map((app, index) => {
            const image = app.images[0]
            return (
              <div
                key={app.slug}
                aria-hidden={index !== active}
                className={cn(
                  "absolute inset-0 transition-opacity duration-[380ms] ease-out",
                  index === active ? "opacity-100" : "opacity-0",
                )}
                style={{ background: image.backdrop }}
              >
                <Image
                  src={imageSrc(app, image.file)}
                  alt={index === active ? image.alt : ""}
                  fill
                  sizes="(max-width: 1200px) 95vw, 1152px"
                  priority={index === 0}
                  className="object-contain"
                />
              </div>
            )
          })}
        </a>
      </div>
    </section>
  )
}
