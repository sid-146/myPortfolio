"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Heading {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // Parse h2 and h3 markdown headings
        const headingLines = content
            .split("\n")
            .filter((line) => line.startsWith("##"));
        const parsedHeadings: Heading[] = headingLines.map((line) => {
            const level = line.startsWith("###") ? 3 : 2;
            const text = line.replace(/^#{2,3}\s+/, "").trim();
            const id = text
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-");
            return { id, text, level };
        });

        setHeadings(parsedHeadings);

        // Setup intersection observer to track active section
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-80px 0% -70% 0%" },
        );

        parsedHeadings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [content]);

    if (headings.length === 0) return null;

    return (
        <nav className="space-y-2 text-xs font-mono">
            <p className="font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3">
                Table of Contents
            </p>
            <ul className="space-y-1.5 border-l border-zinc-200 dark:border-zinc-800">
                {headings.map((heading) => (
                    <li key={heading.id}>
                        <a
                            href={`#${heading.id}`}
                            className={cn(
                                "block py-0.5 transition-colors border-l -ml-[1px]",
                                heading.level === 3 ? "pl-5" : "pl-3",
                                activeId === heading.id
                                    ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 font-medium"
                                    : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300",
                            )}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
