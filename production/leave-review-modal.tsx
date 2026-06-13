"use client"

import { useEffect, useState } from "react"
import { Star, X } from "lucide-react"

/* ------------------------------------------------------------------
   HCD Construction — "Leave a review" button + modal (client component)

   Flow: pick stars → write the review → submit → thank-you step with
   "Post on Google" / "Post on Facebook" buttons. The review text is
   copied to the clipboard so the visitor just pastes it on the platform
   (reviews only count when posted there — this is a review funnel,
   not a backend form).

   Setup: set the two URLs below.
------------------------------------------------------------------ */

// Google "write a review" deep link:
// https://search.google.com/local/writereview?placeid=<GOOGLE_PLACE_ID>
const GOOGLE_WRITE_REVIEW_URL = "#"
// Facebook page reviews tab, e.g. https://www.facebook.com/<page>/reviews
const FACEBOOK_REVIEW_URL = "#"

function GoogleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="img" aria-label="Google">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
    </svg>
  )
}

function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="img" aria-label="Facebook">
      <path fill="#1877F2" d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.95.93-1.95 1.87V12h3.32l-.53 3.47h-2.79v8.38A12 12 0 0 0 24 12z" />
    </svg>
  )
}

export function LeaveReviewButton() {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [name, setName] = useState("")
  const [text, setText] = useState("")
  const [sent, setSent] = useState(false)

  // Reset + lock body scroll while the modal is open
  useEffect(() => {
    if (!open) return
    setSent(false)
    setRating(0)
    setHover(0)
    setText("")
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  const active = hover || rating
  const canSubmit = rating > 0 && text.trim().length > 0

  const submit = async () => {
    if (!canSubmit) return
    try {
      await navigator.clipboard.writeText(text.trim())
    } catch {
      /* clipboard unavailable — the funnel still works */
    }
    setSent(true)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-3 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-colors hover:bg-transparent hover:text-foreground"
      >
        Leave a review
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Leave a review"
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-full w-full max-w-lg flex-col gap-6 overflow-y-auto border border-border bg-card p-8 sm:p-9"
          >
            {/* header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Reviews</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                  {sent ? "Thank you." : "Leave a review"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-border text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {sent ? (
              /* step 2 — funnel to the platforms */
              <div className="flex flex-col gap-5">
                <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      strokeWidth={0}
                      className={`h-5 w-5 ${i < rating ? "fill-accent text-accent" : "fill-border text-border"}`}
                    />
                  ))}
                </div>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  {name ? `Thanks, ${name.split(" ")[0]}. ` : ""}Reviews help your neighbors find
                  us — make it count by posting it publicly. Your review text is copied, just
                  paste it in.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={GOOGLE_WRITE_REVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2.5 border border-border px-4 py-3.5 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:border-foreground"
                  >
                    <GoogleIcon /> Post on Google
                  </a>
                  <a
                    href={FACEBOOK_REVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2.5 border border-border px-4 py-3.5 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:border-foreground"
                  >
                    <FacebookIcon /> Post on Facebook
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="self-start text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  Done
                </button>
              </div>
            ) : (
              /* step 1 — write the review */
              <div className="flex flex-col gap-5">
                <div>
                  <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Your rating
                  </span>
                  <div className="flex gap-1.5" onMouseLeave={() => setHover(0)}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        onMouseEnter={() => setHover(n)}
                        aria-label={`${n} star${n > 1 ? "s" : ""}`}
                        className="p-0.5 leading-none"
                      >
                        <Star
                          strokeWidth={0}
                          className={`h-7 w-7 ${n <= active ? "fill-accent text-accent" : "fill-border text-border"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="hcd-review-name"
                    className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    Name
                  </label>
                  <input
                    id="hcd-review-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full border border-border bg-background px-3.5 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-foreground"
                  />
                </div>
                <div>
                  <label
                    htmlFor="hcd-review-text"
                    className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    Your review
                  </label>
                  <textarea
                    id="hcd-review-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                    placeholder="Tell us about your project — what we built and how it went."
                    className="w-full resize-y border border-border bg-background px-3.5 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-foreground"
                  />
                </div>
                <button
                  type="button"
                  onClick={submit}
                  disabled={!canSubmit}
                  className="border border-foreground bg-foreground px-6 py-3.5 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-colors enabled:hover:bg-transparent enabled:hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Submit review
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
