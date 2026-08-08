"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import posthog from "posthog-js"
import { GitHubIcon } from "@/components/icons/github-icon"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const heroFrames = [
  { src: "/rethink/apps.png", label: "apps" },
  { src: "/rethink/stats.png", label: "stats" },
  { src: "/rethink/even-more-light.png", label: "even more light" },
  { src: "/rethink/more-light.png", label: "more light" },
  { src: "/rethink/more-dark.png", label: "more dark" },
  { src: "/rethink/home.png", label: "home" },
  { src: "/rethink/settings.png", label: "settings" },
]

type MorphMode = {
  label: string
  fromClip: string
  toClip: string
  kind: "wipe" | "diamond-shrink" | "diamond-expand"
}

const fullInsetClipPath = "inset(0% 0% 0% 0%)"
const fullPolygonClipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
const dissolveClipPath = "polygon(49.9% 49.9%, 50.1% 49.9%, 50.1% 50.1%, 49.9% 50.1%)"
const smallDiamondClipPath = "polygon(50% 49.9%, 50.1% 50%, 50% 50.1%, 49.9% 50%)"
const diamondRevealClipPath = "polygon(50% 12%, 88% 50%, 50% 88%, 12% 50%)"

const morphModes: MorphMode[] = [
  { label: "left wipe", fromClip: fullInsetClipPath, toClip: "inset(0% 100% 0% 0%)", kind: "wipe" },
  {
    label: "right wipe",
    fromClip: fullInsetClipPath,
    toClip: "inset(0% 0% 0% 100%)",
    kind: "wipe",
  },
  { label: "top wipe", fromClip: fullInsetClipPath, toClip: "inset(100% 0% 0% 0%)", kind: "wipe" },
  {
    label: "bottom wipe",
    fromClip: fullInsetClipPath,
    toClip: "inset(0% 0% 100% 0%)",
    kind: "wipe",
  },
  {
    label: "diamond",
    fromClip: fullPolygonClipPath,
    toClip: diamondRevealClipPath,
    kind: "diamond-shrink",
  },
  {
    label: "reverse diamond",
    fromClip: smallDiamondClipPath,
    toClip: fullPolygonClipPath,
    kind: "diamond-expand",
  },
]

function getRandomMorph(previous?: MorphMode): MorphMode {
  let next = morphModes[Math.floor(Math.random() * morphModes.length)]

  if (!previous) return next
  while (morphModes.length > 1 && next.label === previous.label) {
    next = morphModes[Math.floor(Math.random() * morphModes.length)]
  }

  return next
}

