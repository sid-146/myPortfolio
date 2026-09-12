import { Container } from "@/components/layout/Container";
import { getNowData } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { Clock, Compass, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Now",
    description:
        "What Sudhanwa Kaveeshwar is currently building, reading, and learning right now.",
};

export default function NowPage() {
    const now = getNowData();

    return (
        <Container size="prose" className="py-12 sm:py-16 space-y-12">
            {/* Header */}
            <div className="space-y-2 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                    <Compass size={14} />
                    <span>now_page.md</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Now
                </h1>
                <p className="text-xs sm:text-sm font-mono text-zinc-500">
                    A snapshot of my current priorities, active projects,
                    reading, and explorations.
                </p>

                <div className="flex items-center gap-3 pt-2 font-mono text-xs text-zinc-400">
                    <span className="flex items-center gap-1">
                        <Clock size={12} />
                        Updated {formatDate(now.lastUpdated)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {now.location}
                    </span>
                </div>
            </div>

            {/* Notice Banner */}
            <div className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-surface-muted/50 text-xs font-mono text-zinc-600 dark:text-zinc-400 leading-relaxed">
                This is a{" "}
                <a
                    href="https://nownownow.com/about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 underline"
                >
                    /now page
                </a>
                . If my activities change, this page will be updated
                accordingly.
            </div>

            {/* Now Sections */}
            <div className="space-y-8">
                {now.sections.map((sec, idx) => (
                    <section key={idx} className="space-y-3">
                        <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800/60 pb-1.5">
                            {sec.title}
                        </h2>
                        <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                            {sec.items.map((item, iIdx) => (
                                <li
                                    key={iIdx}
                                    className="flex items-start gap-2"
                                >
                                    <span className="text-emerald-500 font-mono mt-0.5">
                                        ›
                                    </span>
                                    <span className="leading-relaxed">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </Container>
    );
}
