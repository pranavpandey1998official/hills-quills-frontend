"use client"

import { Header } from "@/components/molecules/header"
import { Footer } from "@/components/molecules/footer"
import { Intro } from "@/components/molecules/intro"
import WebStoryList from "../../features/web-story/component/web-story-list"
import ArticleSecondaryGrid from "../../features/article/component/article-secondary-grid"
import { useRegionArticles, useTopNews } from "@/features/article/hooks"
import { useWebStories } from "@/features/web-story/hooks"
import SectionHeader from "@/components/molecules/section-header"
import SectionBreak from "@/components/molecules/section-break"
import MoreArticles from "@/features/article/component/more-articles"
import ArticleMainGrid from "@/features/article/component/article-main-grid"

export default function TopNewsPage() {
  const { data: topNews } = useTopNews()
  const { data: webStories } = useWebStories()
  const { data: regionArticles } = useRegionArticles()

  return (
    <>
      <div className="min-h-screen max-w-7xl w-full md:px-8 2xl:px-0 px-4 mx-auto bg-white">
        <Header />

        {/* Top News Intro */}
        
        <Intro
          title="Top News"
          description="Stay updated with the top news from every district of Uttarakhand. From local updates to state-wide headlines, find everything important in one place. Catch fresh stories as they happen and never miss a moment."
          backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
        />
        <SectionBreak />

        {/* Featured Articles Grid */}
        <ArticleMainGrid articles={topNews} />
        <SectionBreak />

        <SectionHeader title="Web Stories" />
        <WebStoryList stories={webStories} onStoryClick={() => {}} />
        <SectionBreak />

        <SectionHeader title="From Districts" />
        <ArticleSecondaryGrid articles={regionArticles} />
        <SectionBreak />

        <SectionHeader title="More Stories" />
        <MoreArticles />  
        <SectionBreak />     
      </div>
    <Footer />
    </>
  )
}
