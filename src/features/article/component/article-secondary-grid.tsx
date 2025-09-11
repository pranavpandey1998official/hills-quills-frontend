import { ArticleCard } from "@/features/article/component/article-card/article-card";
import ArticleCardRectangleHorizontal from "@/features/article/component/article-card/article-card-reactangle-horizontal";
import { Separator } from "@/components/ui/separator";
import { Article } from "@/features/article/types"


const ArticleSecondaryGrid = ({articles}: {articles?: Article[]}) => {
    if (!articles) {
        return null;
    }

    const mainArticle = articles[0];
    const secondaryArticles = articles.slice(1, 3);
    const moreArticles = articles.slice(3);

    const renderMoreArticles = () => {
        return moreArticles.map((article, index) => {

            if (index !== moreArticles.length - 1) {
                return (
                    <div key={article.id}>
                        <ArticleCardRectangleHorizontal key={article.id} article={article} />
                        <Separator className="mb-4 mt-2" />
                    </div>
                )
            }
            return (
                <ArticleCardRectangleHorizontal key={article.id} article={article} />
            )
        })
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="col-span-1 grid md:grid-cols-2 gap-4">
                <div className="col-span-2">
                    <ArticleCard showRegionBadge={true} showCategoryBadge={false} showReadMoreBadge={false} key={mainArticle.id} article={mainArticle} />
                </div>
                {secondaryArticles.map((article) => (
                    <div className="col-span-1" key={article.id}>
                        <ArticleCard showRegionBadge={true} showCategoryBadge={false} showReadMoreBadge={false} key={article.id} article={article} />
                    </div>
                ))}


            </div>
            <div className="col-span-1">
                {renderMoreArticles()}
            </div>
        </div>
    )
}

export default ArticleSecondaryGrid;