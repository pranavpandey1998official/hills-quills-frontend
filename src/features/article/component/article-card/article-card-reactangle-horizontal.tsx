import { Article } from "@/features/article/types"
import RegionBadge from "../../../../components/molecules/region-badge"
import { Clock } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"



const ArticleCardRectangleHorizontal = ({ article }: { article: Article }) => {
    return (
      <Link href={`/articles/${article.id}`} prefetch={false}>
        <div className="@container grid grid-cols-3 gap-4 bg-white rounded-lg ">
          <div className="col-span-1 flex justify-center items-center">
            <img
              src={article.image.previewUrl || "/placeholder.svg"}
              alt={article.title}
              className="rounded-lg  object-cover aspect-video"
            />
          </div>

          <div className="col-span-2 flex flex-col gap-1 ">
            <div className="@2xl:scale-none @xl:scale-80 @sm:scale-70 scale-60 origin-bottom-left">
              <RegionBadge region={article.region} />
            </div>
            <p className="text-xs @md:text-sm  @2xl:text-xl  line-clamp-2  text-ellipsis text-gray-900">{article.title}</p>
            <div className="flex flex-row items-center space-x-2 @md:scale-90 @sm:scale-80 scale-70 origin-top-left">
              <Clock className="w-3 h-3 mr-1" />
              <span className="text-gray-600 font-light text-sm @md:text-md">{format(new Date(article.updated_at), "MMM dd, yyyy")}</span>
            </div>
          </div>
        </div>
      </Link>
    )
}

export default ArticleCardRectangleHorizontal
