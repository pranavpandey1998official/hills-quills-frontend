import { useQuery } from "@tanstack/react-query"
import { fetchTrendingTags } from "@/services/tags"

export function useTrendingTags() {
    const { data: trendingTags, isLoading, error } = useQuery({
        queryKey: ['trendingTags'],
        queryFn: () => fetchTrendingTags()
    })
    return { trendingTags, isLoading, error }
}