"use client"

import Script from "next/script"
import { useEffect, useState } from "react"

export function GoogleAnalytics() {
  const [consentGiven, setConsentGiven] = useState(false)

  // ============================================================
  // GOOGLE ANALYTICS ID
  // Set your Measurement ID (e.g. G-XXXXXXXXXX) as an environment
  // variable called NEXT_PUBLIC_GA_ID.
  //
  // In v0: go to the sidebar > Vars > add NEXT_PUBLIC_GA_ID
  // In Vercel: go to Project Settings > Environment Variables
  // ============================================================
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  useEffect(() => {
    const consent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookie_consent="))
    if (consent?.split("=")[1] === "accepted") {
      setConsentGiven(true)
    }

    const handler = () => {
      const c = document.cookie
        .split("; ")
        .find((row) => row.startsWith("cookie_consent="))
      if (c?.split("=")[1] === "accepted") {
        setConsentGiven(true)
      }
    }
    window.addEventListener("cookie-consent-update", handler)
    return () => window.removeEventListener("cookie-consent-update", handler)
  }, [])

  if (!gaId || !consentGiven) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
