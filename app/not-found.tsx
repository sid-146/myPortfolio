import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
    return (
        <Container size="prose" className="py-24 text-center space-y-6">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-surface-muted border border-zinc-200 dark:border-zinc-800 text-zinc-500">
                <Terminal size={24} />
            </div>

            <div className="space-y-2">
                <h1 className="font-mono text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                    404 — Not Found
                </h1>
                <p className="text-xs sm:text-sm font-mono text-zinc-500">
                    The requested route does not exist in this namespace.
                </p>
            </div>

            <div>
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-surface hover:border-emerald-500 transition-colors font-mono text-xs text-zinc-800 dark:text-zinc-200"
                >
                    <ArrowLeft size={14} />
                    <span>Return Home</span>
                </Link>
            </div>
        </Container>
    );
}
