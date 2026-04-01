import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Keep any private/admin folders here
    },
    sitemap: 'https://hcdconstructions.com/sitemap.xml',
  }
}