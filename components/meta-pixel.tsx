"use client"

import Script from "next/script"
import { useEffect, useState } from "react"

export function MetaPixel() {
  const [consentGiven, setConsentGiven] = useState(false)

  // ============================================================
  // META (FACEBOOK) PIXEL ID
  // Set your Pixel ID (a number like 1234567890123456) as an
  // environment variable called NEXT_PUBLIC_FB_PIXEL_ID.
  //
  // In Vercel: Project Settings > Environment Variables
  // Locally:   add NEXT_PUBLIC_FB_PIXEL_ID=... to .env.local
  // Find the ID in Meta: Business Settings > Data Sources >
  // Datasets/Pixels.
  // ============================================================
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "995848633435168"

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

  if (!pixelId || !consentGiven) return null

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}
