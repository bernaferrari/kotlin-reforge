"use client"

import { cn } from "@/lib/utils"
import { useAnimatedCounter } from "@/hooks/use-animated-counter"

function StatNumber({ value, suffix }: { value: number; suffix: string }) {
    const { ref, count } = useAnimatedCounter(value, 2000)

    return (
        <span ref={ref} className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl tabular-nums">
            {count}{suffix}
        </span>
    )
}

export function StatsBar() {
    const stats = [
        { label: "Apps in Progress", value: 4, suffix: "" },
        { label: "Lines Transformed", value: 200, suffix: "K+" },
        { label: "Architecture", staticValue: "KMP" },
        { label: "Design System", staticValue: "M3" },
    ]

    return (
        <section id="stats" className="border-y border-border bg-muted/20">
            <div className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <div
                        key={stat.label}
                        className={cn(
                            "flex flex-col items-center justify-center gap-2 px-4 py-8 sm:px-6 sm:py-12 transition-colors hover:bg-muted/50",
                            i % 2 !== 0 ? "border-l border-border" : "",
                            i >= 2 ? "border-t border-border lg:border-t-0" : "",
                            i >= 2 ? "lg:border-l" : ""
                        )}
                    >
                        {stat.value !== undefined ? (
                            <StatNumber value={stat.value} suffix={stat.suffix || ""} />
                        ) : (
                            <span className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                                {stat.staticValue}
                            </span>
                        )}
                        <span className="text-sm font-medium text-muted-foreground sm:text-base uppercase tracking-wider">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    )
}
