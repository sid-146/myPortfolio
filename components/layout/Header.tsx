"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { href: "/projects", label: "projects" },
    { href: "/writing", label: "writing" },
    { href: "/lab", label: "lab" },
    { href: "/experience", label: "experience" },
    { href: "/about", label: "about" },
    { href: "/now", label: "now" },
    { href: "/resume", label: "resume" },
];

export function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800/80 bg-background/85 backdrop-blur-md">
            <Container size="default">
                <div className="flex h-14 items-center justify-between">
                    {/* Logo / Brand */}
                    <Link
                        href="/"
                        className="group flex items-center gap-2 font-mono text-xs sm:text-sm font-medium tracking-tight text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                        <span className="flex h-5 w-5 items-center justify-center rounded bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 font-bold text-[10px]">
                            SK
                        </span>
                        <span className="font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                            sudhanwa.k
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1 font-mono text-xs">
                        {NAV_ITEMS.map((item) => {
                            const isActive =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname === item.href ||
                                      pathname.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "px-2.5 py-1.5 rounded transition-colors",
                                        isActive
                                            ? "text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10"
                                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60",
                                    )}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Actions: Theme toggle & Mobile menu button */}
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden flex items-center justify-center w-8 h-8 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                            aria-label="Toggle navigation menu"
                        >
                            {mobileMenuOpen ? (
                                <X size={16} />
                            ) : (
                                <Menu size={16} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Drawer */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 py-3 space-y-1 font-mono text-xs">
                        <Link
                            href="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                                "block px-3 py-2 rounded",
                                pathname === "/"
                                    ? "text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10"
                                    : "text-zinc-600 dark:text-zinc-400",
                            )}
                        >
                            / home
                        </Link>
                        {NAV_ITEMS.map((item) => {
                            const isActive =
                                pathname === item.href ||
                                pathname.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                        "block px-3 py-2 rounded",
                                        isActive
                                            ? "text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10"
                                            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                                    )}
                                >
                                    / {item.label}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </Container>
        </header>
    );
}
