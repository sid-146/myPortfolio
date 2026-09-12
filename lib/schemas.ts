import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string(),
  date: z.string(), // YYYY-MM-DD
  category: z.enum(["AI & ML", "Data Engineering", "Systems", "Open Source", "GenAI"]),
  status: z.enum(["completed", "active", "maintained", "experimental"]),
  technologies: z.array(z.string()),
  tags: z.array(z.string()),
  githubUrl: z.string().optional(),
  demoUrl: z.string().optional(),
  featured: z.boolean().default(false),
  metrics: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        change: z.string().optional(),
      })
    )
    .optional(),
  order: z.number().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const ArticleSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  date: z.string(), // YYYY-MM-DD
  description: z.string(),
  tags: z.array(z.string()),
  readingTime: z.string().optional(),
  published: z.boolean().default(true),
  canonicalUrl: z.string().url().optional(),
});

export type Article = z.infer<typeof ArticleSchema>;

export const ExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  period: z.string(),
  location: z.string(),
  type: z.enum(["Full-time", "Contract", "Open Source", "Research", "Internship"]),
  summary: z.string(),
  responsibilities: z.array(z.string()),
  technologies: z.array(z.string()),
  impactMetrics: z.array(z.string()).optional(),
  current: z.boolean().default(false),
});

export type Experience = z.infer<typeof ExperienceSchema>;

export const LabItemSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  category: z.enum(["GenAI", "Embeddings", "Data Structures", "Distributed"]),
  date: z.string(),
  status: z.enum(["Interactive", "Prototype", "Research"]),
  tags: z.array(z.string()),
  componentId: z.string(),
});

export type LabItem = z.infer<typeof LabItemSchema>;

export const ProfileSchema = z.object({
  name: z.string(),
  headline: z.string(),
  role: z.string(),
  location: z.string(),
  bio: z.string(),
  currentFocus: z.string(),
  socials: z.object({
    github: z.string().url(),
    linkedin: z.string().url(),
    x: z.string().url().optional(),
    email: z.string().email(),
  }),
  skills: z.object({
    languages: z.array(z.string()),
    aiAndMl: z.array(z.string()),
    dataEngineering: z.array(z.string()),
    systemsAndInfra: z.array(z.string()),
  }),
});

export type Profile = z.infer<typeof ProfileSchema>;
