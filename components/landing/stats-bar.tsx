const stats = [
  { value: "4", label: "Apps" },
  { value: "400K+", label: "LOC touched" },
  { value: "14+", label: "Screens showcased" },
  { value: "M3", label: "Design language" },
]

export function StatsBar() {
  return (
    <section id="impact" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="forge-panel grid overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                "px-5 py-8 sm:px-7",
                i % 2 === 1 ? "sm:border-l sm:border-border/80" : "",
                i > 1 ? "border-t border-border/80 lg:border-t-0" : "",
                i > 1 ? "lg:border-l lg:border-border/80" : "",
              ].join(" ")}
            >
              <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{stat.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
