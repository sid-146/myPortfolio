"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const extractText = (node: any): string => {
        if (typeof node === "string") return node;
        if (Array.isArray(node)) return node.map(extractText).join("");
        if (node?.props?.children) return extractText(node.props.children);
        return "";
    };

    const handleCopy = async () => {
        const text = extractText(children);
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code", err);
        }
    };

    return (
        <div className="relative group my-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-950 dark:bg-[#0c0c0e] overflow-hidden text-zinc-100">
            <div className="flex items-center justify-between px-4 py-1.5 border-b border-zinc-800/80 bg-zinc-900/60 font-mono text-[11px] text-zinc-400">
                <span>
                    {className ? className.replace("language-", "") : "code"}
                </span>
                <button
                    onClick={handleCopy}
                    aria-label="Copy code to clipboard"
                    className="flex items-center gap-1 hover:text-zinc-200 transition-colors p-1 rounded"
                >
                    {copied ? (
                        <>
                            <Check size={13} className="text-emerald-400" />
                            <span className="text-emerald-400">copied</span>
                        </>
                    ) : (
                        <>
                            <Copy size={13} />
                            <span>copy</span>
                        </>
                    )}
                </button>
            </div>
            <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed">
                <code className={className} {...props}>
                    {children}
                </code>
            </div>
        </div>
    );
}
