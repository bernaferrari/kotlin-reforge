"use client"

import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Globe, Play } from "lucide-react"
import posthog from "posthog-js"
import { GitHubIcon } from "@/components/icons/github-icon"
import { buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { type AppData, iconSrc, imageSrc } from "@/lib/apps"

function GalleryStage({
  images,
  projectName,
}: {
  images: { src: string; alt: string; backdrop?: string }[]
  projectName: string
}) {
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
                className="group relative mx-auto block aspect-[40/21] w-full max-w-[1000px] cursor-zoom-in overflow-hidden rounded-xl"
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
              {images.map(({ src, alt, backdrop }, index) => (
                <div
                  key={`preview-${src}`}
                  className="relative h-full min-w-full"
                  style={{ background: backdrop }}
                >
                  <Image
                    src={src}
                    alt={index === activeIndex ? alt : ""}
                    fill
                    sizes="(max-width: 1100px) 100vw, 1000px"
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
                {images.map(({ src }, index) => (
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
          <div className="relative mx-auto aspect-[40/21] w-full overflow-hidden">
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
                {images.map(({ src, alt }, index) => (
                  <div key={`dialog-${src}`} className="relative h-full min-w-full">
                    <Image
                      src={src}
                      alt={index === activeIndex ? alt : ""}
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
              {images.map(({ src }, index) => (
                <button
                  key={`dialog-thumb-${src}`}
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
                    alt=""
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

const linkClass = "h-9 shrink-0 gap-1.5 px-3.5 text-[13px]"

export function ProjectCard({ app }: { app: AppData }) {
  const track = (event: string, url: string) =>
    posthog.capture(event, { project: app.name, url, location: "card_header" })

  return (
    <article
      id={app.slug}
      className="forge-panel group/card relative scroll-mt-24 overflow-hidden rounded-2xl transition-[border-color,box-shadow] duration-500 hover:border-primary/30 hover:shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--primary)_40%,transparent)]"
    >
      <header className="flex flex-col gap-5 border-b border-border/40 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
        <div className="min-w-0">
          <div className="flex items-center gap-4">
            <Image
              src={iconSrc(app)}
              alt=""
              width={56}
              height={56}
              className="size-12 shrink-0 rounded-[14px] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.5)] sm:size-14 sm:rounded-[16px]"
            />
            <div className="min-w-0">
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{app.name}</h3>
              <p className="mt-0.5 text-[13px] text-muted-foreground">
                {app.origin ? (
                  <>
                    Rebuilt from{" "}
                    <a
                      href={app.origin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-foreground/85 underline decoration-border underline-offset-2 transition-colors hover:text-foreground hover:decoration-foreground"
                    >
                      {app.origin.name}
                    </a>
                    {app.origin.author ? ` by ${app.origin.author}` : null}
                  </>
                ) : (
                  <span className="font-medium text-primary">New app, built from scratch</span>
                )}
              </p>
            </div>
          </div>
          <div className="mt-4 sm:pl-[72px]">
            <p className="text-[15px] font-medium text-foreground/90">{app.tagline}</p>
            <p className="mt-1 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              {app.summary}
            </p>
            <p className="mt-2.5 text-xs text-muted-foreground/90">{app.platforms.join(" · ")}</p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
          {app.playUrl ? (
            <Link
              href={app.playUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), linkClass)}
              onClick={() => track("project_play_clicked", app.playUrl!)}
            >
              <Play className="size-3.5" />
              Google Play
            </Link>
          ) : null}
          {app.demoUrl ? (
            <Link
              href={app.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: app.playUrl ? "outline" : "default", size: "lg" }),
                linkClass,
              )}
              onClick={() => track("project_demo_clicked", app.demoUrl!)}
            >
              <Globe className="size-3.5" />
              Try it in your browser
            </Link>
          ) : null}
          {app.repoUrl ? (
            <Link
              href={app.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${app.name} source code on GitHub`}
              className={cn(
                buttonVariants({
                  variant: app.demoUrl || app.playUrl ? "outline" : "default",
                  size: "lg",
                }),
                linkClass,
              )}
              onClick={() => track("project_repo_clicked", app.repoUrl!)}
            >
              <GitHubIcon className="size-3.5" />
              Source
              <ArrowUpRight className="size-3.5" />
            </Link>
          ) : null}
        </div>
      </header>

      <GalleryStage
        images={app.images.map((image) => ({ ...image, src: imageSrc(app, image.file) }))}
        projectName={app.name}
      />
    </article>
  )
}
