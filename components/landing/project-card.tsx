"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Check, ChevronLeft, ChevronRight } from "lucide-react"
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

  const hasMultiple = images.length > 1
  const activeImage = images[activeIndex] || images[0]

  const goPrevious = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length)
  }

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % images.length)
  }

  return (
    <div>
      <div className="relative border-b border-border/70 bg-muted/25 px-2 py-2 sm:px-3 sm:py-3">
        <div className="relative mx-auto aspect-video w-full max-w-[760px]">
          <Image
            src={activeImage}
            alt={`${projectName} showcase screenshot ${activeIndex + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 760px"
            className="object-contain"
          />
        </div>

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
                onClick={() => setActiveIndex(index)}
                aria-label={`Show screenshot ${index + 1}`}
                className={cn(
                  "shrink-0 overflow-hidden border bg-card transition-colors",
                  "size-12 rounded-md sm:size-14",
                  index === activeIndex ? "border-primary" : "border-border/80 hover:border-border"
                )}
              >
                <Image
                  src={src}
                  alt={`${projectName} thumbnail ${index + 1}`}
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
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
