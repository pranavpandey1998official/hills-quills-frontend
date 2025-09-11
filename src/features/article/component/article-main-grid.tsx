import ArticleCardSquareHorizontal from "@/features/article/component/article-card/article-card-square-hotizontal";
import ArticleCardVertical from "@/features/article/component/article-card/article-card-vertical";
import { Separator } from "@/components/ui/separator";
import { Article } from "@/features/article/types";


const ArticleMainGrid = ({articles}: {articles: Article[]}) => {

    const mainArticle = articles[0];
    const secondaryArticles = articles.slice(1, 4);
    const moreArticles = articles.slice(4);
    const renderSecondaryArticles = () => {
        return secondaryArticles.map((article, index) => {
            if (index !== secondaryArticles.length - 1) {
                return (
                    <>
                        <div className="divider-item">
                            <ArticleCardVertical key={article.id} article={article} />
                        </div>
                        <Separator className="mb-4 mt-2" />
                    </>
                )
            }
            return (
                <div className="divider-item">
                    <ArticleCardVertical key={article.id} article={article} />
                </div>
            )
        })
    }

    const renderMoreArticles = () => {
        return moreArticles.map((article, index) => {
            if (index !== moreArticles.length - 1) {
                return (
                    <>
                        <ArticleCardSquareHorizontal key={article.id} article={article} />
                        <Separator className="my-4" />
                    </>
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
