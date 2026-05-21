"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Check, ChevronLeft, ChevronRight } from "lucide-react"
import posthog from "posthog-js"
import { GitHubIcon } from "@/components/icons/github-icon"
import { buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export interface ProjectData {
  name: string
  category: string
  summary: string
  repoUrl: string
  stack?: string[]
  showcaseImages: string[]
  wins: string[]
  comparisonImages?: {
    before: string[]
    after: string[]
  }
}

function GalleryStage({
  images,
  projectName,
}: {
  images: string[]
  projectName: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const hasMultiple = images.length > 1
  const activeImage = images[activeIndex] || images[0]

  const goPrevious = () => {
    setActiveIndex((current) => {
      const next = (current - 1 + images.length) % images.length
      posthog.capture("project_gallery_navigated", {
        project: projectName,
        direction: "previous",
        screenshot_index: next,
      })
      return next
    })
  }

  const goNext = () => {
    setActiveIndex((current) => {
      const next = (current + 1) % images.length
      posthog.capture("project_gallery_navigated", {
        project: projectName,
        direction: "next",
        screenshot_index: next,
      })
      return next
    })
  }

  useEffect(() => {
    if (!isDialogOpen) return
    const count = images.length

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!hasMultiple) return
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        setActiveIndex((current) => (current - 1 + count) % count)
      }
      if (event.key === "ArrowRight") {
        event.preventDefault()
        setActiveIndex((current) => (current + 1) % count)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [hasMultiple, images.length, isDialogOpen])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 40%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 70%)",
          }}
        />

        <div className="relative px-4 pt-6 pb-4 sm:px-8 sm:pt-8 sm:pb-5">
          <DialogTrigger
            render={
              <button
                type="button"
                aria-label={`Open ${projectName} gallery`}
                className="group relative mx-auto block aspect-[16/11] w-full max-w-[920px] overflow-hidden rounded-xl"
                onClick={() => posthog.capture("project_gallery_opened", { project: projectName })}
              />
            }
          >
            <Image
              src={activeImage}
              alt={`${projectName} showcase ${activeIndex + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 920px"
              className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
            />
          </DialogTrigger>

          {hasMultiple && (
            <>
              <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-2 sm:flex sm:px-4">
                <button
                  type="button"
                  onClick={goPrevious}
                  aria-label="Previous screenshot"
                  className="pointer-events-auto inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground backdrop-blur transition-colors duration-200 ease-out hover:border-primary/60 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_24px_-6px_var(--color-primary)]"
                >
                  <ChevronLeft className="size-4 -translate-x-px" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next screenshot"
                  className="pointer-events-auto inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground backdrop-blur transition-colors duration-200 ease-out hover:border-primary/60 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_24px_-6px_var(--color-primary)]"
                >
                  <ChevronRight className="size-4 translate-x-px" />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-1.5">
                {images.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => {
                      setActiveIndex(index)
                      posthog.capture("project_gallery_navigated", {
                        project: projectName,
                        direction: "indicator",
                        screenshot_index: index,
                      })
                    }}
                    aria-label={`Show screenshot ${index + 1}`}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      index === activeIndex
                        ? "w-6 bg-primary shadow-[0_0_10px_0_var(--color-primary)]"
                        : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <DialogContent className="max-w-[calc(100%-2rem)] gap-0 overflow-hidden bg-black/80 p-0 text-white sm:max-w-6xl">
        <DialogTitle className="sr-only">{projectName} screenshot gallery</DialogTitle>
        <div className="relative border-b border-white/15 px-2 py-2 sm:px-3 sm:py-3">
          <div className="relative mx-auto aspect-[16/11] w-full overflow-hidden">
            <Image
              key={`dialog-${activeImage}`}
              src={activeImage}
              alt={`${projectName} gallery screenshot ${activeIndex + 1}`}
              fill
              sizes="(max-width: 1280px) 95vw, 1200px"
              className="object-contain"
            />
          </div>

          {hasMultiple && (
            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 sm:px-4">
              <button
                type="button"
                onClick={goPrevious}
                aria-label="Previous screenshot"
                className="pointer-events-auto inline-flex size-10 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur transition-colors duration-200 ease-out hover:border-primary/60 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_24px_-6px_var(--color-primary)]"
              >
                <ChevronLeft className="size-5 -translate-x-px" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next screenshot"
                className="pointer-events-auto inline-flex size-10 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur transition-colors duration-200 ease-out hover:border-primary/60 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_24px_-6px_var(--color-primary)]"
              >
                <ChevronRight className="size-5 translate-x-px" />
              </button>
            </div>
          )}
        </div>

        {hasMultiple && (
          <div className="px-2 py-2 sm:px-3 sm:py-3">
            <div className="mx-auto flex w-full max-w-[900px] gap-2 overflow-x-auto sm:justify-center">
              {images.map((src, index) => (
                <button
                  key={`dialog-${src}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show screenshot ${index + 1}`}
                  className={cn(
                    "relative shrink-0 overflow-hidden border transition",
                    "size-12 rounded-sm sm:size-14",
                    index === activeIndex
                      ? "border-primary shadow-[inset_0_0_0_2px_var(--color-primary)]"
                      : "border-white/20 opacity-80 hover:border-white/40 hover:opacity-100"
                  )}
                >
                  <Image
                    src={src}
                    alt={`${projectName} lightbox thumbnail ${index + 1}`}
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                  {index === activeIndex && (
                    <span className="pointer-events-none absolute right-1 top-1 inline-flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                      <Check className="size-2.5" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function ProjectCard({
  project,
  reversed: _reversed = false,
  index = 0,
}: {
  project: ProjectData
  reversed?: boolean
  index?: number
}) {
  const indexLabel = String(index + 1).padStart(2, "0")

  return (
    <article className="forge-panel group/card relative overflow-hidden rounded-2xl transition-all duration-500 hover:border-primary/30 hover:shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--primary)_40%,transparent)]">
      <header className="flex items-center justify-between gap-4 border-b border-border/40 p-3.5 sm:p-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-mono text-[11px] tabular-nums text-muted-foreground/80">
            {indexLabel}
          </span>
          <span className="h-3 w-px bg-border/80" />
          <h3 className="truncate text-base font-semibold tracking-tight sm:text-lg">
            {project.name}
          </h3>
          <span className="hidden sm:inline-flex items-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="mx-2 size-1 rounded-full bg-muted-foreground/40" />
            {project.category}
          </span>
        </div>

        <Link
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.name} repository on GitHub`}
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-9 shrink-0 gap-1.5 px-3.5 text-[13px]"
          )}
          onClick={() =>
            posthog.capture("project_repo_clicked", {
              project: project.name,
              repo_url: project.repoUrl,
              location: "card_header",
            })
          }
        >
          <GitHubIcon className="size-3.5" />
          <span className="hidden sm:inline">Source</span>
          <ArrowUpRight className="size-3.5" />
        </Link>
      </header>

      <GalleryStage images={project.showcaseImages} projectName={project.name} />
    </article>
  )
}
