"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { useDispatch } from "react-redux"
import { fetchArticleById } from "@/redux/slices/PublicArticleSlice"
import { Article } from "@/types/articles"
import { AppDispatch } from "@/redux/store"

interface ArticleCardProps {
  article: Article
  // Layout options
  showDescription?: boolean
  imageHeight?: string
  // Badge configuration
  showBadgesOnHover?: boolean
  showRegionBadge?: boolean
  showCategoryBadge?: boolean
  showReadMoreBadge?: boolean
  // Hover effects
  enableComplexHoverEffects?: boolean
}

export function ArticleCard({ 
  article,
  // Default values maintain backward compatibility
  showDescription = true,
  imageHeight = "h-48",
  showBadgesOnHover = true,
  showRegionBadge = true,
  showCategoryBadge = false,
  showReadMoreBadge = true,
  enableComplexHoverEffects = true
}: ArticleCardProps) {

  const handleClick = () => {
  }

  // Extract region from tags or use default (for backward compatibility)
  const region =
    article.region || 
    article.tags?.find?.((tag) =>
      ["Dehradun", "Haridwar", "Nainital", "Uttarkashi", "Chamoli", "Garhwal", "Kumaon"].includes(tag),
    ) || "UTTARAKHAND"

  const category = article.category || "NEWS"

  // Conditional hover effects classes
  const imageHoverClasses = enableComplexHoverEffects 
    ? "transition-all duration-500 group-hover:scale-105 group-hover:brightness-[1.05] group-hover:saturate-[1.8] group-hover:sepia-[0.7] group-hover:hue-rotate-[35deg] group-hover:contrast-115"
    : "transition-all duration-500 group-hover:scale-105"

  // Badge visibility classes
  const badgeVisibilityClasses = showBadgesOnHover 
    ? "opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
    : "opacity-100"

  return (
    <div className="cursor-pointer group" onClick={handleClick}>
      <div className={`relative ${imageHeight} overflow-hidden rounded-lg mb-3`}>
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover ${imageHoverClasses}`}
        />

        {/* Badges container */}
        <div className={`absolute top-2 left-2 ${badgeVisibilityClasses} z-20`}>
          <div className="flex space-x-2">
            {showRegionBadge && (
              <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wide filter-none">
                {region}
              </span>
            )}
            {showCategoryBadge && (
              <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs font-medium filter-none">
                {category}
              </span>
            )}
          </div>
        </div>

        {/* Read More Badge */}
        {showReadMoreBadge && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <div className="relative bg-white/20 backdrop-blur-xl text-white px-2 py-1 rounded-md flex items-center space-x-1 text-xs font-medium shadow-2xl border border-white/40 filter-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/30 before:via-white/10 before:to-transparent before:rounded-md before:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-tl after:from-transparent after:via-white/5 after:to-white/20 after:rounded-md after:pointer-events-none">
              <span className="relative z-10">READ MORE</span>
              <div className="flex relative z-10">
                <ArrowRight className="h-3 w-3" />
                <ArrowRight className="h-3 w-3 -ml-1" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-lg leading-tight group-hover:text-orange-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        {showDescription && (
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{article.description}</p>
        )}
        <div className="text-xs text-gray-500 pt-1">
          {new Date(article.created_at).toLocaleDateString("en-US", {
            month: showDescription ? "short" : "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>
    </div>
  )
}
