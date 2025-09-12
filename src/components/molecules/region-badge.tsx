import { Badge } from "../ui/badge";
import { Region } from "@/types/common";
import { useRouter } from "next/navigation";

export default function RegionBadge({ region, variant = "secondary" }: { region: Region, variant?: "secondary" | "outline" }) {
    const router = useRouter();
    const className = variant === "secondary" ? "bg-primary py-1 px-2 font-medium rounded-sm text-2xs text-white hover:bg-primary-dark" : "py-1 px-2 bg-white border-primary font-medium rounded-xl text-primary text-2xs hover:text-white border-2 hover:bg-primary-dark";
    return (
    <Badge
      onClick={() => {
        router.push(`/region/${region}`);
      }}
      variant="secondary"
      className={className}
    >
        {region.toLocaleUpperCase()}
    </Badge>)
}