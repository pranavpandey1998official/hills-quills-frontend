import { Badge } from "../ui/badge";
import { Region } from "@/types/articles";

export default function RegionBadge({ region }: { region: Region }) {
    return (
        <Badge variant="secondary" className="bg-orange-500 py-1 px-2 rounded-sm text-white hover:bg-orange-600">
            {region.toLocaleUpperCase()}
        </Badge>
    )
}