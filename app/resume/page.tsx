import { Container } from "@/components/layout/Container";
import { profileData } from "@/content/data/profile";
import { experienceData } from "@/content/data/experience";
import { Download, Mail, MapPin, Award, Zap, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon, MediumIcon } from "@/components/ui/Icons";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resume",
    description:
        "Curriculum Vitae of Sudhanwa Kaveeshwar - AI & Data Systems Engineer.",
};

const KEY_ACHIEVEMENTS = [
    {
        title: "NLP Solutions Implementation",
        desc: "Implemented NLP solutions increasing self-serve analytics adoption by 300% (3x), enhancing user insight generation.",
    },
    {
        title: "Python Data Ingestion Efficiency",
        desc: "Achieved Python data ingestion under 10 minutes for over 1 million rows from BigQuery, enhancing data processing efficiency.",
    },
    {
        title: "AI Assistance Efficiency",
        desc: "Created AI-powered assistance, completing 5+ user journeys and boosting operational efficiency by 30%.",
    },
];

const CERTIFICATIONS = [
    {
        name: "Databricks Fundamentals Accreditation",
        issuer: "Databricks",
    },
    {
        name: "Python Basics for Data Science",
        issuer: "IBM",
    },
];

export default function ResumePage() {
    return (
        <Container size="prose" className="py-12 sm:py-16 space-y-10">
            {/* Action bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Curriculum Vitae
                    </h1>
                    <p className="text-xs font-mono text-zinc-500 mt-0.5">
                        Engineering background, achievements, and professional
                        timeline.
                    </p>
                </div>

                <a
                    href="/Sudhanwa_Kaveeshwar_Resume.pdf"
                    download="Sudhanwa_Kaveeshwar_Resume.pdf"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold transition-colors shadow-sm"
                >
                    <Download size={14} />
                    <span>Download PDF</span>
                </a>
            </div>

            {/* Resume Document Content */}
            <div className="space-y-8">
                {/* Header / Identity */}
                <header className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="space-y-1">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                            {profileData.name}
                        </h2>
                        <p className="font-mono text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
                            {profileData.headline}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-zinc-500">
                        <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            {profileData.location}
                        </span>
                        <a
                            href={`mailto:${profileData.socials.email}`}
                            className="flex items-center gap-1 hover:underline text-zinc-600 dark:text-zinc-400 hover:text-emerald-500"
                        >
                            <Mail size={12} />
                            {profileData.socials.email}
                        </a>
                        <a
                            href={profileData.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:underline text-zinc-600 dark:text-zinc-400 hover:text-emerald-500"
                        >
                            <GithubIcon size={12} />
                            github.com/sid-146
                        </a>
                        <a
                            href={profileData.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:underline text-zinc-600 dark:text-zinc-400 hover:text-emerald-500"
                        >
                            <LinkedinIcon size={12} />
                            linkedin.com/in/sudhanwa-kaveeshwar
                        </a>
                        {profileData.socials.medium && (
                            <a
                                href={profileData.socials.medium}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 hover:underline text-zinc-600 dark:text-zinc-400 hover:text-emerald-500"
                            >
                                <MediumIcon size={12} />
                                medium.com/@sudhanwa.kaveeshwar
                            </a>
                        )}
                    </div>
                </header>

                {/* Summary */}
                <section className="space-y-2">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800/80 pb-1">
                        Executive Summary
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        AI engineering professional with over 3 years of
                        experience in data engineering and AI agent development,
                        expert in Python and Generative AI technologies. Key
                        achievements include reducing revenue processing time by
                        85% through optimized ETL pipelines with Azure
                        Databricks & SQL, and enhancing user engagement by
                        deploying AI-powered Assistant Bots that completed 5+
                        user journeys across 2 channels, resulting in a 30%
                        boost in operational efficiency.
                    </p>
                </section>

                {/* Key Achievements */}
                <section className="space-y-2.5">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800/80 pb-1 flex items-center gap-1.5">
                        <Zap size={13} className="text-emerald-500" />
                        Key Achievements
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                        {KEY_ACHIEVEMENTS.map((ach, idx) => (
                            <div
                                key={idx}
                                className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-surface-muted/50 space-y-1"
                            >
                                <span className="font-semibold text-emerald-600 dark:text-emerald-400 block text-[11px]">
                                    {ach.title}
                                </span>
                                <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                                    {ach.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Work Experience */}
                <section className="space-y-6">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800/80 pb-1">
                        Work Experience
                    </h3>
                    <div className="space-y-6">
                        {experienceData.map((exp, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                                    <div>
                                        <h4 className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
                                            {exp.role} —{" "}
                                            <span className="text-emerald-600 dark:text-emerald-400">
                                                {exp.company}
                                            </span>
                                        </h4>
                                        <span className="font-mono text-xs text-zinc-500">
                                            {exp.location}
                                        </span>
                                    </div>
                                    <span className="font-mono text-xs text-zinc-500">
                                        {exp.period}
                                    </span>
                                </div>

                                <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 ml-4 list-disc">
                                    {exp.responsibilities.map((resp, rIdx) => (
                                        <li
                                            key={rIdx}
                                            className="leading-relaxed"
                                        >
                                            {resp}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px] text-zinc-500">
                                    {exp.technologies.map((t) => (
                                        <span
                                            key={t}
                                            className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Technical Skills */}
                <section className="space-y-2">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800/80 pb-1">
                        Technical Competencies
                    </h3>
                    <div className="space-y-1.5 font-mono text-xs">
                        <div>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                                Technologies & AI:{" "}
                            </span>
                            <span className="text-zinc-600 dark:text-zinc-400">
                                Generative AI, LLM, Prompt Engineering, RAG,
                                Agentic AI, LangChain, OpenAI SDK, HuggingFace
                            </span>
                        </div>
                        <div>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                                Languages & Libraries:{" "}
                            </span>
                            <span className="text-zinc-600 dark:text-zinc-400">
                                Python, SQL, Pandas, Pydantic, Streamlit,
                                SQLAlchemy, FastAPI, NLP
                            </span>
                        </div>
                        <div>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                                Database & Data Store:{" "}
                            </span>
                            <span className="text-zinc-600 dark:text-zinc-400">
                                MySQL, Postgres DB, Azure Blob Storage, Delta
                                Format, AWS S3, Parquet Format, Neo4j, RDS
                            </span>
                        </div>
                        <div>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                                Tools & Platforms:{" "}
                            </span>
                            <span className="text-zinc-600 dark:text-zinc-400">
                                Azure Data Factory, Apache Airflow, Apache
                                Kafka, Azure Databricks, PowerBI, Synapse,
                                Docker, Kubernetes, AWS (Lambda, Redshift,
                                Fargate)
                            </span>
                        </div>
                    </div>
                </section>

                {/* Education & Certifications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    {/* Education */}
                    <section className="space-y-2">
                        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800/80 pb-1">
                            Education
                        </h3>
                        <div className="font-mono text-xs space-y-1">
                            <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm block">
                                Bachelor of Technology In Computer Science
                            </span>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Acropolis Institute of Technology and Research
                            </p>
                            <p className="text-zinc-500">
                                2019 — 2023 | Indore, India
                            </p>
                        </div>
                    </section>

                    {/* Certifications */}
                    <section className="space-y-2">
                        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800/80 pb-1 flex items-center gap-1">
                            <Award size={13} className="text-emerald-500" />
                            Certifications
                        </h3>
                        <div className="font-mono text-xs space-y-2">
                            {CERTIFICATIONS.map((cert, idx) => (
                                <div key={idx} className="space-y-0.5">
                                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">
                                        {cert.name}
                                    </span>
                                    <span className="text-emerald-600 dark:text-emerald-400 text-[11px]">
                                        {cert.issuer}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Bottom Download CTA Bar */}
                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                    <span className="font-mono text-xs text-zinc-500">
                        Looking for an offline copy?
                    </span>
                    <a
                        href="/Sudhanwa_Kaveeshwar_Resume.pdf"
                        download="Sudhanwa_Kaveeshwar_Resume.pdf"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-200 dark:border-zinc-800 bg-surface hover:border-emerald-500 text-zinc-800 dark:text-zinc-200 font-mono text-xs transition-colors"
                    >
                        <Download size={13} />
                        <span>Download PDF</span>
                    </a>
                </div>
            </div>
        </Container>
    );
}
