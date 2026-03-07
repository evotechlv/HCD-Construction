import Image from "next/image"

const projects = [
  {
    title: "Modern Kitchen Renovation",
    category: "Residential",
    description: "Complete kitchen transformation with custom cabinetry, marble countertops, and integrated lighting.",
    image: "/images/project-1.jpg",
  },
  {
    title: "Luxury Bathroom Remodel",
    category: "Residential",
    description: "A spa-inspired retreat featuring natural stone, freestanding tub, and minimalist fixtures.",
    image: "/images/project-2.jpg",
  },
  {
    title: "Commercial Office Build",
    category: "Commercial",
    description: "Full-scale office fitout with open floor plan, polished concrete, and floor-to-ceiling glass.",
    image: "/images/project-3.jpg",
  },
  {
    title: "Indoor-Outdoor Extension",
    category: "Residential",
    description: "Seamless living extension connecting interior spaces to a landscaped timber deck.",
    image: "/images/project-4.jpg",
  },
  {
    title: "Open-Plan Living Renovation",
    category: "Residential",
    description: "Structural renovation opening up living, dining, and kitchen into one flowing space.",
    image: "/images/project-5.jpg",
  },
  {
    title: "New Home Build",
    category: "New Build",
    description: "Contemporary two-story residence built from the ground up with premium materials throughout.",
    image: "/images/project-6.jpg",
  },
]

export function Projects() {
  return (
    <section id="projects" className="bg-background py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground sm:text-sm">
          Projects
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:mt-4 sm:text-4xl md:text-5xl text-balance">
          Latest work.
        </h2>

        <div className="mt-10 flex flex-col gap-6 sm:mt-16 sm:gap-10 lg:gap-16">
          {projects.map((project, i) => (
            <div key={project.title} className="group">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[2/1] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-background/20 transition-colors duration-500 group-hover:bg-background/0" />
              </div>
              <div className="mt-4 flex flex-col gap-1 sm:mt-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs tabular-nums text-muted-foreground sm:text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-semibold text-foreground sm:text-xl lg:text-2xl">
                    {project.title}
                  </h3>
                </div>
                <div className="flex items-baseline gap-4 pl-7 sm:pl-0">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                    {project.category}
                  </span>
                  <p className="hidden text-sm leading-relaxed text-muted-foreground md:block md:max-w-md">
                    {project.description}
                  </p>
                </div>
              </div>
              {i < projects.length - 1 && (
                <div className="mt-6 h-px bg-border sm:mt-10 lg:mt-16" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
