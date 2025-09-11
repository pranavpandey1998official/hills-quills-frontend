import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchLatestArticles } from "@/features/article/services";

const useMoreArticles = () => {
    const {data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['moreArticles'],
        queryFn: ({pageParam}) => fetchLatestArticles(pageParam, 6),
        staleTime: 60 * 60 * 1000, // 1 hour
        getNextPageParam: (lastPage) => {
            const nextCursor = lastPage.pagination.nextCursor
            if (nextCursor > 1) {
                return nextCursor
            }
            return undefined
        },
        initialPageParam: Number.MAX_SAFE_INTEGER,

    })
    return {data, isFetchingNextPage, fetchNextPage, hasNextPage}
}

export default useMoreArticles;