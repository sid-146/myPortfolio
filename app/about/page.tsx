import { Container } from "@/components/layout/Container";
import { getProfile } from "@/lib/content";
import {
    Terminal,
    Cpu,
    Database,
    Network,
    BookOpen,
    Layers,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description:
        "About Sudhanwa Kaveeshwar - AI Engineering, Data Systems, and Architectural Philosophy.",
};

export default function AboutPage() {
    const profile = getProfile();

    return (
        <Container size="prose" className="py-12 sm:py-16 space-y-12">
            {/* Header */}
            <div className="space-y-2 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    About
                </h1>
                <p className="text-xs sm:text-sm font-mono text-zinc-500">
                    Background, architectural philosophy, and engineering
                    toolkit.
                </p>
            </div>

            {/* Bio / Background */}
            <section className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                <p>
                    I am <strong>Sudhanwa Kaveeshwar</strong>, an engineer
                    focused on the intersection of deep learning inference
                    systems, distributed data infrastructure, and generative AI
                    architecture.
                </p>
                <p>
                    Over the past several years, I have worked on scaling
                    high-throughput streaming systems, writing custom CUDA
                    kernels for attention acceleration, and designing evaluation
                    pipelines for multi-agent LLM systems.
                </p>
                <p>
                    My engineering work is guided by the principle of{" "}
                    <em>mechanical sympathy</em>—understanding how hardware,
                    memory hierarchies, and operating system caches function so
                    we can write software that fully utilizes compute resources
                    rather than masking inefficiencies with excessive cloud
                    infrastructure.
                </p>
            </section>

            {/* Engineering Philosophy */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <Layers size={18} className="text-emerald-500" />
                    <span>Core Engineering Principles</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-surface space-y-2">
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold block uppercase">
                            1. Measure Before Optimizing
                        </span>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Profile instruction stalls, memory bandwidth
                            saturation, and cache misses before making
                            architectural assumptions.
                        </p>
                    </div>

                    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-surface space-y-2">
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold block uppercase">
                            2. Zero Unnecessary Infra
                        </span>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Prefer single-process vectorized engines over
                            sprawling distributed clusters when local memory
                            bandwidth suffices.
                        </p>
                    </div>

                    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-surface space-y-2">
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold block uppercase">
                            3. Deterministic Evaluation
                        </span>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Avoid vibe-driven LLM development. Enforce
                            unit-tested rubrics, statistical significance, and
                            ground-truth assertions.
                        </p>
                    </div>

                    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-surface space-y-2">
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold block uppercase">
                            4. Columnar & Zero-Copy
                        </span>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Eliminate serialization overheads at ingestion
                            boundaries using Apache Arrow and cache-aligned
                            record batches.
                        </p>
                    </div>
                </div>
            </section>

            {/* Tech Stack Matrix */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <Cpu size={18} className="text-emerald-500" />
                    <span>Technical Stack & Systems</span>
                </h2>

                <div className="space-y-3 font-mono text-xs">
                    <div className="p-3.5 rounded border border-zinc-200 dark:border-zinc-800 bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-zinc-500 w-36 uppercase font-semibold">
                            Languages
                        </span>
                        <div className="flex flex-wrap gap-1.5 text-zinc-800 dark:text-zinc-200">
                            {profile.skills.languages.map((lang) => (
                                <span
                                    key={lang}
                                    className="px-2 py-0.5 rounded bg-surface-muted border border-zinc-200 dark:border-zinc-800"
                                >
                                    {lang}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="p-3.5 rounded border border-zinc-200 dark:border-zinc-800 bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-zinc-500 w-36 uppercase font-semibold">
                            AI & ML Systems
                        </span>
                        <div className="flex flex-wrap gap-1.5 text-zinc-800 dark:text-zinc-200">
                            {profile.skills.aiAndMl.map((item) => (
                                <span
                                    key={item}
                                    className="px-2 py-0.5 rounded bg-surface-muted border border-zinc-200 dark:border-zinc-800"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="p-3.5 rounded border border-zinc-200 dark:border-zinc-800 bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-zinc-500 w-36 uppercase font-semibold">
                            Data Engineering
                        </span>
                        <div className="flex flex-wrap gap-1.5 text-zinc-800 dark:text-zinc-200">
                            {profile.skills.dataEngineering.map((item) => (
                                <span
                                    key={item}
                                    className="px-2 py-0.5 rounded bg-surface-muted border border-zinc-200 dark:border-zinc-800"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="p-3.5 rounded border border-zinc-200 dark:border-zinc-800 bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-zinc-500 w-36 uppercase font-semibold">
                            Systems & Infra
                        </span>
                        <div className="flex flex-wrap gap-1.5 text-zinc-800 dark:text-zinc-200">
                            {profile.skills.systemsAndInfra.map((item) => (
                                <span
                                    key={item}
                                    className="px-2 py-0.5 rounded bg-surface-muted border border-zinc-200 dark:border-zinc-800"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Connect section */}
            <section className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between font-mono text-xs">
                <span className="text-zinc-500">
                    Interested in technical collaboration?
                </span>
                <a
                    href={`mailto:${profile.socials.email}`}
                    className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                >
                    Reach out via email →
                </a>
            </section>
        </Container>
    );
}
