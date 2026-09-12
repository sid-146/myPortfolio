import { Container } from "@/components/layout/Container";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { getAllProjects } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description:
        "Engineering projects, open source tools, and system implementations by Sudhanwa Kaveeshwar.",
};

export default function ProjectsPage() {
    const projects = getAllProjects();

    return (
        <Container size="default" className="py-12 sm:py-16 space-y-8">
            <div className="space-y-2 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Projects
                </h1>
                <p className="text-xs sm:text-sm font-mono text-zinc-500">
                    Case studies, open-source systems, and deep-learning
                    infrastructure.
                </p>
            </div>

            <ProjectFilter initialProjects={projects} />
        </Container>
    );
}
