"use client"

import { useState, useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TopNewsIntro } from "@/components/articles/top-news-intro"
import { FeaturedArticlesGrid } from "@/app/articles/top-news/components/featured-articles-grid"
import { WebStories } from "@/components/web-stories/web-stories"
import { CultureDistrictsSection } from "@/app/articles/top-news/components/culture-districts-section"
import { MoreStoriesSection } from "@/components/articles/more-stories-section"
import { AdBanner } from "@/components/articles/ad-banner"
import { PageSkeleton } from "@/components/articles/page-skeleton"
import { RootState } from "@/redux/store"
import { Article } from "@/types/articles"

export default function TopNewsPage() {
  const [isLoading, setIsLoading] = useState(true)

  // Get articles from Redux to collect IDs for excluding duplicates
  const { items: trendingArticles } = useSelector(
    (state: RootState) => state.publicArticles.trending
  )
  const { items: publicArticles } = useSelector(
    (state: RootState) => state.publicArticles.articles
  )

  useEffect(() => {
    // 1-second minimum loading time to ensure skeleton displays
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  // Collect all article IDs that are already displayed to avoid duplicates
  const excludeIds = useMemo(() => {
    const ids: (string | number)[] = []
    
    // Get IDs from trending articles (used in featured grid)
    const trendingArray = Array.isArray(trendingArticles) ? trendingArticles : []
    const topTrendingArticles = trendingArray.filter((article: Article) => article.is_top_news === 1)
    topTrendingArticles.forEach(article => ids.push(article.id))
    
    // Get IDs from public articles used in featured grid right column
    const publicArray = Array.isArray(publicArticles) ? publicArticles : []
    const topPublicArticles = publicArray.filter((article: Article) => article.is_top_news === 1)
    topPublicArticles.slice(0, 5).forEach(article => ids.push(article.id))
    
    // Get IDs from culture articles
    const cultureArticles = publicArray.filter((article: Article) => 
      article.is_top_news === 1 && 
      (article.category === "Culture & Heritage" || article.category?.toLowerCase().includes("culture"))
    )
    cultureArticles.slice(0, 3).forEach(article => ids.push(article.id))
    
    // Get IDs from district articles
    const districtArticles = publicArray.slice(0, 3)
    districtArticles.forEach(article => ids.push(article.id))
    
    return ids
  }, [trendingArticles, publicArticles])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <PageSkeleton />
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Ad Banner #1 */}
      <AdBanner />

      {/* Top News Intro */}
      <TopNewsIntro
        title="Top News"
        description="Catch up on the latest headlines from around the region."
        backgroundImage="/images/licensed-imag.jpg"
      />

      {/* Featured Articles Grid */}
      <FeaturedArticlesGrid />

      {/* Ad Banner #2 */}
      <AdBanner />

      {/* Web Stories Section */}
      <WebStories />

      {/* Culture & Districts Section */}
      <CultureDistrictsSection />

      {/* Ad Banner #3 */}
      <AdBanner />

      {/* More Stories Section */}
      <MoreStoriesSection 
        title="More Stories" 
        showAdBanners={true} 
        excludeIds={excludeIds}
      />

      {/* Ad Banner #4 */}
      <AdBanner />

      <Footer />
    </div>
  )
}
