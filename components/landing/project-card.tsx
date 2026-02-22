import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"
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
            "grid gap-0 border-t border-border/70 sm:grid-cols-2 lg:border-t-0 lg:border-l",
            reversed && "lg:order-1 lg:border-l-0 lg:border-r"
          )}
        >
          {project.showcaseImages.map((src, index) => (
            <figure
              key={src}
              className={cn(
                "overflow-hidden bg-card",
                index % 2 === 1 && "sm:border-l sm:border-border/70"
              )}
            >
              <Image
                src={src}
                alt={`${project.name} showcase screenshot ${index + 1}`}
                width={900}
                height={1600}
                className="block h-auto w-full object-contain"
              />
            </figure>
          ))}
        </div>
      </div>
    </article>
  )
}
