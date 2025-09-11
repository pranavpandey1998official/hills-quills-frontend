"use client"
import React, { Usable } from "react";
import { Region } from "@/types/common";
import { Header } from "@/components/molecules/header";
import { Footer } from "@/components/molecules/footer";
import MoreArticles from "@/features/article/component/more-articles";
import SectionHeader from "@/components/molecules/section-header";
import SectionBreak from "@/components/molecules/section-break";
import { useArticlesByRegion, useLatestNews, useTopNews } from "@/features/article/hooks";
import SectionEqualGrid from "@/features/article/component/article-equal-grid";
import { Article } from "@/features/article/types";
import ArticleList from "@/features/article/component/article-list";

const useRegionPage = (region: Region) => {

    const { data: regionArticles } = useArticlesByRegion(region as Region)
    
    const { data: latestNews } = useLatestNews()
    const latestNewsWithoutRegionArticles = latestNews?.data.filter((news: Article) => !regionArticles?.some((article: Article) => article.id === news.id)).slice(0, 4)

    const { data: topNews } = useTopNews()
    const topNewsWithoutRegionArticles = topNews?.filter((news: Article) => !regionArticles?.some((article: Article) => article.id === news.id)).slice(0, 4)

    return { regionArticles, latestNews: latestNewsWithoutRegionArticles, topNews: topNewsWithoutRegionArticles }
}



const RegionPage = ({ params }: { params: Usable<{region: string}> }) => {
    
    let { region } = React.use(params)
    region = decodeURIComponent(region)
    if (!Object.values(Region).includes(region as Region)) { 
        return <div>Region not found</div>
    }

    const { regionArticles, latestNews, topNews } = useRegionPage(region as Region)

    return (
        <>
        <div className="min-h-screen max-w-7xl w-full md:px-8 2xl:px-0 px-4 mx-auto bg-white">
            <Header />
            <SectionBreak />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-2">
                    <SectionHeader title={`${region} News`} subtitle={`Your weekly window into ${region} — explore fresh news, local stories, and updates every week. Stay connected with what’s happening in and around the District.`} />
                    <SectionEqualGrid articles={regionArticles} />
                </div>
                <div className="col-span-1">
                    <SectionHeader title="Top Stories" />
                    <ArticleList variant="square" articles={latestNews} />
                    <SectionBreak />
                    <SectionHeader title="Latest News" />
                    <ArticleList variant="square" articles={topNews} />
                </div>
            </div>
            <SectionBreak />
            <SectionHeader title="More Stories" />
            <MoreArticles />
        </div>
            <Footer />
        </>
    )
}

export default RegionPage;