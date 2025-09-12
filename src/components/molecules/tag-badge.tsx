import Link from "next/link";
import { Badge } from "../ui/badge";

export default function TagBadge({ tag }: { tag: string }) {
  return (
    <Link href={`/tags/${tag}`} prefetch={false}>
      <Badge
          variant="secondary"
          onClick={() => console.log(tag)}
          className="bg-gray-200 text-gray-700 hover:bg-primary-light cursor-pointer px-3 py-1 text-sm font-normal transition-colors"
      >
          #{tag}
      </Badge>
    </Link>
  )
}