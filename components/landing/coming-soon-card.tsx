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
    <article className="forge-panel rounded-3xl border-dashed p-5 sm:p-7 lg:p-8">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-primary">
        <Clock3 className="size-4" />
        Next Candidate
      </div>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight">{name}</h3>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">{summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {planned.map((item) => (
          <span key={item} className="rounded-md bg-muted px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            {item}
          </span>
        ))}
      </div>

      <Link
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary"
      >
        View current project
        <ArrowUpRight className="size-4" />
      </Link>
    </article>
  )
}
