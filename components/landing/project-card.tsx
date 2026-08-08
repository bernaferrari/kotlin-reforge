"use client"

import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react"
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
  demoUrl?: string
  showcaseImages: string[]
}

function GalleryStage({ images, projectName }: { images: string[]; projectName: string }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const dragStateRef = useRef<{
    x: number
    y: number
    width: number
    suppressClick: boolean
  } | null>(null)
  const suppressOpenRef = useRef(false)

  const hasMultiple = images.length > 1

  const selectImage = (
    index: number,
    direction: "previous" | "next" | "indicator" | "keyboard",
  ) => {
    setActiveIndex(index)
    posthog.capture("project_gallery_navigated", {
      project: projectName,
      direction,
      screenshot_index: index,
    })
  }

  const goPrevious = () => {
    const next = (activeIndex - 1 + images.length) % images.length
    selectImage(next, "previous")
  }

  const goNext = () => {
    const next = (activeIndex + 1) % images.length
    selectImage(next, "next")
  }

  const handleDragStart = (
    event: PointerEvent<HTMLElement>,
    options: { suppressClick?: boolean } = {},
  ) => {
    if (!hasMultiple) return
    if (event.pointerType === "mouse" && event.button !== 0) return

    dragStateRef.current = {
      x: event.clientX,
      y: event.clientY,
      width: event.currentTarget.clientWidth,
      suppressClick: Boolean(options.suppressClick),
    }
    setDragOffset(0)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handleDragMove = (event: PointerEvent<HTMLElement>) => {
    if (!hasMultiple || !dragStateRef.current) return

    const deltaX = event.clientX - dragStateRef.current.x
    const deltaY = event.clientY - dragStateRef.current.y

    if (Math.abs(deltaX) < 8 && Math.abs(deltaY) > Math.abs(deltaX)) return

    const maxOffset = dragStateRef.current.width * 0.38
    setDragOffset(Math.max(-maxOffset, Math.min(maxOffset, deltaX)))
  }

  const handleDragEnd = (event: PointerEvent<HTMLElement>) => {
    if (!hasMultiple || !dragStateRef.current) return

    const deltaX = event.clientX - dragStateRef.current.x
    const deltaY = event.clientY - dragStateRef.current.y
    const threshold = Math.min(96, dragStateRef.current.width * 0.18)
    const shouldSuppressClick = dragStateRef.current.suppressClick && Math.abs(deltaX) > 8
    dragStateRef.current = null
    setDragOffset(0)

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    if (shouldSuppressClick) {
      suppressOpenRef.current = true
      window.setTimeout(() => {
        suppressOpenRef.current = false
      }, 120)
    }

    if (Math.abs(deltaX) < threshold || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return

    if (deltaX < 0) {
      goNext()
    } else {
      goPrevious()
    }
  }

  const handleDragCancel = (event: PointerEvent<HTMLElement>) => {
    if (!dragStateRef.current) return

    const shouldSuppressClick = dragStateRef.current.suppressClick && Math.abs(dragOffset) > 8
    dragStateRef.current = null
    setDragOffset(0)

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    if (shouldSuppressClick) {
      suppressOpenRef.current = true
      window.setTimeout(() => {
        suppressOpenRef.current = false
      }, 120)
    }
  }

  const handlePreviewClickCapture = (event: MouseEvent<HTMLButtonElement>) => {
    if (!suppressOpenRef.current) return

    event.preventDefault()
    event.stopPropagation()
  }

  const trackStyle = {
    transform: `translate3d(calc(${-activeIndex * 100}% + ${dragOffset}px), 0, 0)`,
  }

  useEffect(() => {
    if (!isDialogOpen) return
    const count = images.length

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!hasMultiple) return
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        const next = (activeIndex - 1 + count) % count
        selectImage(next, "keyboard")
      }
      if (event.key === "ArrowRight") {
        event.preventDefault()
        const next = (activeIndex + 1) % count
        selectImage(next, "keyboard")
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeIndex, hasMultiple, images.length, isDialogOpen])

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
                onClickCapture={handlePreviewClickCapture}
                onClick={() => posthog.capture("project_gallery_opened", { project: projectName })}
                onPointerDown={(event) => handleDragStart(event, { suppressClick: true })}
                onPointerMove={handleDragMove}
                onPointerUp={handleDragEnd}
                onPointerCancel={handleDragCancel}
              />
            }
          >
            <div
              className={cn(
                "flex h-full touch-pan-y will-change-transform",
                dragStateRef.current
                  ? "transition-none"
                  : "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
              )}
              style={trackStyle}
            >
              {images.map((src, index) => (
                <div key={`preview-${src}`} className="relative h-full min-w-full">
                  <Image
                    src={src}
                    alt={index === activeIndex ? `${projectName} showcase ${index + 1}` : ""}
                    fill
                    sizes="(max-width: 1024px) 100vw, 920px"
                    priority={index === 0}
                    loading={index === 0 ? undefined : "eager"}
                    aria-hidden={index !== activeIndex}
                    draggable={false}
                    className="object-contain transition-transform duration-300 ease-out group-hover:scale-[1.015]"
                  />
                </div>
              ))}
            </div>
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
                      selectImage(index, "indicator")
                    }}
                    aria-label={`Show screenshot ${index + 1}`}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      index === activeIndex
                        ? "w-6 bg-primary shadow-[0_0_10px_0_var(--color-primary)]"
                        : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60",
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
            <div
              className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
              onPointerDown={handleDragStart}
              onPointerMove={handleDragMove}
              onPointerUp={handleDragEnd}
              onPointerCancel={handleDragCancel}
            >
              <div
                className={cn(
                  "flex h-full will-change-transform",
                  dragStateRef.current
                    ? "transition-none"
                    : "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                )}
                style={trackStyle}
              >
                {images.map((src, index) => (
                  <div key={`dialog-${src}`} className="relative h-full min-w-full">
                    <Image
                      src={src}
                      alt={
                        index === activeIndex
                          ? `${projectName} gallery screenshot ${index + 1}`
                          : ""
                      }
                      fill
                      sizes="(max-width: 1280px) 95vw, 1200px"
                      priority={index === 0}
                      loading={index === 0 ? undefined : "eager"}
                      aria-hidden={index !== activeIndex}
                      draggable={false}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
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
          <div className="min-w-0 overflow-hidden px-2 py-2 sm:px-3 sm:py-3">
            <div className="mx-auto flex w-full max-w-[900px] min-w-0 gap-2 overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] sm:justify-center">
              {images.map((src, index) => (
                <button
                  key={`dialog-${src}`}
                  type="button"
                  onClick={() => selectImage(index, "indicator")}
                  aria-label={`Show screenshot ${index + 1}`}
                  className={cn(
                    "relative shrink-0 overflow-hidden border transition",
                    "size-12 rounded-sm sm:size-14",
                    index === activeIndex
                      ? "border-primary shadow-[inset_0_0_0_2px_var(--color-primary)]"
                      : "border-white/20 opacity-80 hover:border-white/40 hover:opacity-100",
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

        <div className="flex shrink-0 items-center gap-2">
          {project.demoUrl ? (
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.name} live demo`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-9 shrink-0 gap-1.5 px-3.5 text-[13px]",
              )}
              onClick={() =>
                posthog.capture("project_demo_clicked", {
                  project: project.name,
                  demo_url: project.demoUrl,
                  location: "card_header",
                })
              }
            >
              <span className="hidden sm:inline">Live Demo</span>
              <span className="sm:hidden">Demo</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          ) : null}
          <Link
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name} repository on GitHub`}
            className={cn(
              buttonVariants({
                variant: project.demoUrl ? "outline" : "default",
                size: "lg",
              }),
              "h-9 shrink-0 gap-1.5 px-3.5 text-[13px]",
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
        </div>
      </header>

      <p className="border-b border-border/40 px-3.5 py-3 text-[15px] leading-relaxed text-muted-foreground sm:px-4 sm:py-3.5">
        {project.summary}
      </p>

      <GalleryStage images={project.showcaseImages} projectName={project.name} />
    </article>
  )
}
