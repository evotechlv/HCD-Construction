import { MetadataRoute } from 'next'

// NOTE: This is a one-page site. Only list URLs that actually exist —
// listing pages that 404 hurts crawl trust. If you add real pages later
// (e.g. /kitchen-remodeling-las-vegas), add them back here.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hcdconstructions.com'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
