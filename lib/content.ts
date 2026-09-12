import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  ProjectSchema,
  ArticleSchema,
  ExperienceSchema,
  LabItemSchema,
  ProfileSchema,
  type Project,
  type Article,
  type Experience,
  type LabItem,
  type Profile,
} from "./schemas";
import { calculateReadingTime } from "./utils";
import { profileData } from "@/content/data/profile";
import { experienceData } from "@/content/data/experience";
import { labData } from "@/content/data/lab";
import { nowData } from "@/content/data/now";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");
const WRITING_DIR = path.join(process.cwd(), "content/writing");

export interface MDXDocument<T> {
  metadata: T;
  content: string;
  readingTime?: string;
}

// -------------------------------------------------------------
// Projects Loader
// -------------------------------------------------------------
export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const projects = files
    .map((file) => {
      const fullPath = path.join(PROJECTS_DIR, file);
      const fileContents = fs.readFileSync(fullPath, "utf-8");
      const { data } = matter(fileContents);
      const slug = file.replace(/\.mdx?$/, "");

      const parsed = ProjectSchema.safeParse({
        ...data,
        slug: data.slug || slug,
      });

      if (!parsed.success) {
        console.error(`Invalid project frontmatter in ${file}:`, parsed.error.format());
        return null;
      }
      return parsed.data;
    })
    .filter((p): p is Project => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return projects;
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): MDXDocument<Project> | null {
  const mdxPath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  const mdPath = path.join(PROJECTS_DIR, `${slug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;

  if (!fullPath) return null;

  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContents);

  const parsed = ProjectSchema.safeParse({
    ...data,
    slug: data.slug || slug,
  });

  if (!parsed.success) {
    console.error(`Invalid project frontmatter in ${slug}:`, parsed.error.format());
    return null;
  }

  return {
    metadata: parsed.data,
    content,
    readingTime: calculateReadingTime(content),
  };
}

// -------------------------------------------------------------
// Writing / Articles Loader
// -------------------------------------------------------------
export function getAllArticles(): Article[] {
  if (!fs.existsSync(WRITING_DIR)) return [];

  const files = fs.readdirSync(WRITING_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const articles = files
    .map((file) => {
      const fullPath = path.join(WRITING_DIR, file);
      const fileContents = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(fileContents);
      const slug = file.replace(/\.mdx?$/, "");

      const readingTime = data.readingTime || calculateReadingTime(content);

      const parsed = ArticleSchema.safeParse({
        ...data,
        slug: data.slug || slug,
        readingTime,
      });

      if (!parsed.success) {
        console.error(`Invalid article frontmatter in ${file}:`, parsed.error.format());
        return null;
      }
      return parsed.data;
    })
    .filter((a): a is Article => a !== null && a.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return articles;
}

export function getArticleBySlug(slug: string): MDXDocument<Article> | null {
  const mdxPath = path.join(WRITING_DIR, `${slug}.mdx`);
  const mdPath = path.join(WRITING_DIR, `${slug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;

  if (!fullPath) return null;

  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContents);

  const readingTime = data.readingTime || calculateReadingTime(content);

  const parsed = ArticleSchema.safeParse({
    ...data,
    slug: data.slug || slug,
    readingTime,
  });

  if (!parsed.success) {
    console.error(`Invalid article frontmatter in ${slug}:`, parsed.error.format());
    return null;
  }

  return {
    metadata: parsed.data,
    content,
    readingTime,
  };
}

// -------------------------------------------------------------
// Static Data Getters
// -------------------------------------------------------------
export function getProfile(): Profile {
  return ProfileSchema.parse(profileData);
}

export function getAllExperience(): Experience[] {
  return experienceData.map((e) => ExperienceSchema.parse(e));
}

export function getAllLabItems(): LabItem[] {
  return labData.map((item) => LabItemSchema.parse(item));
}

export function getNowData() {
  return nowData;
}
