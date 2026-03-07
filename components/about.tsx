import Image from "next/image"

export function About() {
  return (
    <section id="about" className="bg-background py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground sm:text-sm">
              About Us
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:mt-4 sm:text-4xl md:text-5xl text-balance">
              Craftsmanship you can trust.
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:mt-8 sm:space-y-5 sm:text-base">
              <p>
                With over 18 years of experience, HCD Construction delivers comprehensive construction and remodeling services across residential and commercial projects.
              </p>
              <p>
                From building from the ground up to detailed renovations, we cover all your construction needs. Our team of expert craftsmen brings dedication and precision to every project.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-8 sm:mt-10">
              <div>
                <p className="text-2xl font-bold text-foreground sm:text-3xl">18+</p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Years of experience</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground sm:text-3xl">30+</p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Projects delivered</p>
              </div>
            </div>
          </div>

          {/* Image - smaller on mobile */}
          <div className="relative aspect-[16/10] overflow-hidden lg:aspect-[4/5]">
            <Image
              src="/images/about.jpg"
              alt="HCD Construction team reviewing blueprints on site"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
