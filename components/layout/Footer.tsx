import { Container } from "./Container";
import Link from "next/link";
import { Mail, Rss, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/Icons";
import { profileData } from "@/content/data/profile";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-20 border-t border-zinc-200 dark:border-zinc-800/80 bg-surface-muted/30 py-12 text-zinc-600 dark:text-zinc-400">
            <Container size="default">
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                    {/* Status & Identity */}
                    <div className="space-y-3 max-w-sm">
                        <div className="flex items-center gap-2 font-mono text-xs text-zinc-800 dark:text-zinc-200">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span>
                                Available for AI Systems & Data Engineering
                            </span>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            Designing high-throughput data systems, custom deep
                            learning inference engines, and robust evaluation
                            architectures.
                        </p>
                    </div>

                    {/* Connect / Links */}
                    <div className="grid grid-cols-2 gap-8 text-xs font-mono">
                        <div>
                            <p className="font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-3">
                                Navigation
                            </p>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/projects"
                                        className="hover:text-emerald-500 transition-colors"
                                    >
                                        projects
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/writing"
                                        className="hover:text-emerald-500 transition-colors"
                                    >
                                        writing
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/lab"
                                        className="hover:text-emerald-500 transition-colors"
                                    >
                                        lab experiments
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/experience"
                                        className="hover:text-emerald-500 transition-colors"
                                    >
                                        experience
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/now"
                                        className="hover:text-emerald-500 transition-colors"
                                    >
                                        now
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-3">
                                Connect
                            </p>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href={profileData.socials.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 hover:text-emerald-500 transition-colors"
                                    >
                                        <span>GitHub</span>
                                        <ArrowUpRight size={12} />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={profileData.socials.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 hover:text-emerald-500 transition-colors"
                                    >
                                        <span>LinkedIn</span>
                                        <ArrowUpRight size={12} />
                                    </a>
                                </li>
                                {profileData.socials.medium && (
                                    <li>
                                        <a
                                            href={profileData.socials.medium}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 hover:text-emerald-500 transition-colors"
                                        >
                                            <span>Medium</span>
                                            <ArrowUpRight size={12} />
                                        </a>
                                    </li>
                                )}
                                <li>
                                    <a
                                        href={`mailto:${profileData.socials.email}`}
                                        className="inline-flex items-center gap-1 hover:text-emerald-500 transition-colors"
                                    >
                                        <span>Email</span>
                                        <ArrowUpRight size={12} />
                                    </a>
                                </li>
                                <li>
                                    <Link
                                        href="/feed.xml"
                                        className="inline-flex items-center gap-1 hover:text-emerald-500 transition-colors"
                                    >
                                        <span>RSS Feed</span>
                                        <Rss size={11} />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-zinc-500">
                    <p>
                        © {currentYear} Sudhanwa Kaveeshwar. All rights
                        reserved.
                    </p>
                    <p>Built with Next.js, MDX & Tailwind CSS</p>
                </div>
            </Container>
        </footer>
    );
}
