import { ArticleCard } from "./article-card"
import type { Article } from "@/types/articles"

interface TopStoriesProps {
  articles: Article[]
}

export function TopStories({ articles }: TopStoriesProps) {
  const topStories = articles.filter((article) => !article.is_top_news)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 section-heading">
          <span className="section-bullet"></span>
          Top Stories
        </h2>
        <button className="text-gray-500 hover:text-gray-700 font-medium text-sm">View All</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topStories.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}
