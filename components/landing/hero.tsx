"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight, Github } from "lucide-react"
import posthog from "posthog-js"
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
  { label: "right wipe", fromClip: fullInsetClipPath, toClip: "inset(0% 0% 0% 100%)", kind: "wipe" },
  { label: "top wipe", fromClip: fullInsetClipPath, toClip: "inset(100% 0% 0% 0%)", kind: "wipe" },
  { label: "bottom wipe", fromClip: fullInsetClipPath, toClip: "inset(0% 0% 100% 0%)", kind: "wipe" },
  { label: "diamond", fromClip: fullPolygonClipPath, toClip: diamondRevealClipPath, kind: "diamond-shrink" },
  { label: "reverse diamond", fromClip: smallDiamondClipPath, toClip: fullPolygonClipPath, kind: "diamond-expand" },
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
    <section className="px-4 pt-36 pb-16 sm:px-6 sm:pt-44 sm:pb-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="animate-fade-up">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Kotlin Reforge</p>
          <h1 className="forge-section-title mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
            Rebuilding legacy Android apps in modern Kotlin.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Different migration paths for different codebases: Java to Kotlin ports for some, Kotlin UI to Compose for others.
            Every app gets a full redesign.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://github.com/bernaferrari/kotlin-reforge"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-6")}
              onClick={() => posthog.capture("hero_cta_clicked", { destination: "github" })}
            >
              <Github className="size-4" />
              View Initiative
            </a>
            <a
              href="#projects"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 gap-2 px-6")}
              onClick={() => posthog.capture("hero_explore_ports_clicked")}
            >
              Explore Ports
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>

        <div className="forge-panel overflow-hidden rounded-3xl animate-fade-up" style={{ animationDelay: "90ms" }}>
          <div className="relative aspect-[1600/1100] w-full">
            <Image
              key={activeFrameData.src}
              src={activeFrameData.src}
              alt={`Modernized Android app preview ${activeFrameData.label}`}
              fill
              sizes="(max-width: 1024px) 95vw, 520px"
              priority
              className="absolute inset-0 z-0 object-cover [clip-path:inset(0%_0%_0%_0%)]"
            />

            {outgoingFrameData ? (
              <Image
                key={`${outgoingFrameData.src}-${activeFrame}`}
                src={outgoingFrameData.src}
                alt={`Transitioning Android app preview ${outgoingFrameData.label}`}
                fill
                sizes="(max-width: 1024px) 95vw, 520px"
                className={cn("absolute inset-0 z-10 object-cover will-change-[clip-path]")}
                style={{
                  clipPath: outgoingClipPath,
                  transition: outgoingTransition,
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
