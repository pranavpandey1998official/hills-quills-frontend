import { Article } from "@/features/article/types";
import RegionBadge from "../../../../components/molecules/region-badge";
import Link from "next/link"
import { format } from 'date-fns';
import { ShimmerButton, ShimmerText, ShimmerTitle } from "react-shimmer-effects";

export const LoadingArticleCardVertical = () => {
    return (
        <>
            <div className="w-full aspect-video overflow-hidden animate-pulse bg-gray-100 rounded-lg mb-3"></div>
            <ShimmerTitle line={1} className="mb-3" variant="secondary" />
            <div className="flex flex-row">
            <ShimmerButton size="sm" />
            <span>•</span>
            <ShimmerText line={1} />
            </div>
        </>
    )
}

const ArticleCardVertical = ({ article }: { article: Article }) => {
    return (
        <Link href={`/articles/${article.id}`} prefetch={false}>
            <div className="@container">
                <img src={article.image.previewUrl || "/placeholder.svg"} alt={article.title} className={`w-full object-cover aspect-video rounded-md`} />
                <h2 className={`@md:my-2 my-1 @md:text-4xl @sm:text-2xl text-sm font-semibold line-clamp-2`}>{article.title}</h2>
                <div className="flex flex-row items-center gap-1 @md:scale-90 @sm:scale-80 scale-70 origin-top-left ">
                    <RegionBadge region={article.region} variant="outline" />
                    <span>•</span>
                    <span className="text-gray-900 font-medium">{format(new Date(article.updated_at), 'MMMM dd, yyyy')}</span>
                </div>
            </div>
        </Link>
    )
}


export default ArticleCardVertical