"use client"

import Image from "next/image"
import { ArrowRight, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Article } from "@/features/article/types"
import  CategoryBadge  from "@/components/molecules/category-badge"
import Link from "next/link"


interface FeaturedArticleProps {
  article?: Article
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  // const router = useRouter()

  const handleClick = () => {
    // router.push(`/articles/${article.id}`)
  }

  if (!article) {
    return "loadfing...."
  }


  return (
    <Link href={`/articles/${article.id}`}>
    <section>
      <div className="relative h-[90vh] md:h-[60vh] cursor-pointer group overflow-hidden rounded-xl border border-gray-200 hover:border-orange-200 hover:shadow-lg transition-all duration-300" onClick={handleClick}>
        <Image
          src={article.image.previewUrl || "/placeholder.svg"}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100%, 100%"
          className="object-cover transition-all w-full duration-500 group-hover:scale-105 "
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Hover Overlays - Unaffected by temperature changes */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <CategoryBadge category={article.category} />
        </div>


        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10">
          <div >
            <h1 className="text-base md:text-xl lg:text-2xl font-normal mb-4">{article.title}</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Clock className="w-4 h-4" />
              <span>
                {formatDistanceToNow(new Date(article.created_at), { addSuffix: true })}
              </span>
              <span>•</span>
              <span>{article.region}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    </Link>
  )
}
