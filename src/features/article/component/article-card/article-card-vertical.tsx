import { Article } from "@/features/article/types";
import RegionBadge from "../../../../components/molecules/region-badge";
import Link from "next/link"

const ArticleCardVertical = ({ article }: { article: Article }) => {
    return (
        <Link href={`/articles/${article.id}`} prefetch={false}>
            <div className="@container">
                <img src={article.image.previewUrl || "/placeholder.svg"} alt={article.title} className={`w-full object-cover aspect-video rounded-md`} />
                <h2 className={`@md:my-2 my-1 @md:text-4xl @sm:text-2xl text-sm font-normal line-clamp-2`}>{article.title}</h2>
                <div className="flex flex-row items-center gap-1 @md:scale-90 @sm:scale-80 scale-70 origin-top-left ">
                    <RegionBadge region={article.region} variant="outline" />
                    <span>•</span>
                    <span className="text-gray-900 font-medium">{article.updated_at}</span>
                </div>
            </div>
        </Link>
    )
}


export default ArticleCardVertical