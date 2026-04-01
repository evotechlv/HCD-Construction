import {
  Home,
  Building2,
  Hammer,
  PaintBucket,
  HardHat,
  DollarSign,
  Ruler,
  Droplets,
  Zap,
  Fence,
  ShieldCheck,
  Wrench,
  PencilRuler,
  Construction,
  Trash2,
  Layout,
} from "lucide-react"

const services = [
  {
    icon: Home,
    title: "Residential Construction",
    description: "Custom home builds tailored to the Las Vegas lifestyle. With 18+ years of local experience, we handle everything from foundations to luxury finishing touches.",
    //description: "Custom home builds tailored to your lifestyle, from foundations to finishing touches.",
  },
  {
    icon: Building2,
    title: "Commercial Projects",
    description: "Office spaces, retail stores, and commercial buildings built to the highest standards.",
  },
  {
    icon: Hammer,
    title: "Renovations",
    description: "Expert home transformations across Summerlin, Las Vegas and Henderson. From high-end kitchen remodels to full property modernizations, we deliver precision craftsmanship.",
    //description: "Transform your existing space with expert renovation and remodeling services.",
  },
  {
    icon: PaintBucket,
    title: "Interior Design",
    description: "Complete interior solutions that blend functionality with modern aesthetics.",
  },
  {
    icon: HardHat,
    title: "Project Management",
    description: "End-to-end project oversight ensuring timelines and budgets are always met.",
  },
  {
    icon: Ruler,
    title: "Extensions & Additions",
    description: "Seamlessly expand your living space with expertly designed home extensions.",
  },
  {
    icon: Droplets,
    title: "Plumbing & Drainage",
    description: "Full plumbing services for new installations, repairs, and drainage systems.",
  },
  {
    icon: Zap,
    title: "Electrical Work",
    description: "Licensed electrical services including rewiring, lighting, and smart-home setups.",
  },
  {
    icon: Fence,
    title: "Outdoor & Landscaping",
    description: "Decks, patios, fencing, and landscape work to complete your property.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Repairs",
    description: "Ongoing building maintenance and repair services to keep your property in top shape.",
  },
  {
    icon: ShieldCheck,
    title: "Structural Engineering",
    description: "Certified structural assessments, underpinning, and load-bearing modifications.",
  },
  {
    icon: DollarSign,
    title: "Financing Available",
    description: "Flexible financing options so you can start your project now and pay over time.",
  },
  {
    icon: PencilRuler,
    title: "Architecture & Engineering",
    description: "Professional blueprints and structural plans designed for safety, local compliance, and aesthetic appeal.",
  },
  {
    icon: Construction,
    title: "New Construction",
    description: "Ground-up builds for residential and commercial properties using the latest sustainable construction methods.",
  },
  {
    icon: Trash2,
    title: "Demolition",
    description: "Safe and efficient site clearing, structural demolition, and debris removal to prepare for your new vision.",
  },
  {
    icon: Layout,
    title: "Trim & Interiors",
    description: "Precision finish carpentry, baseboards, crown molding, and high-end interior detailing for a polished look.",
  },
]

export function Services() {
  return (
    <section id="services" className="border-t border-border bg-card py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground sm:text-sm">
            Services
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:mt-4 sm:text-4xl md:text-5xl text-balance">
            Everything you need, under one roof.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-px bg-border sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-card p-4 transition-colors hover:bg-secondary sm:p-8 lg:p-10"
            >
              <service.icon className="h-5 w-5 text-accent sm:h-6 sm:w-6" />
              <h3 className="mt-3 text-sm font-semibold text-foreground sm:mt-6 sm:text-lg">
                {service.title}
              </h3>
              <p className="mt-1.5 hidden text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:block">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
