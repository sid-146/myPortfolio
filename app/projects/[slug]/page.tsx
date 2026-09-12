import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { MDXContent } from "@/components/mdx/MDXContent";
import { MetricsGrid } from "@/components/mdx/MetricsGrid";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { formatDate, formatYear } from "@/lib/utils";
import { ArrowLeft, ExternalLink, Calendar, Tag, Activity } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import type { Metadata } from "next";

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const projects = getAllProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({
    params,
}: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return { title: "Project Not Found" };
    }

    return {
        title: project.metadata.title,
        description: project.metadata.description,
        openGraph: {
            title: `${project.metadata.title} | Sudhanwa Kaveeshwar`,
            description: project.metadata.description,
            type: "article",
        },
    };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const projectDoc = getProjectBySlug(slug);

    if (!projectDoc) {
        notFound();
    }

    const { metadata, content, readingTime } = projectDoc;

    return (
        <Container size="prose" className="py-12 sm:py-16 space-y-10">
            {/* Back button */}
            <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 hover:text-emerald-500 transition-colors"
            >
                <ArrowLeft size={14} />
                <span>back to projects</span>
            </Link>

            {/* Project Header */}
            <header className="space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-8">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500">
                    <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-medium">
                        {metadata.category}
                    </span>
                    <span>•</span>
                    <span>{formatDate(metadata.date)}</span>
                    {readingTime && (
                        <>
                            <span>•</span>
                            <span>{readingTime}</span>
                        </>
                    )}
                </div>

                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
                    {metadata.title}
                </h1>

                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {metadata.description}
                </p>

                {/* Action buttons & Repo link */}
                <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
                    {metadata.githubUrl && (
                        <a
                            href={metadata.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-200 dark:border-zinc-800 bg-surface hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors text-zinc-800 dark:text-zinc-200"
                        >
                            <GithubIcon size={14} />
                            <span>Source Repository</span>
                            <ExternalLink
                                size={12}
                                className="text-zinc-400 ml-0.5"
                            />
                        </a>
                    )}
                    {metadata.demoUrl && (
                        <Link
                            href={metadata.demoUrl}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors text-emerald-600 dark:text-emerald-400 font-medium"
                        >
                            <Activity size={14} />
                            <span>Live Demonstration</span>
                        </Link>
                    )}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[11px]">
                    {metadata.technologies.map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-surface-muted border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </header>

            {/* Metrics Banner */}
            {metadata.metrics && metadata.metrics.length > 0 && (
                <section>
                    <p className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
                        System Key Performance Indicators (KPIs)
                    </p>
                    <MetricsGrid metrics={metadata.metrics} />
                </section>
            )}

            {/* Main MDX Content */}
            <article className="prose prose-zinc dark:prose-invert max-w-none">
                <MDXContent source={content} />
            </article>

            {/* Footer Navigation */}
            <footer className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center font-mono text-xs">
                <Link
                    href="/projects"
                    className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                    <ArrowLeft size={13} />
                    <span>All Projects</span>
                </Link>
                {metadata.githubUrl && (
                    <a
                        href={metadata.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1"
                    >
                        <span>GitHub</span>
                        <ExternalLink size={12} />
                    </a>
                )}
            </footer>
        </Container>
    );
}
