import { Metadata, ResolvingMetadata } from "next/dist/lib/metadata/types/metadata-interface"
import { fetchArticleById } from "@/features/article/services"


type Props = {
  params: Promise<{ id: string }>
}
 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } =  await params
  try {
  const article = await fetchArticleById(Number(id))
  return {
    title: article.title,
    description: article.content.substring(0, 150),
    authors: {
      name: article.author_name,
    },
    keywords: article.tags.join(', '),
    openGraph: {
      title: article.title,
      description: article.content.substring(0, 150),
      images: [article.image.previewUrl],
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/articles/${article.id}`,
      type: 'article',
      siteName: 'Hills Quills',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@HillsQuills',
      creator: '@HillsQuills',
      title: article.title,
      description: article.content.substring(0, 150),
      images: [article.image.previewUrl],
    }
  }
  } catch (error) {
    console.error(error);
  }
  return {
    title: 'Article',
    description: 'Article',
  };
}

const ArticleLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default ArticleLayout