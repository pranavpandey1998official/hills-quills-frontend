import { Article } from "@/features/article/types"
import RegionBadge from "../../../../components/molecules/region-badge"
import Link from "next/link"


const ArticleCardSquareHorizontal = ({ article }: { article: Article }) => {
    return (
      <Link href={`/articles/${article.id}`} prefetch={false}>
    <div className="@container grid grid-cols-3 gap-x-4 bg-white">
      <div className="col-span-1 flex justify-center items-center">
        <img
          src={article.image.previewUrl || "/placeholder.svg"}
          alt={article.title}
          className="rounded-lg object-cover aspect-square"
        />
      </div>

      <div className="col-span-2 flex @xs:py-2 @sm:py-4 flex-col justify-between ">
        <div>
          <h2 className=" text-2xs @xs:text-sm @sm:text-lg @md:text-2xl line-clamp-2  text-ellipsis text-gray-900 mb-3">{article.title}</h2>
        </div>

        <div className="flex overflow-visible @md:scale-90 @sm:scale-80 scale-70 origin-top-left items-center gap-2 text-sm">
          <RegionBadge region={article.region} variant="outline" />
        </div>
      </div>
    </div>
    </Link>
    )
}

export default ArticleCardSquareHorizontal
