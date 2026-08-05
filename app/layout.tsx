import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics } from '@/components/google-analytics'
import { MetaPixel } from '@/components/meta-pixel'
import { CookieConsent } from '@/components/cookie-consent'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  metadataBase: new URL('https://hcdconstructions.com'),
  title: 'HCD Construction | General Contractor & Remodeling in Las Vegas, NV',
  description: 'Las Vegas general contractor with 18+ years of experience. Kitchen & bathroom remodels, room additions, custom builds — residential & commercial. Free estimates. Serving Las Vegas, Henderson, Summerlin & 200 miles around.',
  keywords: [
    'General Contractor Las Vegas',
    'Kitchen Remodeling Las Vegas',
    'Home Renovations Summerlin',
    'Commercial Construction Vegas',
    'Bathroom Remodel Las Vegas',
    'Room Additions Las Vegas',
    'Contratista Las Vegas',
    'HCD Construction'
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://hcdconstructions.com',
    title: 'HCD Construction | General Contractor & Remodeling in Las Vegas, NV',
    description: 'Kitchen & bathroom remodels, room additions, custom builds. 18+ years of experience. Free estimates in Las Vegas and surrounding areas.',
    siteName: 'HCD Construction',
    locale: 'en_US',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'HCD Construction — Las Vegas general contractor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HCD Construction | Las Vegas General Contractor',
    description: 'Remodels, additions, and custom builds. Free estimates.',
    images: ['/images/hero.jpg'],
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#111111',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "GeneralContractor",
              "name": "HCD Construction",
              "image": "https://hcdconstructions.com/images/hero.jpg",
              "logo": "https://hcdconstructions.com/images/hcd-logo-dark-full.png",
              "url": "https://hcdconstructions.com",
              "telephone": "+17027626588",
              "email": "info@hcdconstructions.com",
              "priceRange": "$$",
              // TODO: Replace with your real Facebook/Instagram page URLs, then uncomment:
              // "sameAs": [
              //   "https://www.facebook.com/YOUR_PAGE",
              //   "https://www.instagram.com/YOUR_PROFILE"
              // ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "", // Add your office address if you have one
                "addressLocality": "Las Vegas",
                "addressRegion": "NV",
                "postalCode": "89101", // Update to your primary zip
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 36.1699,
                "longitude": -115.1398
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "17:00"
              },
              "areaServed": [
                "Las Vegas", "Henderson", "Summerlin", "North Las Vegas",
                "Spring Valley", "Enterprise", "Paradise", "Boulder City",
                "Pahrump", "Mesquite", "Laughlin"
              ]
            })
          }}
        />

        {children}
        <Analytics />
        <GoogleAnalytics />
        <MetaPixel />
        <CookieConsent />
      </body>
    </html>
  )
}
