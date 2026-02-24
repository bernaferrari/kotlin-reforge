"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, X } from "lucide-react"
import posthog from "posthog-js"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ProjectData {
  name: string
  category: string
  summary: string
  repoUrl: string
  showcaseImages: string[]
  wins: string[]
}

function ProjectGallery({ images, projectName }: { images: string[]; projectName: string }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const hasMultiple = images.length > 1
  const activeImage = images[activeIndex] || images[0]

  const goPrevious = () => {
    setActiveIndex((current) => {
      const next = (current - 1 + images.length) % images.length
      posthog.capture("project_gallery_navigated", { project: projectName, direction: "previous", screenshot_index: next })
      return next
    })
  }

  const goNext = () => {
    setActiveIndex((current) => {
      const next = (current + 1) % images.length
      posthog.capture("project_gallery_navigated", { project: projectName, direction: "next", screenshot_index: next })
      return next
    })
  }

  useEffect(() => {
    if (!isDialogOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const count = images.length

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsDialogOpen(false)
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
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [hasMultiple, images.length, isDialogOpen])

  return (
    <div>
      <div className="relative border-b border-border/70 bg-muted/25 px-2 py-2 sm:px-3 sm:py-3">
        <button
          type="button"
          onClick={() => {
            setIsDialogOpen(true)
            posthog.capture("project_gallery_opened", { project: projectName })
          }}
          aria-label={`Open ${projectName} gallery`}
          className="relative mx-auto block aspect-video w-full max-w-[760px] overflow-hidden"
        >
          <Image
            src={activeImage}
            alt={`${projectName} showcase screenshot ${activeIndex + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 760px"
            className="object-contain"
          />
        </button>

        {hasMultiple && (
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 sm:px-4">
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Previous screenshot"
              className="pointer-events-auto inline-flex size-9 items-center justify-center rounded-full border border-border/90 bg-background/85 text-foreground backdrop-blur transition-colors hover:bg-background"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next screenshot"
              className="pointer-events-auto inline-flex size-9 items-center justify-center rounded-full border border-border/90 bg-background/85 text-foreground backdrop-blur transition-colors hover:bg-background"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>

      {hasMultiple && (
        <div className="px-2 py-2 sm:px-3 sm:py-3">
          <div className="mx-auto flex w-full max-w-[760px] gap-2 overflow-x-auto sm:justify-center">
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => {
                  setActiveIndex(index)
                  posthog.capture("project_gallery_navigated", { project: projectName, direction: "thumbnail", screenshot_index: index })
                }}
                aria-label={`Show screenshot ${index + 1}`}
                  className={cn(
                    "relative shrink-0 overflow-hidden border bg-card transition",
                    "size-12 rounded-md sm:size-14",
                    index === activeIndex
                      ? "border-primary shadow-[inset_0_0_0_2px_var(--color-primary)]"
                      : "border-border/80 opacity-85 hover:border-border hover:opacity-100"
                  )}
              >
                <Image
                  src={src}
                  alt={`${projectName} thumbnail ${index + 1}`}
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

      {isDialogOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${projectName} screenshot gallery`}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4 sm:p-6"
          onClick={() => setIsDialogOpen(false)}
        >
          <div
            className="w-full max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-black/60 text-white"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative border-b border-white/15 px-2 py-2 sm:px-3 sm:py-3">
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                aria-label="Close gallery"
                className="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center rounded-full border border-white/25 bg-black/45 transition-colors hover:bg-black/65"
              >
                <X className="size-4" />
              </button>

              <div className="relative mx-auto aspect-video w-full">
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
                    className="pointer-events-auto inline-flex size-10 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur transition-colors hover:bg-black/65"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next screenshot"
                    className="pointer-events-auto inline-flex size-10 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur transition-colors hover:bg-black/65"
                  >
                    <ChevronRight className="size-5" />
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
                        "size-12 rounded-md sm:size-14",
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
          </div>
        </div>
      )}
    </div>
  )
}

export function ProjectCard({
  project,
  reversed = false,
}: {
  project: ProjectData
  reversed?: boolean
}) {
  return (
    <article className="forge-panel overflow-hidden rounded-3xl">
      <div
        className={cn(
          "grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]",
          reversed && "lg:grid-cols-[1.05fr_0.95fr]"
        )}
      >
        <div className={cn("space-y-5 p-5 sm:p-7 lg:p-8", reversed && "lg:order-2")}>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">{project.category}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{project.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{project.summary}</p>
          </div>

          <ul className="space-y-2">
            {project.wins.map((win) => (
              <li key={win} className="flex items-start gap-2.5 text-sm sm:text-base">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{win}</span>
              </li>
            ))}
          </ul>

          <Link
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "h-11 w-fit gap-2 px-5")}
            onClick={() => posthog.capture("project_repo_clicked", { project: project.name, repo_url: project.repoUrl })}
          >
            Open Repository
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div
          className={cn(
            "border-t border-border/70 lg:border-t-0 lg:border-l",
            reversed && "lg:order-1 lg:border-l-0 lg:border-r"
          )}
        >
          <ProjectGallery images={project.showcaseImages} projectName={project.name} />
        </div>
      </div>
    </article>
  )
}
