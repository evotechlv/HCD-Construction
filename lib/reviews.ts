/* ------------------------------------------------------------------
   lib/reviews.ts
   Server-side review fetching for HCD Construction.

   - Pulls live reviews from BOTH Google Places (New) and the Facebook
     Graph API, merges them, and uses the Google aggregate as the
     headline rating.
   - Falls back to a hand-curated list if no keys are set or a request
     fails, so the section ALWAYS renders.
   - Cached for 24h via Next's fetch revalidate.

   Env vars (.env.local) — all optional; each source degrades gracefully:
     GOOGLE_PLACES_API_KEY=your_key
     GOOGLE_PLACE_ID=ChIJ...                 # HCD's Place ID
     FACEBOOK_PAGE_ID=1234567890
     FACEBOOK_PAGE_ACCESS_TOKEN=EAAB...      # long-lived page token

   Find your Google Place ID:
     https://developers.google.com/maps/documentation/places/web-service/place-id
   Facebook needs a Page token with `pages_read_engagement`:
     https://developers.facebook.com/docs/graph-api/reference/page/ratings/
------------------------------------------------------------------ */

export type Review = {
  name: string
  initials: string
  date: string
  rating: number
  source: "google" | "facebook"
  text: string
}

export type ReviewsData = {
  rating: string // e.g. "4.9"
  count: string // e.g. "30+"
  reviews: Review[]
}

/* ---------- curated fallback (also pads short live results) ---------- */

const CURATED: Review[] = [
  {
    name: "Marcus Thornton",
    initials: "MT",
    date: "2 weeks ago",
    rating: 5,
    source: "google",
    text: "HCD remodeled our Summerlin kitchen and the result is stunning. The custom cabinetry and marble work went beyond what we imagined — and they finished on time and on budget.",
  },
  {
    name: "Jennifer Reyes",
    initials: "JR",
    date: "1 month ago",
    rating: 5,
    source: "google",
    text: "We hired HCD for a full bathroom renovation in Henderson. Their team handled the permits and HOA approvals seamlessly. The spa-quality finish is exactly what we wanted.",
  },
  {
    name: "David & Sarah Lin",
    initials: "DL",
    date: "2 months ago",
    rating: 5,
    source: "google",
    text: "They built our two-story home from the ground up. Eighteen years of experience really shows — every single detail was handled with precision and care.",
  },
  {
    name: "Anthony Caruso",
    initials: "AC",
    date: "Mar 2026",
    rating: 5,
    source: "facebook",
    text: "Our downtown office build-out was completed two weeks early. The polished concrete and floor-to-ceiling glass turned out incredible. Highly recommend for commercial work.",
  },
  {
    name: "Maria Gallardo",
    initials: "MG",
    date: "3 months ago",
    rating: 5,
    source: "google",
    text: "They added an indoor-outdoor extension connecting our living room to the backyard deck. Flawless craftsmanship and clear communication the whole way through.",
  },
  {
    name: "Robert Pierce",
    initials: "RP",
    date: "Feb 2026",
    rating: 4,
    source: "google",
    text: "From demolition to final trim, HCD handled our open-plan renovation professionally. Clean job site every single day. We'll absolutely use them again.",
  },
  {
    name: "Linda Kovač",
    initials: "LK",
    date: "4 months ago",
    rating: 5,
    source: "facebook",
    text: "Responsive, honest, and genuinely skilled. The structural work and electrical upgrades were all done to code with zero issues at inspection.",
  },
  {
    name: "James Whitfield",
    initials: "JW",
    date: "5 months ago",
    rating: 5,
    source: "google",
    text: "The best contractor in the valley. They walked us through financing and made our dream kitchen a reality. Couldn't be happier with how it all came together.",
  },
]

const FALLBACK: ReviewsData = { rating: "4.9", count: "30+", reviews: CURATED }

/* ---------- helpers ---------- */

function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ""
  const second = parts[1]?.[0] ?? ""
  return (first + second).toUpperCase() || "??"
}

// Round down to a clean "30+" style number for the headline count.
function roundedCount(n: number): string {
  if (n <= 0) return "0"
  if (n < 10) return String(n)
  return `${Math.floor(n / 10) * 10}+`
}

