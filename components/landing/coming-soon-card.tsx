import Link from "next/link"
import { Clock3, ArrowUpRight } from "lucide-react"

interface ComingSoonCardProps {
  name: string
  summary: string
  repoUrl: string
  planned: string[]
}

export function ComingSoonCard({ name, summary, repoUrl, planned }: ComingSoonCardProps) {
  return (
    <article className="forge-panel relative overflow-hidden rounded-3xl border-dashed p-6 sm:p-8">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
        <Clock3 className="size-3.5" />
        Next Candidate
      </div>
      <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">{name}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{summary}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {planned.map((item) => (
          <span
            key={item}
            className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>

      <Link
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
      >
        View current project
        <ArrowUpRight className="size-4" />
      </Link>
    </article>
  )
}
