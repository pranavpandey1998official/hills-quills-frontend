import ArticleCardSquareHorizontal, { LoadingArticleCardSquareHorizontal } from "@/features/article/component/article-card/article-card-square-hotizontal";
import ArticleCardVertical, { LoadingArticleCardVertical } from "@/features/article/component/article-card/article-card-vertical";
import { Separator } from "@/components/ui/separator";
import { Article } from "@/features/article/types";
import { LoadingArticleCard } from "./article-card/article-card";


const LoadingArticleMainGrid = () => {
    const secondaryArticles = Array(3).fill(0)
    const moreArticles = Array(5).fill(0)

    return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="grid-cols-1 md:col-span-2">
            <LoadingArticleCardVertical />
        </div>
        <div className="col-span-1">
            {secondaryArticles.map((_, index) => (
                <LoadingArticleCardVertical key={index} />
            ))}
        </div>
        <div className="col-span-1">
            {moreArticles.map((_, index) => (
                <LoadingArticleCardSquareHorizontal key={index} />
            ))}
        </div>
    </div>
    )
}

const ArticleMainGrid = ({articles}: {articles?: Article[]}) => {

    if (!articles) {
        return <LoadingArticleMainGrid />
    }

    const mainArticle = articles[0];
    const secondaryArticles = articles.slice(1, 4);
    const moreArticles = articles.slice(4);
    const renderSecondaryArticles = () => {
        return secondaryArticles.map((article, index) => {
            if (index !== secondaryArticles.length - 1) {
                return (
                    <div key={article.id}>
                        <div className="divider-item">
                            <ArticleCardVertical key={article.id} article={article} />
                        </div>
                        <Separator className="mb-4 mt-2" />
                    </div>
                )
            }
            return (
                <div key={article.id} className="divider-item">
                    <ArticleCardVertical key={article.id} article={article} />
                </div>
            )
        })
    }

    const renderMoreArticles = () => {
        return moreArticles.map((article, index) => {
            if (index !== moreArticles.length - 1) {
                return (
                    <div key={article.id}>
                        <ArticleCardSquareHorizontal key={article.id} article={article} />
                        <Separator className="my-4" />
                    </div>
                )
            }
            return (
                <ArticleCardSquareHorizontal key={article.id} article={article} />
            )
        })
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="grid-cols-1 md:col-span-2">
                <ArticleCardVertical article={mainArticle} />
            </div>
            <div className="col-span-1">
                {renderSecondaryArticles()}
            </div>
            <div className="col-span-1">
                {renderMoreArticles()}
            </div>
        </div>
    )

}

export default ArticleMainGrid;
