"use client"

import { useParams } from "next/navigation";
import { Category, Region } from "@/types/common";
import { Header } from "@/components/molecules/header";
import { Footer } from "@/components/molecules/footer";
import MoreArticles from "@/features/article/component/more-articles";
import SectionHeader from "@/components/molecules/section-header";
import SectionBreak from "@/components/molecules/section-break";
import { useArticlesByCategory, useArticlesByRegion, useLatestNews, useTopNews } from "@/features/article/hooks";
import SectionEqualGrid from "@/features/article/component/article-equal-grid";
import { Article } from "@/features/article/types";
import ArticleList from "@/features/article/component/article-list";
import { capitalizeFirstLetter } from "@/lib/utils";

const CategoryPage = () => {
    var { category } = useParams()
    
    if (!Object.values(Category).includes(category as Category)) { 
        return <div>Category not found</div>
    }

    const { data: categoryArticles } = useArticlesByCategory(category as Category)
    const { data: latestNews } = useLatestNews()
    const latestNewsWithoutCategoryArticles = latestNews?.data.filter((news: Article) => !categoryArticles?.some((article: Article) => article.id === news.id)).slice(0, 4)

    const { data: topNews } = useTopNews()
    const topNewsWithoutCategoryArticles = topNews?.filter((news: Article) => !categoryArticles?.some((article: Article) => article.id === news.id)).slice(0, 4)

    return (
        <>
        <div className="min-h-screen max-w-7xl w-full md:px-8 2xl:px-0 px-4 mx-auto bg-white">
            <Header />
            <SectionBreak />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-2">
                    <SectionHeader title={`${capitalizeFirstLetter(category as string)} News`} subtitle={`Your weekly window into ${category} — explore fresh news, local stories, and updates every week. Stay connected with what’s happening in and around the District.`} />
                    <SectionEqualGrid articles={categoryArticles} />
                </div>
                <div className="col-span-1">
                    <SectionHeader title="Top Stories" />
                    <ArticleList variant="square" articles={topNewsWithoutCategoryArticles} />
                    <SectionBreak />
                    <SectionHeader title="Latest News" />
                    <ArticleList variant="square" articles={latestNewsWithoutCategoryArticles} />
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

export default CategoryPage;