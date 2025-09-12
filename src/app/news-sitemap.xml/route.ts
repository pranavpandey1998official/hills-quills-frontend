import { fetchLatestArticles } from "@/features/article/services";
import { NextResponse } from "next/server";

export async function GET() {
  // Fetch latest articles (last 48 hours only)
  const articles = await fetchLatestArticles(Number.MAX_SAFE_INTEGER, 1000);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
    ${articles.data.map(
        (article) => `
      <url>
        <loc>${process.env.NEXT_PUBLIC_SITE_URL}/articles/${article.id}</loc>
        <news:news>
          <news:publication>
            <news:name>Hills Quills</news:name>
            <news:language>en</news:language>
          </news:publication>
          <news:publication_date>${new Date(
            article.created_at
          ).toISOString()}</news:publication_date>
          <news:title>${escapeXml(article.title)}</news:title>
        </news:news>
      </url>
    `
      )
      .join("")}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}


// Escape XML special characters
function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}