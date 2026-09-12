"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("theme") as
            | "dark"
            | "light"
            | null;
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches;
        const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

        setTheme(initialTheme);
        if (initialTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
        if (nextTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    if (!mounted) {
        return (
            <div className="w-8 h-8 rounded border border-zinc-200 dark:border-zinc-800 bg-surface-muted" />
        );
    }

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-8 h-8 rounded border border-zinc-200 dark:border-zinc-800 bg-surface hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>
    );
}
