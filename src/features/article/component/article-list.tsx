import ArticleCardRectangleHorizontal, { LoadingArticleCardRectangleHorizontal } from "@/features/article/component/article-card/article-card-reactangle-horizontal";
import ArticleCardSquareHorizontal, { LoadingArticleCardSquareHorizontal } from "@/features/article/component/article-card/article-card-square-hotizontal";
import { Separator } from "@/components/ui/separator";
import { Article } from "@/features/article/types";


const ArticleList = ({ articles, variant = "rectangle" }: { articles?: Article[], variant?: "square" | "rectangle" }) => {
    const shimmerItems = Array.from({ length: 3 })
    if (!articles) {
        
        return  shimmerItems.map((_, index) => {
            return (
                <div key={index}>  
                    {variant === "square" ? <LoadingArticleCardSquareHorizontal /> : <LoadingArticleCardRectangleHorizontal />}
                    {index !== shimmerItems.length - 1 && <Separator className="my-4" />}
                </div>
            )
        })
    }

    const ArticleCard = variant === "square" ? ArticleCardSquareHorizontal : ArticleCardRectangleHorizontal;
    return (
        <>
            {articles.map((article, index) => {
                if (index !== articles.length - 1) {
                    return (
                        <div key={article.id}>  
                            <ArticleCard key={article.id} article={article} />
                            <Separator className="my-4" />
                        </div>
                    )
                }
                return (
                    <ArticleCard key={article.id} article={article} />
                )
            })}
        </>
    )
}

export default ArticleList;