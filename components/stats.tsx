const stats = [
  { value: "18+", label: "Years Experience" },
  { value: "30+", label: "Projects Completed" },
  { value: "100%", label: "Licensed & Insured" },
]

export function Stats() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-border">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 px-3 py-8 text-center sm:px-6 sm:py-12 lg:py-16">
            <span className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {stat.value}
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground sm:mt-2 sm:text-sm sm:tracking-[0.2em]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
