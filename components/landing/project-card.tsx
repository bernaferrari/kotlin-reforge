"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  ArrowRight,
  FileCode2,
  GitBranch,
  Layers,
  ExternalLink,
  Github,
} from "lucide-react"
import Link from "next/link"

export interface ProjectData {
  name: string
  tagline: string
  description: string
  icon: React.ReactNode
  accentClass: string
  accentBg: string
  repoUrl: string
  beforeImages: string[]
  afterImages: string[]
  transformations: {
    label: string
    description: string
  }[]
  stats: {
    languageBefore: string
    languageAfter: string
    architectureBefore: string
    architectureAfter: string
  }
}

/* ─── Image Pair (Side by Side Before/After) ─── */
function ImagePair({
  beforeSrc,
  afterSrc,
  projectName,
  pairIndex,
}: {
  beforeSrc: string
  afterSrc: string
  projectName: string
  pairIndex: number
}) {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row">
      <div className="flex flex-1 flex-col gap-2">
        <div className="group/pair relative w-full overflow-hidden rounded-xl border border-border bg-muted/50 transition-all duration-500 ease-out hover:border-primary/30 will-change-transform">
          <Image
            src={beforeSrc}
            alt={`${projectName} before screenshot ${pairIndex + 1}`}
            width={720}
            height={1280}
            className="h-auto w-full object-contain transition-transform duration-500 ease-out group-hover/pair:scale-[1.03] will-change-transform"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 400px"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div className="group/pair relative w-full overflow-hidden rounded-xl border border-border bg-muted/50 transition-all duration-500 ease-out hover:border-primary/30 will-change-transform">
          <Image
            src={afterSrc}
            alt={`${projectName} after screenshot ${pairIndex + 1}`}
            width={720}
            height={1280}
            className="h-auto w-full object-contain transition-transform duration-500 ease-out group-hover/pair:scale-[1.03] will-change-transform"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 400px"
          />
        </div>
      </div>
    </div>
  )
}

/* ─── Stat Item ─── */
function StatItem({
  icon,
  label,
  before,
  after,
}: {
  icon: React.ReactNode
  label: string
  before: string
  after: string
}) {
  return (
    <div className="rounded-lg border border-border bg-muted/50 p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        <span className="truncate">{label}</span>
      </div>
      <div className="mt-1.5 flex items-baseline gap-1 sm:gap-2">
        <span className="truncate font-mono text-xs text-muted-foreground line-through sm:text-sm">
          {before}
        </span>
        <ArrowRight className="size-3 shrink-0 text-primary" />
        <span className="truncate font-mono text-xs font-semibold text-foreground sm:text-sm">
          {after}
        </span>
      </div>
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
    <div className="group relative">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-500 ease-out hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 sm:p-6 md:p-10 will-change-transform hover:-translate-y-1">
        <div
          className={cn(
            "flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between",
            reversed && "lg:flex-row-reverse"
          )}
        >
          {/* Info side */}
          <div className="flex flex-1 flex-col gap-5 lg:max-w-md">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-xl sm:size-12",
                  project.accentBg
                )}
              >
                {project.icon}
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {project.name}
                </h3>
                <p className="truncate text-sm text-muted-foreground">
                  {project.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {project.description}
            </p>

            {/* Transformations */}
            <div className="flex flex-col gap-2.5">
              <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground sm:text-sm">
                <Layers className="size-3.5 text-primary sm:size-4" />
                Transformations
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.transformations.map((t) => (
                  <Badge
                    key={t.label}
                    variant="secondary"
                    className="px-2 py-1 text-[11px] sm:px-3 sm:py-1.5 sm:text-xs"
                  >
                    {t.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-col gap-3">
              <StatItem
                icon={<GitBranch className="size-3 shrink-0" />}
                label="Language"
                before={project.stats.languageBefore}
                after={project.stats.languageAfter}
              />
              <StatItem
                icon={<Layers className="size-3 shrink-0" />}
                label="Architecture"
                before={project.stats.architectureBefore}
                after={project.stats.architectureAfter}
              />
            </div>

            {/* Repo link */}
            <Link
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "group flex w-full items-center justify-center gap-2 sm:w-auto"
              )}
            >
              <Github className="size-4" />
              View on GitHub
              <ExternalLink className="size-3 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Before/After gallery side */}
          <div className="flex flex-1 flex-col gap-6 lg:max-w-xl">
            {project.beforeImages.map((beforeSrc, index) => {
              const afterSrc = project.afterImages[index]
              if (!afterSrc) return null // Ensure pairs exist

              return (
                <ImagePair
                  key={index}
                  beforeSrc={beforeSrc}
                  afterSrc={afterSrc}
                  projectName={project.name}
                  pairIndex={index}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
