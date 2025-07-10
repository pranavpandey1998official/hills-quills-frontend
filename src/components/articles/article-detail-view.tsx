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
import { Article } from "@/types/articles"

interface ArticleDetailProps {
  article: Article
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
  const paragraphs = article.description 
    ? [article.description, ...contentParagraphs]
    : contentParagraphs

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
            <span>{new Date(article.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}</span>
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
                {index === 0 && article.description && paragraph === article.description ? (
                  // Style the description paragraph differently - larger, bold, and prominent
                  <p className="text-xl font-semibold text-gray-900 leading-relaxed mb-8 border-l-4 border-orange-500 pl-4 bg-orange-50 py-4">
                    {paragraph}
                  </p>
                ) : paragraph.startsWith("Sustainable Development Initiatives") ? (
                  <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">{paragraph}</h3>
                ) : paragraph.startsWith("Challenges and Opportunities") ? (
                  <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">{paragraph}</h3>
                ) : paragraph.startsWith('"Our goal') ? (
                  <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-700 my-6 bg-gray-50 py-4">
                    {paragraph}
                  </blockquote>
                ) : (
                  <p className="text-gray-800 leading-relaxed mb-6">{paragraph}</p>
                )}

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

      {/* More Stories Section */}
      {!showAllStories ? (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">More Stories</h2>
            <button 
              onClick={() => setShowAllStories(true)}
              className="text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center"
            >
              View All
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {articlesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-300 h-40 rounded-lg mb-3"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-3 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : initialMoreStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {initialMoreStories.map((story: Article) => (
                <div key={story.id} className="group cursor-pointer" onClick={() => handleInitialStoryClick(story)}>
                  <div className="relative h-40 overflow-hidden rounded-lg mb-3">
                    <Image
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 flex space-x-2">
                      <Badge className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                        {story.region}
                      </Badge>
                      <Badge className="bg-gray-600 text-white px-2 py-1 rounded text-xs font-medium">
                        {story.category}
                      </Badge>
                    </div>
                  </div>
                  <h3 className="font-semibold leading-tight group-hover:text-orange-600 transition-colors line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(story.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No more stories available at the moment.</p>
            </div>
          )}
        </div>
      ) : (
        <MoreStoriesSection 
          title="More Stories" 
          showAdBanners={true} 
          excludeIds={[article.id]}
        />
      )}

      {/* Web Stories Section */}
      <WebStories />
    </div>
  )
}
