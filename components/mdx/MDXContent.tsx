import { MDXRemote } from "next-mdx-remote/rsc";
import { CodeBlock } from "./CodeBlock";
import { Callout } from "./Callout";
import { MetricsGrid } from "./MetricsGrid";
import Link from "next/link";
import React from "react";

function generateSlug(text: any): string {
    if (typeof text !== "string") {
        if (Array.isArray(text)) return text.map(generateSlug).join("-");
        if (text?.props?.children) return generateSlug(text.props.children);
        return "";
    }
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
}

const customComponents = {
    h1: ({ children, ...props }: any) => {
        const slug = generateSlug(children);
        return (
            <h1
                id={slug}
                className="group relative mt-10 mb-4 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                {...props}
            >
                <a
                    href={`#${slug}`}
                    className="absolute -left-5 opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-emerald-500 font-mono text-base no-underline"
                    aria-hidden="true"
                >
                    #
                </a>
                {children}
            </h1>
        );
    },
    h2: ({ children, ...props }: any) => {
        const slug = generateSlug(children);
        return (
            <h2
                id={slug}
                className="group relative mt-8 mb-3 text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800/80 pb-2"
                {...props}
            >
                <a
                    href={`#${slug}`}
                    className="absolute -left-5 opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-emerald-500 font-mono text-base no-underline"
                    aria-hidden="true"
                >
                    #
                </a>
                {children}
            </h2>
        );
    },
    h3: ({ children, ...props }: any) => {
        const slug = generateSlug(children);
        return (
            <h3
                id={slug}
                className="group relative mt-6 mb-2 text-lg sm:text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100"
                {...props}
            >
                <a
                    href={`#${slug}`}
                    className="absolute -left-5 opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-emerald-500 font-mono text-base no-underline"
                    aria-hidden="true"
                >
                    #
                </a>
                {children}
            </h3>
        );
    },
    p: ({ children, ...props }: any) => (
        <p
            className="my-4 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300"
            {...props}
        >
            {children}
        </p>
    ),
    ul: ({ children, ...props }: any) => (
        <ul
            className="my-4 ml-6 list-disc space-y-1.5 text-sm sm:text-base text-zinc-700 dark:text-zinc-300"
            {...props}
        >
            {children}
        </ul>
    ),
    ol: ({ children, ...props }: any) => (
        <ol
            className="my-4 ml-6 list-decimal space-y-1.5 text-sm sm:text-base text-zinc-700 dark:text-zinc-300"
            {...props}
        >
            {children}
        </ol>
    ),
    li: ({ children, ...props }: any) => (
        <li className="leading-relaxed" {...props}>
            {children}
        </li>
    ),
    a: ({ href = "", children, ...props }: any) => {
        const isInternal = href.startsWith("/") || href.startsWith("#");
        if (isInternal) {
            return (
                <Link
                    href={href}
                    className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium underline-offset-4"
                    {...props}
                >
                    {children}
                </Link>
            );
        }
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium underline-offset-4"
                {...props}
            >
                {children}
            </a>
        );
    },
    pre: ({ children, ...props }: any) => {
        // If the child is a code element, extract props
        if (children && children.props && children.props.className) {
            return (
                <CodeBlock className={children.props.className} {...props}>
                    {children.props.children}
                </CodeBlock>
            );
        }
        return <CodeBlock {...props}>{children}</CodeBlock>;
    },
    code: ({ className, children, ...props }: any) => {
        if (!className) {
            return (
                <code
                    className="px-1.5 py-0.5 rounded bg-zinc-200/70 dark:bg-zinc-800/70 text-zinc-900 dark:text-zinc-200 font-mono text-xs sm:text-[13px] border border-zinc-300/60 dark:border-zinc-700/50"
                    {...props}
                >
                    {children}
                </code>
            );
        }
        return (
            <code className={className} {...props}>
                {children}
            </code>
        );
    },
    blockquote: ({ children, ...props }: any) => (
        <blockquote
            className="my-4 border-l-2 border-emerald-500 pl-4 italic text-zinc-600 dark:text-zinc-400 bg-surface-muted/30 py-1"
            {...props}
        >
            {children}
        </blockquote>
    ),
    table: ({ children, ...props }: any) => (
        <div className="my-6 w-full overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
            <table
                className="w-full text-left text-xs sm:text-sm font-mono"
                {...props}
            >
                {children}
            </table>
        </div>
    ),
    thead: ({ children, ...props }: any) => (
        <thead
            className="border-b border-zinc-200 dark:border-zinc-800 bg-surface-muted text-zinc-900 dark:text-zinc-100"
            {...props}
        >
            {children}
        </thead>
    ),
    tbody: ({ children, ...props }: any) => (
        <tbody
            className="divide-y divide-zinc-200 dark:divide-zinc-800/60"
            {...props}
        >
            {children}
        </tbody>
    ),
    tr: ({ children, ...props }: any) => (
        <tr
            className="hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40 transition-colors"
            {...props}
        >
            {children}
        </tr>
    ),
    th: ({ children, ...props }: any) => (
        <th className="px-4 py-2.5 font-semibold" {...props}>
            {children}
        </th>
    ),
    td: ({ children, ...props }: any) => (
        <td className="px-4 py-2.5 text-zinc-700 dark:text-zinc-300" {...props}>
            {children}
        </td>
    ),
    hr: () => <hr className="my-8 border-zinc-200 dark:border-zinc-800" />,
    // Custom Domain Primitives
    Callout,
    MetricsGrid,
};

interface MDXContentProps {
    source: string;
}

export function MDXContent({ source }: MDXContentProps) {
    return (
        <div className="mdx-content">
            <MDXRemote source={source} components={customComponents} />
        </div>
    );
}
