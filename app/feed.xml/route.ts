import { getAllArticles } from "@/lib/content";

export async function GET() {
  const articles = getAllArticles();
  const siteUrl = "https://my-portfolio-puce-six-34.vercel.app";

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sudhanwa Kaveeshwar - Engineering Notes</title>
    <link>${siteUrl}</link>
    <description>Technical articles on LLM inference, systems programming, and distributed data infrastructure.</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${articles
      .map(
        (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${siteUrl}/writing/${article.slug}</link>
      <guid>${siteUrl}/writing/${article.slug}</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <description><![CDATA[${article.description}]]></description>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
