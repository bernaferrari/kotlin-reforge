"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import posthog from "posthog-js"
import { GitHubIcon } from "@/components/icons/github-icon"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Library {
  name: string
  summary: string
  demo: { label: string; url: string }
  repoUrl: string
  icon: string
  /** fill: cover the frame; otherwise the picture sits inside it on its own background colour. */
  image: { src: string; alt: string; fill?: boolean; background?: string }
}

/** The tool every app above made its store art with: the wide card. */
const featured: Library = {
  name: "Screenshot Studio",
  summary:
    "Turns real captures of an app into Google Play and App Store screenshots and README art, in every language, checked like a reviewer would. Every app above makes its store art with it, and Claude can too.",
  demo: { label: "Try it on npm", url: "https://www.npmjs.com/package/screenshot-studio" },
  repoUrl: "https://github.com/bernaferrari/screenshot-studio",
  icon: "/screenshot-studio/icon.png",
  image: {
    src: "/screenshot-studio/header.webp",
    alt: "Plain screenshots of Calcula made into a checked Google Play set, and the same card in German, Chinese and Japanese",
    fill: true,
  },
}

const libraries: Library[] = [
  {
    name: "KMPwright",
    summary:
      "Browser automation for Kotlin Multiplatform. One workflow runs in Android WebView, iOS WKWebView or Chromium, or in the hands of an AI agent.",
    demo: { label: "Read the docs", url: "https://kmpwright.vercel.app" },
    repoUrl: "https://github.com/bernaferrari/kmpwright",
    icon: "/kmpwright/icon.png",
    image: {
      src: "/kmpwright/card.webp",
      alt: "Six lines of Kotlin on the left fill in and submit the sign-up form on the right, ending on its welcome message",
      fill: true,
    },
  },
  {
    name: "Diagonal Wipe Icon",
    summary:
      "Swaps one icon for another with a diagonal wipe, like on iPhone. One file you can drop into any Compose Multiplatform app.",
    demo: { label: "Try it in your browser", url: "https://bernaferrari.github.io/diagonal-wipe-icon/" },
    repoUrl: "https://github.com/bernaferrari/diagonal-wipe-icon",
    icon: "/diagonal-wipe-icon/icon.png",
    image: {
      src: "https://raw.githubusercontent.com/bernaferrari/diagonal-wipe-icon/main/assets/animated-icons.webp",
      alt: "Icons switching with a diagonal wipe",
      background: "#fcf3f2",
    },
  },
]

export function ExtraSection() {
  return (
    <section id="extra" className="scroll-mt-20 pt-14 sm:pt-20">
      <header className="mb-8 max-w-3xl sm:mb-10">
        <p className="forge-eyebrow forge-eyebrow-dot inline-flex items-center">For developers</p>
        <h3 className="forge-section-title mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
          The tools behind these apps.
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Made while rebuilding them, and open source like everything here.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <FeaturedCard library={featured} />
        {libraries.map((library) => (
          <LibraryCard key={library.name} library={library} />
        ))}
      </div>
    </section>
  )
}

function Title({ library, size }: { library: Library; size: "lg" | "md" }) {
  return (
    <div className="flex items-center gap-3.5">
      <Image
        src={library.icon}
        alt=""
        width={56}
        height={56}
        className={cn(
          "shrink-0 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.5)]",
          size === "lg" ? "size-12 rounded-[14px] sm:size-14 sm:rounded-[16px]" : "size-10 rounded-[12px]",
        )}
      />
      <h4 className={cn("font-semibold tracking-tight", size === "lg" ? "text-3xl sm:text-4xl" : "text-2xl")}>
        {library.name}
      </h4>
    </div>
  )
}

function Actions({ library }: { library: Library }) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={library.demo.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ size: "lg" }), "h-10 gap-2 px-4")}
        onClick={() => posthog.capture("extra_demo_clicked", { project: library.name })}
      >
        {library.demo.label}
        <ArrowUpRight className="size-4" />
      </Link>
      <Link
        href={library.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${library.name} source on GitHub`}
        title="Source on GitHub"
        className={cn(buttonVariants({ variant: "outline", size: "icon" }), "size-10")}
        onClick={() => posthog.capture("extra_repo_clicked", { project: library.name })}
      >
        <GitHubIcon className="size-4" />
      </Link>
    </div>
  )
}

function Picture({ library, className }: { library: Library; className?: string }) {
  return (
    <div
      className={cn("relative w-full overflow-hidden rounded-xl border border-border/60 bg-background/40 aspect-[40/21]", className)}
      style={library.image.background ? { background: library.image.background } : undefined}
    >
      <Image
        src={library.image.src}
        alt={library.image.alt}
        fill
        className={library.image.fill ? "object-cover" : "object-contain px-5"}
        unoptimized
      />
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5" />
    </div>
  )
}

/** Screenshot Studio: text beside its picture, across the whole grid. */
function FeaturedCard({ library }: { library: Library }) {
  return (
    <article className="forge-panel overflow-hidden rounded-3xl md:col-span-2">
      <div className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10 lg:p-10">
        <div className="flex flex-col gap-6">
          <Title library={library} size="lg" />
          <p className="text-base leading-relaxed text-muted-foreground">{library.summary}</p>
          <Actions library={library} />
        </div>
        <Picture library={library} className="order-first lg:order-none" />
      </div>
    </article>
  )
}

/** A smaller tool: its picture on top, then what it is. */
function LibraryCard({ library }: { library: Library }) {
  return (
    <article className="forge-panel flex flex-col overflow-hidden rounded-3xl">
      <div className="bg-gradient-to-br from-muted/40 via-transparent to-muted/20 p-4 sm:p-5">
        <Picture library={library} />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 pt-5 sm:p-8 sm:pt-6">
        <Title library={library} size="md" />
        <p className="flex-1 text-base leading-relaxed text-muted-foreground">{library.summary}</p>
        <Actions library={library} />
      </div>
    </article>
  )
}
