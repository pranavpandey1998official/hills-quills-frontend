"use client"

import Image from "next/image"
import { ArrowRight, Clock } from "lucide-react"
import { Article } from "@/features/article/types"
import RegionBadge from "../../../../components/molecules/region-badge"
import CategoryBadge from "../../../../components/molecules/category-badge"
import Link from "next/link"

interface ArticleCardProps {
  article: Article
  // Layout options
  imageHeight?: string
  size?: "small" | "medium" | "large"
  // Badge configuration
  showRegionBadge?: boolean
  showCategoryBadge?: boolean
  showReadMoreBadge?: boolean
}

export function ArticleCard({ 
  article,
  // Default values maintain backward compatibility
  size = "small",
  showRegionBadge = true,
  showCategoryBadge = true,
  showReadMoreBadge = false,
}: ArticleCardProps) {


  return (
      <Link href={`/articles/${article.id}`} prefetch={false}>
      <div className={`relative w-full aspect-3/2 overflow-hidden rounded-lg mb-3`}>
        <Image
          src={article.image.previewUrl || "/placeholder.svg"}
          alt={article.title}
          fill
          className={`object-cover transition-all duration-500 group-hover:scale-105`}
        />

        {/* Badges container */}
        <div className={`absolute top-2 left-2 z-20`}>
          <div className="flex flex-wrap gap-2">
            {showCategoryBadge && (
              <CategoryBadge category={article.category} />
            )}
            {showRegionBadge && (
              <RegionBadge region={article.region}/>
            )}
          </div>
        </div>

        {/* Read More Badge */}
        {showReadMoreBadge && (
          <div className="absolute right-2 bottom-3 opacity-0 group-hover:opacity-100 z-20">
            <div className="relative bg-white/20 backdrop-blur-xl text-white px-2 py-1 rounded-md flex items-center space-x-1 text-xs font-medium shadow-2xl border border-white/40 filter-none">
              <span className="relative z-10">READ MORE</span>
              <div className="flex relative z-10">
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="font-medium text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        <div className="text-xs flex flex-row items-center">
          <Clock className="w-3 h-3 mr-1" />
          <span className="text-gray-800 font-normal">{new Date(article.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}</span>
        </div>
      </div>
    </Link>
  )
}
