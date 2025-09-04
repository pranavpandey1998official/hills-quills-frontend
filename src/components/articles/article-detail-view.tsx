"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { ArrowLeft, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AuthorCard } from "./author-card"
import { InlineAdBanner } from "./inline-ad-banner"
import { SidebarAdBanner } from "./sidebar-ad-banner"
import { AdBanner } from "@/components/articles/ad-banner"
import { MoreStoriesSection } from "./more-stories-section"
import { WebStories } from "@/components/web-stories/web-stories"
import { fetchPublicArticles, fetchArticleById, fetchTrendingTags } from "@/redux/slices/PublicArticleSlice"
import { RootState, AppDispatch } from "@/redux/store"
import { Article, ArticleViewWithAuthor } from "@/types/articles"

interface ArticleDetailProps {
  article: ArticleViewWithAuthor
}

export function ArticleDetailView({ article }: ArticleDetailProps) {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  
  // Redux state for articles and trending tags
  const { items: publicArticles, isLoading: articlesLoading } = useSelector(
    (state: RootState) => state.publicArticles.articles
  )
  const { trendingTags } = useSelector(
    (state: RootState) => state.publicArticles
  )
  
  const [showAllStories, setShowAllStories] = useState(false)
  const [saved, setSaved] = useState(false)
  const [sidebarAdsCount, setSidebarAdsCount] = useState(2)

  const contentRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Fetch articles for more stories
  useEffect(() => {
    if (!publicArticles || publicArticles.length === 0) {
      dispatch(fetchPublicArticles({ limit: 10, page: 1 }) as any)
    }
  }, [dispatch, publicArticles])

  // Fetch trending tags
  useEffect(() => {
    if (!trendingTags.items || trendingTags.items.length === 0) {
      dispatch(fetchTrendingTags('week'))
    }
  }, [dispatch, trendingTags.items])

  // Get real articles for initial 3 stories, excluding current article
  const initialMoreStories = publicArticles
    ? publicArticles
        .filter((story: Article) => story.id !== article.id)
        .slice(0, 3)
    : []

  // Handle article click navigation for initial stories
  const handleInitialStoryClick = (clickedArticle: Article) => {
    dispatch(fetchArticleById(clickedArticle.id))
    router.push(`/articles/${clickedArticle.id}`)
  }



  // Transform author data to match AuthorCard props
  const authorData = {
    name: article.author_name,
    role: article.author_profession || "Correspondent",
    image: article.author_profile_photo_url || "/placeholder.svg",
    bio: article.author_about || "Experienced journalist covering stories from Uttarakhand.",
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        url: window.location.href,
      })
    }
  }

  // Calculate sidebar ads needed based on content height
  useEffect(() => {
    const calculateSidebarAds = () => {
      if (contentRef.current && sidebarRef.current) {
        const contentHeight = contentRef.current.offsetHeight
        const authorCardHeight = 280 // Approximate height of author card
        const popularTagsHeight = 200 // Approximate height of popular tags
        const sidebarAdHeight = 150 // Height of each sidebar ad

        const availableSpace = contentHeight - authorCardHeight - popularTagsHeight
        const neededAds = Math.max(0, Math.floor(availableSpace / sidebarAdHeight))

        // Limit to reasonable number of ads (0-4)
        setSidebarAdsCount(Math.min(4, Math.max(0, neededAds)))
      }
    }

    // Calculate after component mounts and content is rendered
    const timer = setTimeout(calculateSidebarAds, 100)

    // Recalculate on window resize
    window.addEventListener("resize", calculateSidebarAds)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", calculateSidebarAds)
    }
  }, [article.content])

  // Combine description and content into paragraphs
  const contentParagraphs = article.content.split("\n\n")
  const paragraphs = contentParagraphs

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back to Home Button */}
      <div className="py-4">
        <button
          onClick={() => router.push("/")}
          className="text-gray-600 hover:text-gray-900 flex items-center px-4 py-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Home
        </button>
      </div>

      {/* Article Header */}
      <div className="mb-8">
        {/* Category & Region Badges */}
        <div className="flex space-x-2 mb-4">
        <Badge className="bg-gray-600 text-white px-3 py-1 rounded font-medium">{article.region}</Badge>
          <Badge className="bg-orange-500 text-white px-3 py-1 rounded font-medium">{article.category}</Badge> 
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">{article.title}</h1>

        {/* Meta Info Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-500">
            <span>By {article.author_name || "Staff Reporter"}</span>
            <span className="mx-2">•</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSaved(!saved)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Heart className={`h-4 w-4 mr-1 ${saved ? "fill-current" : ""}`} />
              Save
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare} className="text-gray-600 hover:text-gray-900">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Article Image */}
      <div className="mb-8">
        <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden rounded-lg">
          <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" priority />
        </div>
        <p className="text-sm text-gray-500 italic mt-2">Photo: Hills & Quills Chronicle</p>
      </div>

      {/* Main Content Area - 70/30 Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Column - Article Content (70%) */}
        <div className="lg:col-span-8" ref={contentRef}>
          <div className="prose prose-lg max-w-none">
            {paragraphs.map((paragraph, index) => (
              <div key={index}>

                  <p className="text-gray-800 leading-relaxed mb-6">{paragraph}</p>
              

                {/* Insert inline ads after specific paragraphs - adjust index for description */}
                {(index === 3 || index === 6) && <InlineAdBanner />}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Sidebar (30%) */}
        <div className="lg:col-span-4" ref={sidebarRef}>
          <div className="space-y-6">
            {/* Author Card */}
            <AuthorCard author={authorData} />

            {/* Dynamic Sidebar Ads */}
            {Array.from({ length: sidebarAdsCount }, (_, index) => (
              <SidebarAdBanner key={index} />
            ))}

            {/* Popular Tags - Always at bottom */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {trendingTags.isLoading ? (
                  // Loading skeleton for tags
                  Array.from({ length: 6 }, (_, index) => (
                    <div key={index} className="bg-gray-200 animate-pulse rounded-full h-7 w-16"></div>
                  ))
                ) : trendingTags.items.length > 0 ? (
                  // Show ALL trending tags without limit
                  trendingTags.items.map((tag: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer rounded-full px-3 py-1"
                    >
                      {tag}
                    </Badge>
                  ))
                ) : (
                  // Fallback to article tags if no trending tags available
                  article.tags.map((tag: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer rounded-full px-3 py-1"
                    >
                      {tag}
                    </Badge>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Banner */}
      <AdBanner />

    </div>
  )
}
