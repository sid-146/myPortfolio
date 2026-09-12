import Link from "next/link";
import { ArrowUpRight, Activity } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { type Project } from "@/lib/schemas";
import { formatYear } from "@/lib/utils";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="group relative rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-surface hover:border-zinc-400 dark:hover:border-zinc-700 transition-all p-5 flex flex-col justify-between">
            <div>
                {/* Header: Category & Year */}
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2.5">
                    <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[11px] font-medium">
                        {project.category}
                    </span>
                    <span>{formatYear(project.date)}</span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-base sm:text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    <Link
                        href={`/projects/${project.slug}`}
                        className="focus:outline-none"
                    >
                        <span className="absolute inset-0" aria-hidden="true" />
                        {project.title}
                    </Link>
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {project.description}
                </p>

                {/* Metrics Badge row if present */}
                {project.metrics && project.metrics.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 grid grid-cols-2 gap-2">
                        {project.metrics.slice(0, 2).map((m, idx) => (
                            <div key={idx} className="font-mono text-[11px]">
                                <span className="text-zinc-500 block text-[10px] uppercase truncate">
                                    {m.label}
                                </span>
                                <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                                    {m.value}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer: Tags & Links */}
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-zinc-500">
                    {project.technologies.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 3 && (
                        <span className="px-1 py-0.5 text-zinc-400">
                            +{project.technologies.length - 3}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2 relative z-10">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                            aria-label="View source on GitHub"
                        >
                            <GithubIcon size={14} />
                        </a>
                    )}
                    <span className="text-zinc-400 group-hover:text-emerald-500 transition-colors">
                        <ArrowUpRight size={15} />
                    </span>
                </div>
            </div>
        </div>
    );
}
