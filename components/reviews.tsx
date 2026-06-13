import { Star } from "lucide-react"
import { getReviews, type Review } from "@/lib/reviews"
import { LeaveReviewButton } from "@/components/leave-review-modal"

/* ------------------------------------------------------------------
   HCD Construction — Reviews section (Option D: Summary + Marquee)
   Async server component. Pulls data from lib/reviews.ts (live Google
   Places API with a curated fallback). Pure-CSS marquee — no client JS.
   The "Leave a review" CTA opens a client-side modal funnel
   (components/leave-review-modal.tsx).

   Setup:
     1. Copy lib/reviews.ts -> lib/reviews.ts
     2. Copy leave-review-modal.tsx -> components/leave-review-modal.tsx
        and set its Google / Facebook review URLs
     3. Add the @keyframes block to app/globals.css (see INTEGRATION.md)
     4. Render <Reviews /> between <Projects /> and <CTA /> in page.tsx
------------------------------------------------------------------ */

// HCD's public Google review profile (the "see all reviews" page).
const GOOGLE_REVIEW_URL = "#"

/* ---------- atoms ---------- */

function Stars({ value, className = "h-4 w-4" }: { value: number; className?: string }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${className} ${i < value ? "fill-accent text-accent" : "fill-border text-border"}`}
          strokeWidth={0}
        />
      ))}
    </div>
  )
}

function GoogleIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="img" aria-label="Google">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
    </svg>
  )
}

function FacebookIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="img" aria-label="Facebook">
      <path fill="#1877F2" d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.95.93-1.95 1.87V12h3.32l-.53 3.47h-2.79v8.38A12 12 0 0 0 24 12z" />
    </svg>
  )
}

function SourceIcon({ source }: { source: Review["source"] }) {
  return source === "facebook" ? <FacebookIcon /> : <GoogleIcon />
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex w-[340px] shrink-0 flex-col gap-3.5 bg-card p-7 sm:w-[380px] sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-secondary text-sm font-semibold text-foreground">
          {review.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-foreground">{review.name}</div>
          <div className="mt-0.5 text-xs text-muted-foreground">{review.date}</div>
        </div>
        <SourceIcon source={review.source} />
      </div>
      <Stars value={review.rating} className="h-[15px] w-[15px]" />
      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{review.text}</p>
    </div>
  )
}

function MarqueeRow({ items, reverse = false }: { items: Review[]; reverse?: boolean }) {
  const loop = [...items, ...items]
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div
        className={`flex w-max gap-px hover:[animation-play-state:paused] ${
          reverse
            ? "[animation:hcd-marquee_72s_linear_infinite_reverse]"
            : "[animation:hcd-marquee_64s_linear_infinite]"
        } motion-reduce:[animation:none]`}
      >
        {loop.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  )
}

/* ---------- section ---------- */

export async function Reviews() {
  const { rating, count, reviews } = await getReviews()

  // Split into two rows for the opposing marquees.
  const mid = Math.ceil(reviews.length / 2)
  const firstRow = reviews.slice(0, mid)
  const secondRow = reviews.slice(mid)

  return (
    <section id="reviews" className="border-t border-border bg-background py-16 sm:py-24 lg:py-32">
      {/* Header — editorial summary */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground sm:text-sm">
              Reviews
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:mt-4 sm:text-4xl md:text-5xl">
              Trusted across the valley.
            </h2>
            <p className="mt-5 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              Homeowners and businesses across Las Vegas, Henderson, and Summerlin rate HCD
              Construction among the valley&apos;s most reliable builders.
            </p>
          </div>

          {/* Rating block + sources + CTA */}
          <div className="flex flex-col items-start gap-5 lg:items-end">
            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-bold leading-none text-foreground sm:text-6xl">
                {rating}
              </span>
              <div className="flex flex-col gap-2">
                <Stars value={5} className="h-5 w-5" />
                <span className="text-xs text-muted-foreground sm:text-sm">
                  Based on {count} reviews
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <GoogleIcon /> Google
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <FacebookIcon /> Facebook
              </span>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                Read all reviews
              </a>
              <LeaveReviewButton />
            </div>
          </div>
        </div>
      </div>

      {/* Marquee wall */}
      <div className="mt-12 flex flex-col gap-px sm:mt-16">
        <MarqueeRow items={firstRow} />
        <MarqueeRow items={secondRow} reverse />
      </div>
    </section>
  )
}
