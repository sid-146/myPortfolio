import { Container } from "@/components/layout/Container";
import { ArticleCard } from "@/components/writing/ArticleCard";
import { getAllArticles } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Writing",
    description:
        "Technical articles on LLM inference, systems programming, and distributed data infrastructure by Sudhanwa Kaveeshwar.",
};

export default function WritingPage() {
    const articles = getAllArticles();

    return (
        <Container size="prose" className="py-12 sm:py-16 space-y-8">
            <div className="space-y-2 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Writing
                </h1>
                <p className="text-xs sm:text-sm font-mono text-zinc-500">
                    In-depth engineering notes, deep dives, and architectural
                    explorations.
                </p>
            </div>

            <div className="divide-y divide-zinc-200 dark:divide-zinc-800/60">
                {articles.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                ))}
            </div>
        </Container>
    );
}
