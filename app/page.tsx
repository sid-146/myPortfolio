import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ArticleCard } from "@/components/writing/ArticleCard";
import {
    getFeaturedProjects,
    getAllArticles,
    getAllExperience,
    getProfile,
    getNowData,
} from "@/lib/content";
import { ArrowRight, Mail, Terminal, Sparkles, Activity } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/Icons";
import { formatYear } from "@/lib/utils";

export default function HomePage() {
    const profile = getProfile();
    const featuredProjects = getFeaturedProjects().slice(0, 3);
    const recentArticles = getAllArticles().slice(0, 3);
    const experiences = getAllExperience();
    const now = getNowData();

    return (
        <Container size="default" className="py-12 sm:py-16 space-y-16">
            {/* 1. Identity & Intro */}
            <section className="space-y-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                        <Terminal size={14} />
                        <span>systems_engineer.sh</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        {profile.name}
                    </h1>
                    <p className="text-sm sm:text-base font-mono text-zinc-600 dark:text-zinc-400">
                        {profile.role}
                    </p>
                </div>

                <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 max-w-2xl leading-relaxed">
                    {profile.bio}
                </p>

                {/* Social Links */}
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono">
                    <a
                        href={profile.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-200 dark:border-zinc-800 bg-surface hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors text-zinc-700 dark:text-zinc-300"
                    >
                        <GithubIcon size={14} />
                        <span>GitHub</span>
                    </a>
                    <a
                        href={profile.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-200 dark:border-zinc-800 bg-surface hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors text-zinc-700 dark:text-zinc-300"
                    >
                        <LinkedinIcon size={14} />
                        <span>LinkedIn</span>
                    </a>
                    {profile.socials.x && (
                        <a
                            href={profile.socials.x}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-200 dark:border-zinc-800 bg-surface hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors text-zinc-700 dark:text-zinc-300"
                        >
                            <TwitterIcon size={14} />
                            <span>X / Twitter</span>
                        </a>
                    )}
                    <a
                        href={`mailto:${profile.socials.email}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-200 dark:border-zinc-800 bg-surface hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors text-zinc-700 dark:text-zinc-300"
                    >
                        <Mail size={14} />
                        <span>Email</span>
                    </a>
                </div>
            </section>

            {/* 2. Currently Building */}
            <section className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 sm:p-5">
                <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span>Currently Building</span>
                    </div>
                    <Link
                        href="/now"
                        className="text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                        <span>/now</span>
                        <ArrowRight size={12} />
                    </Link>
                </div>
                <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-mono">
                    {profile.currentFocus}
                </p>
            </section>

            {/* 3. Selected Projects */}
            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                    <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <span>Selected Projects</span>
                        <span className="text-xs font-mono text-zinc-400 font-normal">
                            ({featuredProjects.length})
                        </span>
                    </h2>
                    <Link
                        href="/projects"
                        className="text-xs font-mono text-zinc-500 hover:text-emerald-500 flex items-center gap-1 transition-colors"
                    >
                        <span>view all projects</span>
                        <ArrowRight size={13} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {featuredProjects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>
            </section>

            {/* 4. Experience Snapshot */}
            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                    <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Recent Experience
                    </h2>
                    <Link
                        href="/experience"
                        className="text-xs font-mono text-zinc-500 hover:text-emerald-500 flex items-center gap-1 transition-colors"
                    >
                        <span>full timeline</span>
                        <ArrowRight size={13} />
                    </Link>
                </div>

                <div className="space-y-4">
                    {experiences.map((exp, idx) => (
                        <div
                            key={idx}
                            className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-surface flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                        >
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                        {exp.role}
                                    </h3>
                                    <span className="text-xs font-mono text-zinc-400">
                                        @ {exp.company}
                                    </span>
                                </div>
                                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
                                    {exp.summary}
                                </p>
                                <div className="flex flex-wrap gap-1 pt-1 font-mono text-[10px] text-zinc-500">
                                    {exp.technologies
                                        .slice(0, 4)
                                        .map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/60"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                </div>
                            </div>

                            <div className="font-mono text-xs text-zinc-400 shrink-0 text-right">
                                <span>{exp.period}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. Engineering Notes / Writing */}
            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                    <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Engineering Notes & Writing
                    </h2>
                    <Link
                        href="/writing"
                        className="text-xs font-mono text-zinc-500 hover:text-emerald-500 flex items-center gap-1 transition-colors"
                    >
                        <span>all articles</span>
                        <ArrowRight size={13} />
                    </Link>
                </div>

                <div className="divide-y divide-zinc-200 dark:divide-zinc-800/60">
                    {recentArticles.map((article) => (
                        <ArticleCard key={article.slug} article={article} />
                    ))}
                </div>
            </section>
        </Container>
    );
}
