import { ArticleCard, LoadingArticleCard } from '@/features/article/component/article-card/article-card';
import { Article } from '@/features/article/types';

interface ArticleEqualGridProps {
  articles?: Article[];
}


const LoadingArticleEqualGrid = () => {
  const shimmerItems = Array.from({ length: 6 }); // Adjust based on expected article count

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-8 @xl:grid-cols-2 @4xl:grid-cols-3">
        {shimmerItems.map((_, index) => (
            <LoadingArticleCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default function ArticleEqualGrid({ articles }: ArticleEqualGridProps) {
  if(!articles) {
    return <LoadingArticleEqualGrid />;
  }
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-8 @xl:grid-cols-2 @4xl:grid-cols-3">
        {articles?.map((article) => (
          <ArticleCard showRegionBadge showCategoryBadge key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
