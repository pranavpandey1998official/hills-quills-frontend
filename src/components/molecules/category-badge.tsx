import { Badge } from "../ui/badge";
import { Category } from "@/types/articles";

export default function CategoryBadge({ category }: { category: Category }) {
    return (
        <Badge variant="secondary" className="bg-slate-500 py-1 px-2 rounded-sm text-white hover:bg-slate-600">
            {category.toLocaleUpperCase()}
        </Badge>
    )
}