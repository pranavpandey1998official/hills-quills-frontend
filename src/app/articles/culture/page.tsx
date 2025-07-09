"use client"

import { useState, useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TopNewsIntro } from "@/components/articles/top-news-intro"
import { FeaturedArticlesGrid } from "@/app/articles/culture/components/featured-articles-grid"
import { WebStoriesSection } from "@/app/articles/top-news/components/web-stories-section"
import { CultureDistrictsSection } from "@/app/articles/culture/components/culture-districts-section"
import { MoreStoriesSection } from "@/components/articles/more-stories-section"
import { AdBanner } from "@/components/articles/ad-banner"
import { PageSkeleton } from "@/components/articles/page-skeleton"
import { RootState } from "@/redux/store"
import { Article } from "@/types/articles"

export default function CulturePage() {
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
    
    // Get IDs from trending culture articles (used in featured grid)
    const trendingArray = Array.isArray(trendingArticles) ? trendingArticles : []
    const cultureTrendingArticles = trendingArray.filter((article: Article) => 
      article.category === "Culture & Heritage" || article.category?.toLowerCase().includes("culture")
    )
    cultureTrendingArticles.forEach(article => ids.push(article.id))
    
    // Get IDs from public culture articles used in featured grid
    const publicArray = Array.isArray(publicArticles) ? publicArticles : []
    const culturePublicArticles = publicArray.filter((article: Article) => 
      article.category === "Culture & Heritage" || article.category?.toLowerCase().includes("culture")
    )
    culturePublicArticles.slice(0, 5).forEach(article => ids.push(article.id))
    
    // Get IDs from culture heritage articles used in culture districts section
    const cultureHeritageArticles = publicArray.filter((article: Article) => 
      article.category === "Culture & Heritage" || article.category?.toLowerCase().includes("heritage")
    )
    cultureHeritageArticles.slice(0, 3).forEach(article => ids.push(article.id))
    
    // Get IDs from district articles used in culture districts section
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

      {/* Culture Intro */}
      <TopNewsIntro
        title="Know Your Culture"
        description="Explore the rich heritage, traditions, and cultural treasures of Uttarakhand."
        backgroundImage="/images/download.jpg"
      />

      {/* Featured Articles Grid */}
      <FeaturedArticlesGrid />

      {/* Ad Banner #2 */}
      <AdBanner />

      {/* Web Stories Section */}
      <WebStoriesSection />

      {/* Culture & Districts Section */}
      <CultureDistrictsSection />

      {/* Ad Banner #3 */}
      <AdBanner />

      {/* More Stories Section with duplicate prevention */}
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
