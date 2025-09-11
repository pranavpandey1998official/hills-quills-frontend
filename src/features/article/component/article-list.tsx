import ArticleCardRectangleHorizontal from "@/features/article/component/article-card/article-card-reactangle-horizontal";
import ArticleCardSquareHorizontal from "@/features/article/component/article-card/article-card-square-hotizontal";
import { Separator } from "@/components/ui/separator";
import { Article } from "@/features/article/types";

const ArticleList = ({ articles, variant = "rectangle" }: { articles?: Article[], variant?: "square" | "rectangle" }) => {
    if (!articles) {
        return null;
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