// "2024-03-14T..." -> "Mar 2024"
function monthYear(iso?: string): string {
  if (!iso) return ""
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ""
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

// Pad live reviews up to `min` using curated entries so the two
// marquee rows stay full even when the APIs return only a few.
function padReviews(live: Review[], min = 8): Review[] {
  if (live.length >= min) return live
  const extra = CURATED.filter((c) => !live.some((l) => l.name === c.name))
  return [...live, ...extra].slice(0, Math.max(min, live.length))
}

// Interleave Google + Facebook so both badges show across the rows.
function interleave(a: Review[], b: Review[]): Review[] {
  const out: Review[] = []
  const max = Math.max(a.length, b.length)
  for (let i = 0; i < max; i++) {
    if (a[i]) out.push(a[i])
    if (b[i]) out.push(b[i])
  }
  return out
}

/* ---------- Google Places (New) ---------- */

type GooglePlaceResponse = {
  rating?: number
  userRatingCount?: number
  reviews?: Array<{
    rating?: number
    text?: { text?: string }
    relativePublishTimeDescription?: string
    authorAttribution?: { displayName?: string }
  }>
}

async function getGoogle(): Promise<{ rating?: number; count?: number; reviews: Review[] }> {
  const key = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID
  if (!key || !placeId) return { reviews: [] }

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
      next: { revalidate: 86400 },
    })
    if (!res.ok) return { reviews: [] }

    const data = (await res.json()) as GooglePlaceResponse
    const reviews: Review[] = (data.reviews ?? [])
      .filter((r) => r.text?.text)
      .map((r) => {
        const name = r.authorAttribution?.displayName ?? "Google user"
        return {
          name,
          initials: initialsFrom(name),
          date: r.relativePublishTimeDescription ?? "",
          rating: Math.round(r.rating ?? 5),
          source: "google" as const,
          text: r.text!.text!,
        }
      })
    return { rating: data.rating, count: data.userRatingCount, reviews }
  } catch {
    return { reviews: [] }
  }
}

/* ---------- Facebook Graph API ---------- */
/* The `ratings` edge returns recommendations (recommend / don't-recommend),
   not 1–5 stars. We keep only positive recommendations with text and render
   them as 5-star cards. `overall_star_rating` / `rating_count` still exist on
   many pages and are used only as a fallback headline if Google is absent. */

type FacebookRatingsResponse = {
  data?: Array<{
    created_time?: string
    recommendation_type?: "positive" | "negative" | "no_rating"
    review_text?: string
    reviewer?: { name?: string }
  }>
}

type FacebookPageResponse = {
  overall_star_rating?: number
  rating_count?: number
}

async function getFacebook(): Promise<{ rating?: number; count?: number; reviews: Review[] }> {
  const pageId = process.env.FACEBOOK_PAGE_ID
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN
  if (!pageId || !token) return { reviews: [] }

  const base = "https://graph.facebook.com/v19.0"
  try {
    const [ratingsRes, pageRes] = await Promise.all([
      fetch(
        `${base}/${pageId}/ratings?fields=reviewer{name},review_text,recommendation_type,created_time&limit=10&access_token=${token}`,
        { next: { revalidate: 86400 } },
      ),
      fetch(
        `${base}/${pageId}?fields=overall_star_rating,rating_count&access_token=${token}`,
        { next: { revalidate: 86400 } },
      ),
    ])

    const reviews: Review[] = []
    if (ratingsRes.ok) {
      const data = (await ratingsRes.json()) as FacebookRatingsResponse
      for (const r of data.data ?? []) {
        if (r.recommendation_type !== "positive" || !r.review_text) continue
        const name = r.reviewer?.name ?? "Facebook user"
        reviews.push({
          name,
          initials: initialsFrom(name),
          date: monthYear(r.created_time),
          rating: 5, // positive recommendation
          source: "facebook",
          text: r.review_text,
        })
      }
    }

    let rating: number | undefined
    let count: number | undefined
    if (pageRes.ok) {
      const page = (await pageRes.json()) as FacebookPageResponse
      rating = page.overall_star_rating
      count = page.rating_count
    }

    return { rating, count, reviews }
  } catch {
    return { reviews: [] }
  }
}

/* ---------- public API ---------- */

export async function getReviews(): Promise<ReviewsData> {
  const [google, facebook] = await Promise.all([getGoogle(), getFacebook()])

  const merged = interleave(google.reviews, facebook.reviews)
  if (merged.length === 0) return FALLBACK

  // Headline: prefer Google's aggregate, else Facebook's, else curated.
  const rating =
    google.rating?.toFixed(1) ?? facebook.rating?.toFixed(1) ?? FALLBACK.rating
  const totalCount = (google.count ?? 0) + (facebook.count ?? 0)
  const count = totalCount > 0 ? roundedCount(totalCount) : FALLBACK.count

  return { rating, count, reviews: padReviews(merged) }
}
