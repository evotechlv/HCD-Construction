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
    description: "Premier commercial build-outs and retail renovations across the Las Vegas Valley. We ensure every project meets strict Clark County codes and fast-paced timelines.",
    //description: "Office spaces, retail stores, and commercial buildings built to the highest standards.",
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
    description: "Curated interior solutions that blend Vegas desert aesthetics with modern functionality. We create spaces that are both beautiful and built for local living.",
    //description: "Complete interior solutions that blend functionality with modern aesthetics.",
  },
  {
    icon: HardHat,
    title: "Project Management",
    description: "End-to-end oversight by Vegas veterans. We navigate local permitting and vendor management to ensure your project stays on schedule and under budget.",
    //description: "End-to-end project oversight ensuring timelines and budgets are always met.",
  },
  {
    icon: Ruler,
    title: "Extensions & Additions",
    description: "Seamlessly expand your square footage with room additions that match your home’s original architecture. Expertly handled permitting for growing families in North Las Vegas.",
    //description: "Seamlessly expand your living space with expertly designed home extensions.",
  },
  {
    icon: Droplets,
    title: "Plumbing & Drainage",
    description: "Specialized plumbing for the Mojave climate. From high-efficiency water heaters to hard water solutions and full drainage systems for new builds.",
    //description: "Full plumbing services for new installations, repairs, and drainage systems.",
  },
  {
    icon: Zap,
    title: "Electrical Work",
    description: "Licensed electrical services designed for high-demand Vegas homes. Including EV charger installs, smart-home integration, and energy-efficient lighting upgrades.",
    //description: "Licensed electrical services including rewiring, lighting, and smart-home setups.",
  },
  {
    icon: Fence,
    title: "Outdoor & Landscaping",
    description: "Custom desert escapes designed for the local climate. From water-efficient xeriscaping in Summerlin to luxury stone patio decks in Henderson.",
    //description: "Decks, patios, fencing, and landscape work to complete your property.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Repairs",
    description: "Proactive property care to protect your investment from the desert heat. Ongoing maintenance and rapid repairs for residential and commercial properties.",
    //description: "Ongoing building maintenance and repair services to keep your property in top shape.",
  },
  {
    icon: ShieldCheck,
    title: "Structural Engineering",
    description: "Certified structural assessments and load-bearing modifications. We ensure your Vegas renovation is safe, compliant, and built to last.",
    //description: "Certified structural assessments, underpinning, and load-bearing modifications.",
  },
  {
    icon: DollarSign,
    title: "Financing Available",
    description: "Flexible financing options tailored for Las Vegas homeowners. Start your dream kitchen or addition today with competitive rates and easy approvals.",
    //description: "Flexible financing options so you can start your project now and pay over time.",
  },
  {
    icon: PencilRuler,
    title: "Architecture & Engineering",
    description: "Professional blueprints designed for local compliance and aesthetic appeal. We bridge the gap between vision and Clark County building permits.",
    //description: "Professional blueprints and structural plans designed for safety, local compliance, and aesthetic appeal.",
  },
  {
    icon: Construction,
    title: "New Construction",
    description: "Ground-up residential and commercial builds using sustainable methods. 18+ years of experience building the future of the Las Vegas skyline.",
    //description: "Ground-up builds for residential and commercial properties using the latest sustainable construction methods.",
  },
  {
    icon: Trash2,
    title: "Demolition",
    description: "Safe, efficient site clearing and structural demolition. We prepare your lot for its next chapter with full debris removal and local permit adherence.",
    //description: "Safe and efficient site clearing, structural demolition, and debris removal to prepare for your new vision.",
  },
  {
    icon: Layout,
    title: "Trim & Interiors",
    description: "Precision finish carpentry and high-end detailing. From custom crown molding in Seven Hills to modern baseboards that provide a polished, luxury look.",
    //description: "Precision finish carpentry, baseboards, crown molding, and high-end interior detailing for a polished look.",
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
