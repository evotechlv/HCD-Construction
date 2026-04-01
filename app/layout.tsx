import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics } from '@/components/google-analytics'
import { CookieConsent } from '@/components/cookie-consent'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: 'HCD Construction | Premium Remodeling & Custom Builds in Las Vegas',
  description: 'Premium construction and remodeling services. 18+ years of experience delivering quality craftsmanship across residential and commercial projects.',
  keywords: [
    'General Contractor Las Vegas',
    'Kitchen Remodeling Las Vegas',
    'Home Renovations Summerlin', // Adding specific high-end neighborhoods like Summerlin helps!
    'Commercial Construction Vegas',
    'Bathroom Remodel Las Vegas',
    'HCD Construction'
  ],
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
        {children}
        <Analytics />
        <GoogleAnalytics />
        <CookieConsent />
      </body>
    </html>
  )
}
