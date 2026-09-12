import Link from "next/link";
import { type Article } from "@/lib/schemas";
import { formatDate } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ArticleCardProps {
    article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
    return (
        <article className="group relative py-5 border-b border-zinc-200 dark:border-zinc-800/70 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-1.5 font-mono text-xs text-zinc-500">
                <time dateTime={article.date}>{formatDate(article.date)}</time>
                {article.readingTime && (
                    <span className="text-[11px] text-zinc-400">
                        {article.readingTime}
                    </span>
                )}
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                <Link
                    href={`/writing/${article.slug}`}
                    className="focus:outline-none"
                >
                    <span className="absolute inset-0" aria-hidden="true" />
                    {article.title}
                </Link>
                <span className="opacity-0 group-hover:opacity-100 text-emerald-500 transition-opacity ml-2 shrink-0">
                    <ArrowUpRight size={16} />
                </span>
            </h3>

            <p className="mt-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                {article.description}
            </p>

            {article.tags && article.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5 font-mono text-[10px] text-zinc-500">
                    {article.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </article>
    );
}
