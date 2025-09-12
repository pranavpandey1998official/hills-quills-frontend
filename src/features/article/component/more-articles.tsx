import useMoreArticles from "../hooks/useMoreArtciles";
import { useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { ArticleCard } from "@/features/article/component/article-card/article-card";



const MoreArticles = () => {
    const {data, isFetchingNextPage, fetchNextPage, hasNextPage} = useMoreArticles()
    const articles = data?.pages.flatMap((page) => page.data)

    const loaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!loaderRef.current) return;

        const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
            }
        },
        { threshold: 1.0 }
        );

        observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (!articles) {
        return null;
    }

    return (
        <>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
            ))}
        </div>
        {isFetchingNextPage && <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto"></Loader2>}
        <div ref={loaderRef}></div>
        </>
    );
}

export default MoreArticles;