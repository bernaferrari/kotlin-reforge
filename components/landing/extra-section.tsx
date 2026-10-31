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
  /** Shown beside the name, like the app cards. */
  icon?: string
  image: { src: string; alt: string; fill?: boolean }
}

const libraries: Library[] = [
  {
    name: "KMPwright",
    summary:
      "Browser automation for Kotlin Multiplatform. Write a workflow once and run it in Android WebView, iOS WKWebView or Chromium, or hand the same browser to an AI agent.",
    demo: { label: "Read the docs", url: "https://kmpwright.vercel.app" },
    repoUrl: "https://github.com/bernaferrari/kmpwright",
    icon: "/kmpwright/icon.png",
    image: {
      src: "/kmpwright/header.webp",
      alt: "One Kotlin workflow, the same finished sign-up form on an Android phone, an iPad and an iPhone",
      fill: true,
    },
  },
  {
    name: "Diagonal Wipe Icon",
    summary:
      "A small animation that swaps one icon for another with a diagonal wipe, like on iPhone. One file you can drop into any Compose Multiplatform app.",
    demo: {
      label: "Try it in your browser",
      url: "https://bernaferrari.github.io/diagonal-wipe-icon/",
    },
    repoUrl: "https://github.com/bernaferrari/diagonal-wipe-icon",
    image: {
      src: "https://raw.githubusercontent.com/bernaferrari/diagonal-wipe-icon/main/assets/animated-icons.webp",
      alt: "Icons switching with a diagonal wipe",
    },
  },
]

export function ExtraSection() {
  return (
    <div id="extra" className="space-y-6 pt-2 sm:space-y-8">
      {libraries.map((library) => (
        <LibraryPanel key={library.name} library={library} />
      ))}
    </div>
  )
}

function LibraryPanel({ library }: { library: Library }) {
  return (
    <article className="forge-panel overflow-hidden rounded-3xl">
      <div className="grid items-stretch gap-0 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
          <div>
            <div className="flex items-center gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                For developers
              </p>
              <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            </div>
            <div className="mt-5 flex items-center gap-4">
              {library.icon && (
                <Image
                  src={library.icon}
                  alt=""
                  width={56}
                  height={56}
                  className="size-12 shrink-0 rounded-[14px] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.5)] sm:size-14 sm:rounded-[16px]"
                />
              )}
              <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">{library.name}</h3>
            </div>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {library.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={library.demo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-5")}
              onClick={() => posthog.capture("extra_demo_clicked", { project: library.name })}
            >
              {library.demo.label}
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              href={library.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 gap-2 px-5")}
              onClick={() => posthog.capture("extra_repo_clicked", { project: library.name })}
            >
              <GitHubIcon className="size-4" />
              Source
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center border-t border-border/60 bg-gradient-to-br from-muted/40 via-transparent to-muted/20 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-xl border border-border/60 bg-background/40",
              library.image.fill ? "aspect-[40/21]" : "aspect-video",
            )}
          >
            <Image
              src={library.image.src}
              alt={library.image.alt}
              fill
              className={library.image.fill ? "object-cover" : "object-contain p-4"}
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
  )
}
