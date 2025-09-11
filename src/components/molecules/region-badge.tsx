import { Badge } from "../ui/badge";
import { Region } from "@/types/common";
import Link from "next/link";

export default function RegionBadge({ region, variant = "secondary" }: { region: Region, variant?: "secondary" | "outline" }) {
    const className = variant === "secondary" ? "bg-orange-400 py-1 px-2 font-medium rounded-sm text-2xs text-white hover:bg-orange-600" : "py-1 px-2 font-medium rounded-xl text-orange-500 text-2xs hover:text-white border-2 hover:bg-orange-600";
    return (
    <Link href={`/region/${region}`} prefetch={false}>
        <Badge variant="secondary" className={className}>
            {region.toLocaleUpperCase()}
        </Badge>
    </Link>)
}