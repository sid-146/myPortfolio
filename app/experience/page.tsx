import { Container } from "@/components/layout/Container";
import { getAllExperience } from "@/lib/content";
import {
    Briefcase,
    Calendar,
    MapPin,
    CheckCircle2,
    TrendingUp,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Experience",
    description:
        "Career history, engineering leadership, and systems impact by Sudhanwa Kaveeshwar.",
};

export default function ExperiencePage() {
    const experiences = getAllExperience();

    return (
        <Container size="prose" className="py-12 sm:py-16 space-y-12">
            {/* Header */}
            <div className="space-y-2 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Experience
                </h1>
                <p className="text-xs sm:text-sm font-mono text-zinc-500">
                    Professional engineering track record, infrastructure
                    design, and measured impact.
                </p>
            </div>

            {/* Experience Timeline */}
            <div className="space-y-10">
                {experiences.map((exp, idx) => (
                    <div
                        key={idx}
                        className="relative pl-6 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-4"
                    >
                        {/* Timeline node */}
                        <div
                            className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 ${
                                exp.current
                                    ? "border-emerald-500 bg-background"
                                    : "border-zinc-400 dark:border-zinc-600 bg-background"
                            }`}
                        />

                        {/* Header: Role & Company */}
                        <div className="space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                    {exp.role}{" "}
                                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                                        @ {exp.company}
                                    </span>
                                </h2>
                                <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        {exp.period}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 font-mono text-xs text-zinc-400">
                                <span className="flex items-center gap-1">
                                    <MapPin size={12} />
                                    {exp.location}
                                </span>
                                <span>•</span>
                                <span>{exp.type}</span>
                            </div>
                        </div>

                        {/* Summary */}
                        <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            {exp.summary}
                        </p>

                        {/* Responsibilities list */}
                        <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                            {exp.responsibilities.map((resp, rIdx) => (
                                <li
                                    key={rIdx}
                                    className="flex items-start gap-2"
                                >
                                    <span className="text-emerald-500 font-mono mt-0.5">
                                        ›
                                    </span>
                                    <span className="leading-relaxed">
                                        {resp}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Impact Metrics */}
                        {exp.impactMetrics && exp.impactMetrics.length > 0 && (
                            <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-surface-muted/60 space-y-1.5">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                                    <TrendingUp size={12} />
                                    Key Results & Technical Milestones
                                </span>
                                <ul className="space-y-1 text-xs font-mono text-zinc-700 dark:text-zinc-300">
                                    {exp.impactMetrics.map((metric, mIdx) => (
                                        <li
                                            key={mIdx}
                                            className="flex items-center gap-1.5"
                                        >
                                            <span className="h-1 w-1 rounded-full bg-emerald-500" />
                                            <span>{metric}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px] text-zinc-500">
                            {exp.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
}
