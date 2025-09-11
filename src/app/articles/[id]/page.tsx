"use client"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/molecules/header"
import { Footer } from "@/components/molecules/footer"
import { useApprovedArticleById } from "@/features/article/hooks"
import ArticleDetailContent from "@/features/article/component/article-detail/content"
import { AuthorCard } from "@/features/article/component/article-detail/author"
import ArticleDetailHeader from "@/features/article/component/article-detail/header"
import { Label, Separator } from "@radix-ui/react-select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { useLatestNews, useWebStories } from "@/features/article/hooks"
import { Article } from "@/features/article/types"
import SectionHeader from "@/components/molecules/section-header"
import ArticleEqualGrid from "../../../features/article/component/article-equal-grid"
import SectionBreak from "@/components/molecules/section-break"
import WebStoryList from "../../../features/web-story/component/web-story-list"
import TagBadge from "@/components/molecules/tag-badge"

export default function ArticleDetailPage() {
  const params = useParams()
  const router = useRouter()
  
  // Get the selected article from Redu

  const articleId = params.id as string
  const { data: article, isLoading: loading, error } = useApprovedArticleById(Number(articleId))
  const { data: latestNews, isLoading: latestNewsLoading } = useLatestNews()
  const { data: webStories, isLoading: webStoriesLoading } = useWebStories()

  const latestNewsWithoutCurrentArticle = latestNews?.data.filter((news: Article) => news.id !== Number(articleId)).slice(0,6)


  if (loading || !article) {
    return (
      <div className="min-h-screen max-w-7xl w-full md:px-8 2xl:px-0 px-4 mx-auto bg-white">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading article...</p>
          </div>
        </div>
      </div>
    )
  }

  
    return (
      <>
      <div className="min-h-screen max-w-7xl w-full md:px-8 2xl:px-0 px-4 mx-auto bg-white">
        <Header />
        <button
          onClick={() => router.push("/")}
          className="text-gray-500 hover:text-gray-900 text-sm font-light flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </button>
        <ArticleDetailHeader  article={article!} />
        <SectionBreak />
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <ArticleDetailContent content={article!.content} />
            <SectionBreak />
            <Separator className="border-gray-200 border-1" />
          </div>
          <div className="col-span-1">
            <AuthorCard name={article!.author_name} profile_photo_url={article!.author_profile_photo_url!} profession={article!.author_profession!} about={article!.author_about!} role={'role'} />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-gray-600">Popular Tags</h2>
            <div className="flex flex-wrap gap-2">
              {article!.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          </div>
        </div>
        <SectionBreak />
        <SectionHeader title="More Stories"></SectionHeader>
        <ArticleEqualGrid articles={latestNewsWithoutCurrentArticle} />
        <SectionBreak />
        <SectionHeader title="Web Stories"></SectionHeader>
        <WebStoryList stories={webStories} onStoryClick={() => {}} />
        <SectionBreak />
      </div>
      <Footer />
    </>
    )
}