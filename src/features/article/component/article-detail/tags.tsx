import { Badge } from "../../../../components/ui/badge";


export default function ArticleDetailTags({ tags }: { tags: string[] }) {
    return (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-500">Topics:</span>
            {tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
            ))}
        </div>
    )
}