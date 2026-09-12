"use client";

import { useState } from "react";
import { type Project } from "@/lib/schemas";
import { ProjectCard } from "./ProjectCard";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectFilterProps {
    initialProjects: Project[];
}

const CATEGORIES = [
    "All",
    "AI & ML",
    "Data Engineering",
    "GenAI",
    "Systems",
] as const;

export function ProjectFilter({ initialProjects }: ProjectFilterProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProjects = initialProjects.filter((project) => {
        const matchesCategory =
            selectedCategory === "All" || project.category === selectedCategory;

        const matchesSearch =
            searchQuery.trim() === "" ||
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            project.technologies.some((t) =>
                t.toLowerCase().includes(searchQuery.toLowerCase()),
            ) ||
            project.tags.some((t) =>
                t.toLowerCase().includes(searchQuery.toLowerCase()),
            );

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Search & Category Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Category Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                                "px-2.5 py-1 rounded border transition-colors",
                                selectedCategory === cat
                                    ? "bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 border-transparent font-medium"
                                    : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600",
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search input */}
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search projects or tech..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded border border-zinc-200 dark:border-zinc-800 bg-surface pl-8 pr-3 py-1.5 text-xs font-mono placeholder:text-zinc-400 focus:outline-none focus:border-emerald-500 transition-colors text-zinc-900 dark:text-zinc-100"
                    />
                </div>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800 p-6">
                    <p className="font-mono text-xs text-zinc-500">
                        No projects match the selected filters.
                    </p>
                </div>
            )}
        </div>
    );
}
