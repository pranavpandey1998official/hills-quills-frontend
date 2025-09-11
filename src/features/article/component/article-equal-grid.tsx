import { ArticleCard } from "@/features/article/component/article-card/article-card";
import { Article } from "@/features/article/types";


interface ArticleEqualGridProps {
    articles?: Article[];
}

export default function ArticleEqualGrid({articles}: ArticleEqualGridProps) {
    return (
        <div className="@container">
            <div className="grid grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-3 gap-8">
                {articles?.map((article) => (
                    <ArticleCard showRegionBadge showCategoryBadge key={article.id} article={article} />
                ))}
            </div>
        </div>
    )
}