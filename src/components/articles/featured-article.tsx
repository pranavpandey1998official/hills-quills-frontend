"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { useDispatch } from "react-redux"
import { fetchArticleById } from "@/redux/slices/PublicArticleSlice"
import { Article } from "@/types/articles"
import { AppDispatch } from "@/redux/store"

interface FeaturedArticleProps {
  article: Article
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const handleClick = () => {
    dispatch(fetchArticleById(article.id))
    router.push(`/articles/${article.id}`)
  }

  // Extract region from tags or use default
  const region =
    article.tags.find((tag) =>
      ["Dehradun", "Haridwar", "Nainital", "Uttarkashi", "Chamoli", "Garhwal", "Kumaon"].includes(tag),
    ) || "UTTARAKHAND"

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div className="relative h-[450px] md:h-[600px] cursor-pointer group overflow-hidden rounded-xl border border-gray-200 hover:border-orange-200 hover:shadow-lg transition-all duration-300" onClick={handleClick}>
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 75vw"
          className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-[1.05] group-hover:saturate-[1.8] group-hover:sepia-[0.7] group-hover:hue-rotate-[35deg] group-hover:contrast-115"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Hover Overlays - Unaffected by temperature changes */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-semibold uppercase tracking-wide filter-none">
            {region}
          </span>
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <div className="relative bg-white/20 backdrop-blur-xl text-white px-3 py-1 rounded-md flex items-center space-x-2 text-sm font-medium shadow-2xl border border-white/40 filter-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/30 before:via-white/10 before:to-transparent before:rounded-md before:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-tl after:from-transparent after:via-white/5 after:to-white/20 after:rounded-md after:pointer-events-none">
            <span className="relative z-10">READ MORE</span>
            <div className="flex relative z-10">
              <ArrowRight className="h-4 w-4" />
              <ArrowRight className="h-4 w-4 -ml-2" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10">
          <div className="max-w-4xl">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{article.title}</h1>
            <p className="text-lg md:text-xl text-gray-200 mb-4 line-clamp-2">{article.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <span>
                {new Date(article.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>•</span>
              <span>Tourism</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
