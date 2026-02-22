import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Clock, ExternalLink, Sparkles } from "lucide-react"

interface ComingSoonCardProps {
  name: string
  tagline: string
  description: string
  repoUrl: string
  accentClass: string
  accentBg: string
  plannedTransformations: string[]
}

export function ComingSoonCard({
  name,
  tagline,
  description,
  repoUrl,
  accentClass,
  accentBg,
  plannedTransformations,
}: ComingSoonCardProps) {
  return (
    <div className="group relative">
      <div className="relative overflow-hidden rounded-2xl border border-dashed border-primary/30 bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 sm:p-6 md:p-10">
        {/* Coming soon badge */}
        <div className="mb-4 sm:absolute sm:top-6 sm:right-6 sm:mb-0 md:top-10 md:right-10">
          <Badge
            variant="outline"
            className="gap-1.5 border-primary/40 px-3 py-1.5 text-xs text-primary"
          >
            <Clock className="size-3" />
            Coming Soon
          </Badge>
        </div>

        <div className="flex flex-col gap-6 md:max-w-2xl">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl sm:size-12",
                accentBg
              )}
            >
              <Sparkles className={cn("size-5 sm:size-6", accentClass)} />
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {name}
              </h3>
              <p className="truncate text-sm text-muted-foreground">{tagline}</p>
            </div>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            {description}
          </p>

          {/* Planned transformations */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Planned Transformations
            </h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {plannedTransformations.map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="px-2 py-1 text-[11px] opacity-70 sm:px-3 sm:py-1.5 sm:text-xs"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/* Link to original repo */}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            View original repo
            <ExternalLink className="size-3.5" />
          </a>
        </div>

        {/* Decorative background pattern */}
        <div className="pointer-events-none absolute -right-12 -bottom-12 opacity-[0.03]">
          <svg
            width="240"
            height="240"
            viewBox="0 0 240 240"
            fill="none"
            className="text-foreground"
          >
            <circle
              cx="120"
              cy="120"
              r="100"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 8"
            />
            <circle
              cx="120"
              cy="120"
              r="60"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 8"
            />
            <circle
              cx="120"
              cy="120"
              r="20"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
