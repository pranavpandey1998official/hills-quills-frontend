"use client"

import { Header } from "@/components/molecules/header"
import { Footer } from "@/components/molecules/footer"
import { Intro } from "@/components/molecules/intro"
import WebStoryList from "../../features/web-story/component/web-story-list"
import ArticleSecondaryGrid from "../../features/article/component/article-secondary-grid"
import { useGarhwalArticles, } from "@/features/article/hooks"
import SectionHeader from "@/components/molecules/section-header"
import { useGarhwalWebStories } from "@/features/web-story/hooks"

import SectionBreak from "@/components/molecules/section-break"
import MoreArticles from "@/features/article/component/more-articles"

export default function TopNewsPage() {
  const { data: garhwalNews } = useGarhwalArticles()
  const { data: webStories } = useGarhwalWebStories()

  return (
    <>
      <div className="min-h-screen max-w-7xl w-full md:px-8 2xl:px-0 px-4 mx-auto bg-white">
        <Header />

        {/* Top News Intro */}
        
        <Intro
          title="Garhwal News"
          description="Stay updated with every news from Garhwal region Uttarakhand. From local updates to state-wide headlines, find everything important in one place. Catch fresh stories as they happen and never miss a moment."
          backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
        />
        <SectionBreak />

        {/* Featured Articles Grid */}
        <ArticleSecondaryGrid articles={garhwalNews} />
        <SectionBreak />

        <SectionHeader title="Web Stories" />
        <WebStoryList stories={webStories} onStoryClick={() => {}} />
        <SectionBreak />

        <SectionHeader title="More Stories" />
        <MoreArticles />  
        <SectionBreak />     
      </div>
    <Footer />
    </>
  )
}
