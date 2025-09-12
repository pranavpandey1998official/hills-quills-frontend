"use client"
import { useParams } from "next/navigation"
import { useStoryById } from "@/features/web-story/hooks"
import { WebStoryViewer } from "@/features/web-story/component/web-story-viewer"
import Head from "next/head"


const StoryDetailPage = () => {
    const params = useParams()
    const {story, isLoading, error} = useStoryById(Number(params.id))

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return <>
    <Head>
        <title>{story!.title}</title>
        <meta name="author" content="HillsQuills" />
        <meta name="keywords" content={story!.tags.join(', ')} />
        <meta name="description" content={story!.title} />
        <meta property="og:title" content={story!.title} />
        <meta property="og:description" content={story!.title} />
        <meta property="og:image" content={story!.cover_image_url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@HillsQuills" />
        <meta name="twitter:creator" content="@HillsQuills" />
        <meta name="twitter:title" content={story!.title} />
        <meta name="twitter:description" content={story!.title} />
        <meta name="twitter:image" content={story!.cover_image_url} />
    </Head>
    <WebStoryViewer onClose={() => {}} story={story!} />
    </>
}

export default StoryDetailPage;