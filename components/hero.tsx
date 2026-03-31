import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex h-[100svh] items-end pb-16 pt-28 lg:items-center lg:pb-0 lg:pt-32">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Modern construction project by HCD Construction"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground sm:text-sm">
            ARCHITECTURE • ENGINEERING • CONSTRUCTION & REMODELING
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:mt-6 md:text-7xl lg:text-8xl text-balance">
            Your Project.
            <br />
            Our Expertise.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 md:text-xl">
            Complete design-build services for residential and commercial projects. We architect, engineer, and construct spaces that exceed expectations and stand the test of time.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 border border-foreground bg-foreground px-6 py-3.5 text-sm font-medium uppercase tracking-wider text-primary-foreground transition-colors hover:bg-transparent hover:text-foreground sm:px-8 sm:py-4"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium uppercase tracking-wider text-foreground transition-colors hover:text-muted-foreground sm:px-8 sm:py-4"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
