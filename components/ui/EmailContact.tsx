"use client";

import { useState, useRef, useEffect } from "react";
import { Mail, Check, Copy, ExternalLink, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmailContactProps {
    email: string;
    variant?: "link" | "button" | "footer";
    direction?: "up" | "down";
    className?: string;
}

export function EmailContact({
    email,
    variant = "link",
    direction = "up",
    className,
}: EmailContactProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    // Close on click outside and Escape key
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy email", err);
        }
    };

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
    const mailtoUrl = `mailto:${email}`;

    return (
        <div className="relative inline-block" ref={popoverRef}>
            {variant === "link" && (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    aria-expanded={isOpen}
                    className={cn(
                        "text-emerald-600 dark:text-emerald-400 hover:underline font-semibold font-mono text-xs flex items-center gap-1 transition-colors cursor-pointer",
                        className
                    )}
                >
                    <span>Reach out via email</span>
                    <ArrowRight size={12} />
                </button>
            )}

            {variant === "button" && (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    aria-expanded={isOpen}
                    className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-200 dark:border-zinc-800 bg-surface hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm font-sans cursor-pointer",
                        className
                    )}
                >
                    <Mail size={14} />
                    <span>Email</span>
                </button>
            )}

            {variant === "footer" && (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    aria-expanded={isOpen}
                    className={cn(
                        "inline-flex items-center gap-1 hover:text-emerald-500 transition-colors cursor-pointer text-xs font-mono",
                        className
                    )}
                >
                    <span>Email</span>
                    <ArrowRight size={11} />
                </button>
            )}

            {isOpen && (
                <div
                    className={cn(
                        "absolute right-0 w-72 sm:w-80 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-3 shadow-xl shadow-zinc-900/10 dark:shadow-black/60 z-50 text-xs font-mono",
                        direction === "up" ? "bottom-full mb-2" : "top-full mt-2"
                    )}
                    role="dialog"
                    aria-label="Email options"
                >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-100 dark:border-zinc-800/80">
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
                            Direct Contact
                        </span>
                        <button
                            onClick={handleCopy}
                            type="button"
                            className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                        >
                            {copied ? (
                                <>
                                    <Check size={11} />
                                    <span>Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy size={11} />
                                    <span>Copy</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div className="text-zinc-700 dark:text-zinc-300 font-mono text-[11px] bg-zinc-100/80 dark:bg-zinc-900/80 px-2.5 py-1.5 rounded border border-zinc-200 dark:border-zinc-800 mb-2.5 truncate select-all">
                        {email}
                    </div>

                    <div className="space-y-1.5">
                        <a
                            href={gmailUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between px-2.5 py-2 rounded bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 transition-colors border border-zinc-200/50 dark:border-zinc-800/50"
                        >
                            <span className="flex items-center gap-2">
                                <Mail size={13} className="text-emerald-500 dark:text-emerald-400" />
                                <span>Open in Gmail (Web)</span>
                            </span>
                            <ExternalLink size={12} className="text-zinc-400" />
                        </a>

                        <a
                            href={mailtoUrl}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between px-2.5 py-2 rounded bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 transition-colors border border-zinc-200/50 dark:border-zinc-800/50"
                        >
                            <span className="flex items-center gap-2">
                                <ExternalLink size={13} className="text-sky-500 dark:text-sky-400" />
                                <span>Default Email App (mailto)</span>
                            </span>
                        </a>

                        <button
                            type="button"
                            onClick={handleCopy}
                            className="w-full flex items-center justify-between px-2.5 py-2 rounded bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 transition-colors border border-zinc-200/50 dark:border-zinc-800/50 cursor-pointer"
                        >
                            <span className="flex items-center gap-2">
                                {copied ? (
                                    <Check size={13} className="text-emerald-500 dark:text-emerald-400" />
                                ) : (
                                    <Copy size={13} className="text-amber-500 dark:text-amber-400" />
                                )}
                                <span>
                                    {copied ? "Copied to clipboard!" : "Copy email address"}
                                </span>
                            </span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
