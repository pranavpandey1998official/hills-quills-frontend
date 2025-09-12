import { Category, Region } from '@/types/common'
import type { MetadataRoute } from 'next'


export default function sitemap(): MetadataRoute.Sitemap {
    const result: MetadataRoute.Sitemap = []
    Object.values(Region).forEach(region => {
        result.push({
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/region/${encodeURIComponent(region)}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.2,
        })
    })
    Object.values(Category).forEach(category => {
        result.push({
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/category/${encodeURIComponent(category)}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.2,
        })
    })
    return [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/top-news`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.6,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/kumaon`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.6,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/garhwal`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.6,
      },
      ...result,
    ]
  }