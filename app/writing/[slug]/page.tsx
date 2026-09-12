import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { MDXContent } from "@/components/mdx/MDXContent";
import { TableOfContents } from "@/components/writing/TableOfContents";
import { getAllArticles, getArticleBySlug } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import type { Metadata } from "next";

interface ArticlePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const articles = getAllArticles();
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export async function generateMetadata({
    params,
}: ArticlePageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = getArticleBySlug(slug);

    if (!article) {
        return { title: "Article Not Found" };
    }

    return {
        title: article.metadata.title,
        description: article.metadata.description,
        openGraph: {
            title: `${article.metadata.title} | Sudhanwa Kaveeshwar`,
            description: article.metadata.description,
            type: "article",
            publishedTime: article.metadata.date,
        },
    };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
    const { slug } = await params;
    const articleDoc = getArticleBySlug(slug);

    if (!articleDoc) {
        notFound();
    }

    const { metadata, content, readingTime } = articleDoc;

    return (
        <Container size="prose" className="py-12 sm:py-16 space-y-10">
            {/* Back button */}
            <Link
                href="/writing"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 hover:text-emerald-500 transition-colors"
            >
                <ArrowLeft size={14} />
                <span>back to writing</span>
            </Link>

            {/* Article Header */}
            <header className="space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-8">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500">
                    <time
                        dateTime={metadata.date}
                        className="flex items-center gap-1"
                    >
                        <Calendar size={13} />
                        {formatDate(metadata.date)}
                    </time>
                    {readingTime && (
                        <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <Clock size={13} />
                                {readingTime}
                            </span>
                        </>
                    )}
                </div>

                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
                    {metadata.title}
                </h1>

                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {metadata.description}
                </p>

                {/* Tags */}
                {metadata.tags && metadata.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[11px] text-zinc-500">
                        {metadata.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-0.5 rounded bg-surface-muted border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </header>

            {/* Table of Contents */}
            <section className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-surface-muted/40">
                <TableOfContents content={content} />
            </section>

            {/* Main MDX Content */}
            <article className="prose prose-zinc dark:prose-invert max-w-none">
                <MDXContent source={content} />
            </article>

            {/* Footer Navigation */}
            <footer className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center font-mono text-xs">
                <Link
                    href="/writing"
                    className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                    <ArrowLeft size={13} />
                    <span>All Articles</span>
                </Link>
                <Link
                    href="/feed.xml"
                    className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1"
                >
                    <span>RSS Feed</span>
                </Link>
            </footer>
        </Container>
    );
}
