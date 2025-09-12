'use client';

import { TrendingTagsView } from '@/components/molecules/trending-tags-view';
import { Header } from '@/components/molecules/header';
import { FeaturedArticle } from '@/features/article/component/featured-article';
import SectionHeader from '@/components/molecules/section-header';
import ArticleEqualGrid from '../features/article/component/article-equal-grid';
import ArticleList from '../features/article/component/article-list';
import WebStoryList from '../features/web-story/component/web-story-list';
import ArticleSecondaryGrid from '../features/article/component/article-secondary-grid';
import { Footer } from '@/components/molecules/footer';
import { useMemo } from "react";
import { useLatestNews, useTopNews, useRegionArticles, useTrendingTags } from "@/features/article/hooks";
import { useWebStories } from "@/features/web-story/hooks";

const useHomePage = () => {

    const {data: latestNews, isLoading: latestNewsLoading} = useLatestNews();
    const {data: topNews, isLoading: topNewsLoading} = useTopNews();
    const {data: webStories, isLoading: webStoriesLoading} = useWebStories();
    const {data: regionArticles, isLoading: regionArticlesLoading} = useRegionArticles();
    const {data: trendingTags, isLoading: trendingTagsLoading} = useTrendingTags();

    const isLoading = useMemo(() => {
        return latestNewsLoading || topNewsLoading || webStoriesLoading || regionArticlesLoading || trendingTagsLoading
    }, [latestNewsLoading, topNewsLoading, webStoriesLoading, regionArticlesLoading, trendingTagsLoading])
    return {latestNews: latestNews?.data, topNews, webStories, regionArticles, trendingTags, isLoading}
}



export default function HomePage() {
  const { latestNews, topNews, webStories, regionArticles, trendingTags } = useHomePage();

  const featuredArticle = latestNews?.[0] || undefined;

  return (
    <>
      <div className="mx-auto min-h-screen w-full max-w-7xl bg-white px-4 md:px-8 2xl:px-0">
        <Header />
        <TrendingTagsView trendingTags={trendingTags} handleTagClick={() => {}} />
        <FeaturedArticle article={featuredArticle} />
        <SectionHeader className="mt-12" title="Top Stories"></SectionHeader>
        <ArticleEqualGrid articles={topNews} />
        <SectionHeader className="mt-12" title="Latest News"></SectionHeader>
        <ArticleList articles={latestNews?.slice(1, 4)} />
        <SectionHeader className="mt-12" title="Web Stories"></SectionHeader>
        <WebStoryList stories={webStories} onStoryClick={() => {}} />
        <SectionHeader className="mt-12" title="From Districts"></SectionHeader>
        <ArticleSecondaryGrid articles={regionArticles} />
        <div className="h-12"></div>
      </div>
      <Footer />
    </>
  );
}