export function Hero() {
  const [activeFrame, setActiveFrame] = useState(0)
  const [previousFrame, setPreviousFrame] = useState<number | null>(null)
  const [activeMorph, setActiveMorph] = useState<MorphMode>(morphModes[0])
  const activeMorphRef = useRef(activeMorph)
  const [outgoingClipPath, setOutgoingClipPath] = useState(fullInsetClipPath)
  const [outgoingTransitionMs, setOutgoingTransitionMs] = useState(1400)

  const morphIntervalMs = 7000
  const morphRevealMs = 1400
  const morphDissolveMs = 800
  const revealTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dissolveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null)

  useEffect(() => {
    activeMorphRef.current = activeMorph
  }, [activeMorph])

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reducedMotion.matches) return

    const timer = window.setInterval(() => {
      setActiveFrame((current) => {
        const next = (current + 1) % heroFrames.length
        const nextMorph = getRandomMorph(activeMorphRef.current)

        setActiveMorph(nextMorph)
        setPreviousFrame(current)
        setOutgoingClipPath(nextMorph.fromClip)
        setOutgoingTransitionMs(morphRevealMs)

        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
          rafRef.current = null
        }
        if (revealTimeoutRef.current) {
          clearTimeout(revealTimeoutRef.current)
          revealTimeoutRef.current = null
        }
        if (dissolveTimeoutRef.current) {
          clearTimeout(dissolveTimeoutRef.current)
          dissolveTimeoutRef.current = null
        }

        rafRef.current = requestAnimationFrame(() => {
          setOutgoingClipPath(nextMorph.toClip)
        })

        revealTimeoutRef.current = setTimeout(() => {
          if (nextMorph.kind === "diamond-shrink") {
            setOutgoingTransitionMs(morphDissolveMs)
            setOutgoingClipPath(dissolveClipPath)
            dissolveTimeoutRef.current = setTimeout(() => {
              setPreviousFrame((value) => (value === current ? null : value))
            }, morphDissolveMs)
          } else {
            setPreviousFrame((value) => (value === current ? null : value))
          }
        }, morphRevealMs)

        return next
      })
    }, morphIntervalMs)

    const syncWithPreference = (event: MediaQueryListEvent) => {
      if (event.matches) {
        window.clearInterval(timer)
      }
    }
    reducedMotion.addEventListener("change", syncWithPreference)

    return () => {
      window.clearInterval(timer)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current)
      if (dissolveTimeoutRef.current) clearTimeout(dissolveTimeoutRef.current)
      reducedMotion.removeEventListener("change", syncWithPreference)
    }
  }, [morphDissolveMs, morphIntervalMs, morphRevealMs])

  const activeFrameData = heroFrames[activeFrame]
  const outgoingFrameData = previousFrame === null ? null : heroFrames[previousFrame]
  const outgoingTransition = `clip-path ${outgoingTransitionMs}ms cubic-bezier(0.2, 1, 0.2, 1)`

  return (
    <section className="relative overflow-hidden px-4 pt-36 pb-12 sm:px-6 sm:pt-44 sm:pb-20">
      <div
        aria-hidden
        className="forge-grid-bg pointer-events-none absolute inset-0 -z-10 opacity-[0.35] dark:opacity-25"
      />

      <div className="mx-auto max-w-5xl text-center animate-fade-up">
        <h1 className="forge-section-title mt-6 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          Rebuilding legacy Android apps
          <span className="block bg-gradient-to-r from-[#7F52FF] via-[#E94392] to-[#FF7A1A] bg-clip-text text-transparent">
            in modern Kotlin.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Breathing new life into open-source projects with Jetpack Compose, thoughtful
          architectures, and visual redesigns. This site indexes those ports — source and live demos
          live in each app&apos;s own repo.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#projects"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-10px_var(--color-primary)] transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
            onClick={() => posthog.capture("hero_explore_ports_clicked")}
          >
            Explore Ports
            <ArrowRight className="size-4" />
          </a>
          <a
            href="https://github.com/bernaferrari/kotlin-reforge"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 gap-2 px-6")}
            onClick={() => posthog.capture("hero_github_clicked")}
          >
            <GitHubIcon className="size-4" />
            Site source
          </a>
        </div>
      </div>

      <div
        className="mx-auto mt-16 max-w-6xl animate-fade-up sm:mt-20"
        style={{ animationDelay: "120ms" }}
      >
        <div className="relative aspect-[1600/1100] w-full overflow-hidden rounded-lg sm:rounded-xl">
          <Image
            key={activeFrameData.src}
            src={activeFrameData.src}
            alt={`Modernized Android app preview ${activeFrameData.label}`}
            fill
            sizes="(max-width: 1024px) 95vw, 1100px"
            priority
            className="absolute inset-0 z-0 object-cover [clip-path:inset(0%_0%_0%_0%)]"
          />

          {outgoingFrameData ? (
            <Image
              key={`${outgoingFrameData.src}-${activeFrame}`}
              src={outgoingFrameData.src}
              alt={`Transitioning Android app preview ${outgoingFrameData.label}`}
              fill
              sizes="(max-width: 1024px) 95vw, 1100px"
              className={cn("absolute inset-0 z-10 object-cover will-change-[clip-path]")}
              style={{
                clipPath: outgoingClipPath,
                transition: outgoingTransition,
              }}
            />
          ) : null}
        </div>
      </div>
    </section>
  )
}
