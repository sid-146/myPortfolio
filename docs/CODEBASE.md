# Codebase Documentation

> **Portfolio of Sudhanwa Kaveeshwar**
> Stack: Next.js 15 · TypeScript · Tailwind CSS · MDX · Zod
> Architecture: App Router (Server Components) + File-system content

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [Configuration Files](#2-configuration-files)
3. [Library Layer (`lib/`)](#3-library-layer-lib)
4. [Content Layer (`content/`)](#4-content-layer-content)
5. [Application Routes (`app/`)](#5-application-routes-app)
6. [Components (`components/`)](#6-components-components)
7. [Public Assets (`public/`)](#7-public-assets-public)
8. [Data Flow: End-to-End](#8-data-flow-end-to-end)
9. [Styling System](#9-styling-system)
10. [Key Architectural Decisions](#10-key-architectural-decisions)

---

## 1. Project Structure

```
myPortfolio/
├── app/                    # Next.js App Router — routes & pages
│   ├── about/
│   ├── experience/
│   ├── feed.xml/
│   ├── lab/
│   ├── now/
│   ├── projects/
│   │   └── [slug]/
│   ├── resume/
│   ├── writing/
│   │   └── [slug]/
│   ├── globals.css         # Global CSS tokens & base styles
│   ├── layout.tsx          # Root layout (fonts, header, footer)
│   ├── not-found.tsx       # 404 page
│   ├── page.tsx            # Homepage
│   ├── robots.ts           # robots.txt generator
│   └── sitemap.ts          # Sitemap generator
│
├── components/             # Reusable UI components
│   ├── lab/                # Interactive Lab experiment widgets
│   ├── layout/             # Header, Footer, Container, ThemeToggle
│   ├── mdx/                # MDX rendering components
│   ├── projects/           # Project card & filter
│   ├── ui/                 # Shared UI primitives (Icons)
│   └── writing/            # Article card & Table of Contents
│
├── content/                # All site content (source of truth)
│   ├── data/               # TypeScript data files (structured data)
│   │   ├── experience.ts
│   │   ├── lab.ts
│   │   ├── now.ts
│   │   └── profile.ts
│   ├── projects/           # One .mdx file per project
│   └── writing/            # One .mdx file per article
│
├── lib/                    # Server-side utilities and content loaders
│   ├── content.ts          # File-system content readers
│   ├── schemas.ts          # Zod validation schemas
│   └── utils.ts            # Shared helper functions
│
├── public/                 # Static assets served at root URL
│   └── Sudhanwa_Kaveeshwar_Resume.pdf
│
├── .eslintrc.json
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 2. Configuration Files

### `package.json`

Declares all dependencies and npm scripts.

| Script          | Purpose                                      |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Start development server at `localhost:3000` |
| `npm run build` | Production build (static pre-render + RSC)   |
| `npm run start` | Run the production build locally             |
| `npm run lint`  | ESLint check                                 |

**Key dependencies:**

| Package                   | Purpose                                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| `next`                    | Framework (App Router, SSG, image optimization)                                                     |
| `react`, `react-dom`      | UI rendering                                                                                        |
| `typescript`              | Static typing                                                                                       |
| `tailwindcss`             | Utility-first CSS                                                                                   |
| `@tailwindcss/typography` | Prose styling for MDX content                                                                       |
| `gray-matter`             | Parses YAML frontmatter from `.mdx` files                                                           |
| `next-mdx-remote`         | Renders MDX content as React on the server                                                          |
| `zod`                     | Runtime schema validation for frontmatter data                                                      |
| `clsx`, `tailwind-merge`  | Safe Tailwind class merging utilities                                                               |
| `lucide-react`            | Icon library (Note: `Github/Linkedin/Twitter` NOT exported — use `components/ui/Icons.tsx` instead) |

---

### `tsconfig.json`

Standard Next.js TypeScript configuration with one critical addition:

```json
{
    "compilerOptions": {
        "paths": {
            "@/*": ["./*"]
        }
    }
}
```

The `@/*` path alias allows any file to import from the project root using `@/lib/...`, `@/components/...`, `@/content/...` instead of fragile relative paths like `../../lib/...`.

---

### `next.config.mjs`

```js
const nextConfig = {
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    reactStrictMode: true,
    images: {
        remotePatterns: [{ protocol: "https", hostname: "**" }],
    },
};
```

- **`pageExtensions`**: Tells Next.js to recognize `.mdx` and `.md` files as valid page files.
- **`reactStrictMode`**: Enables double-render in development to catch side effects.
- **`images.remotePatterns`**: Allows `next/image` to optimize images from any HTTPS source.

---

### `tailwind.config.ts`

Extends Tailwind with:

- **`darkMode: "class"`** — Dark mode is controlled by adding the `dark` class to the `<html>` element (toggled by `ThemeToggle.tsx`).
- **Custom fonts**: `--font-sans` (Inter) and `--font-mono` (JetBrains Mono) CSS variables, injected by `app/layout.tsx`.
- **Custom colors**:
    - `background`, `foreground` — mapped to CSS variables for theme switching
    - `surface`, `surface.muted`, `surface.border` — card/panel surfaces
    - `accent` — Emerald `#10b981` (the primary brand color)
- **Typography plugin**: Configured to inherit color from parent, remove backtick pseudo-content, and accent links on hover.

---

### `postcss.config.mjs`

Minimal PostCSS setup required for Tailwind CSS processing and vendor prefix injection.

---

### `.eslintrc.json`

Uses Next.js's recommended ESLint rules. Enforces accessibility, performance, and React best practices.

---

## 3. Library Layer (`lib/`)

These files run **only on the server** (Node.js environment at build time or on the server in SSR).

---

### `lib/schemas.ts`

Defines **Zod schemas** for every content type. Zod validates data at runtime, providing type safety and helpful error messages when content has malformed frontmatter.

#### `ProjectSchema`

Validates MDX frontmatter for projects in `content/projects/`.

| Field          | Type       | Required | Notes                                                                      |
| -------------- | ---------- | -------- | -------------------------------------------------------------------------- |
| `title`        | `string`   | Yes      | Display name                                                               |
| `slug`         | `string`   | Yes      | URL path segment                                                           |
| `description`  | `string`   | Yes      | Short summary                                                              |
| `date`         | `string`   | Yes      | Format: `YYYY-MM-DD`                                                       |
| `category`     | enum       | Yes      | `"AI & ML"`, `"Data Engineering"`, `"Systems"`, `"Open Source"`, `"GenAI"` |
| `status`       | enum       | Yes      | `"completed"`, `"active"`, `"maintained"`, `"experimental"`                |
| `technologies` | `string[]` | Yes      | Tech stack                                                                 |
| `tags`         | `string[]` | Yes      | Searchable tags                                                            |
| `githubUrl`    | `string`   | Optional | GitHub repo URL                                                            |
| `demoUrl`      | `string`   | Optional | Live demo URL                                                              |
| `featured`     | `boolean`  | Optional | Show on homepage (default: `false`)                                        |
| `metrics`      | `object[]` | Optional | `{ label, value, change? }` KPI grid                                       |
| `order`        | `number`   | Optional | Manual sort override                                                       |

#### `ArticleSchema`

Validates MDX frontmatter for articles in `content/writing/`.

| Field          | Type       | Required | Notes                                      |
| -------------- | ---------- | -------- | ------------------------------------------ |
| `title`        | `string`   | Yes      | Display title                              |
| `slug`         | `string`   | Yes      | URL path segment                           |
| `date`         | `string`   | Yes      | Format: `YYYY-MM-DD`                       |
| `description`  | `string`   | Yes      | Short summary                              |
| `tags`         | `string[]` | Yes      | Topic labels                               |
| `readingTime`  | `string`   | Optional | Auto-calculated if absent                  |
| `published`    | `boolean`  | Optional | `false` hides everywhere (default: `true`) |
| `canonicalUrl` | `string`   | Optional | Must be a valid URL                        |

#### `ExperienceSchema`

Validates entries in `content/data/experience.ts`.

| Field              | Type       | Required | Notes                                                                      |
| ------------------ | ---------- | -------- | -------------------------------------------------------------------------- |
| `company`          | `string`   | Yes      | Company name                                                               |
| `role`             | `string`   | Yes      | Job title                                                                  |
| `period`           | `string`   | Yes      | Free-form date range                                                       |
| `location`         | `string`   | Yes      | City, Country                                                              |
| `type`             | enum       | Yes      | `"Full-time"`, `"Contract"`, `"Open Source"`, `"Research"`, `"Internship"` |
| `summary`          | `string`   | Yes      | One-paragraph role summary                                                 |
| `responsibilities` | `string[]` | Yes      | Achievement bullet points                                                  |
| `technologies`     | `string[]` | Yes      | Tools used                                                                 |
| `impactMetrics`    | `string[]` | Optional | Highlight stats                                                            |
| `current`          | `boolean`  | Optional | Highlights as current role (default: `false`)                              |

#### `LabItemSchema`

Validates entries in `content/data/lab.ts`.

| Field         | Type       | Required | Notes                                                           |
| ------------- | ---------- | -------- | --------------------------------------------------------------- |
| `title`       | `string`   | Yes      | Display name                                                    |
| `slug`        | `string`   | Yes      | Unique identifier                                               |
| `description` | `string`   | Yes      | Card description                                                |
| `category`    | enum       | Yes      | `"GenAI"`, `"Embeddings"`, `"Data Structures"`, `"Distributed"` |
| `date`        | `string`   | Yes      | Format: `YYYY-MM-DD`                                            |
| `status`      | enum       | Yes      | `"Interactive"`, `"Prototype"`, `"Research"`                    |
| `tags`        | `string[]` | Yes      | Topic labels                                                    |
| `componentId` | `string`   | Yes      | Maps to a React component name                                  |

#### `ProfileSchema`

Validates the single object in `content/data/profile.ts`.

| Field                    | Type             | Required | Notes                      |
| ------------------------ | ---------------- | -------- | -------------------------- |
| `name`                   | `string`         | Yes      | Full name                  |
| `headline`               | `string`         | Yes      | Short tagline              |
| `role`                   | `string`         | Yes      | Longer role description    |
| `location`               | `string`         | Yes      | Current city/country       |
| `bio`                    | `string`         | Yes      | Multi-sentence bio         |
| `currentFocus`           | `string`         | Yes      | Current work focus         |
| `socials.github`         | `string` (URL)   | Yes      | Must start with `https://` |
| `socials.linkedin`       | `string` (URL)   | Yes      | Must start with `https://` |
| `socials.x`              | `string` (URL)   | Optional | Twitter/X URL              |
| `socials.email`          | `string` (email) | Yes      | Valid email address        |
| `skills.languages`       | `string[]`       | Yes      | Programming languages      |
| `skills.aiAndMl`         | `string[]`       | Yes      | AI/ML tools                |
| `skills.dataEngineering` | `string[]`       | Yes      | Data engineering tools     |
| `skills.systemsAndInfra` | `string[]`       | Yes      | Infrastructure tools       |

---

### `lib/content.ts`

The **central content loading module**. Reads files from disk and validates them against schemas. All functions are server-side only.

| Function                 | Returns                                         | Source                       |
| ------------------------ | ----------------------------------------------- | ---------------------------- |
| `getAllProjects()`       | `Project[]` sorted newest first                 | `content/projects/*.mdx`     |
| `getFeaturedProjects()`  | `Project[]` where `featured: true`              | Subset of above              |
| `getProjectBySlug(slug)` | `MDXDocument<Project> \| null`                  | Single `.mdx` file           |
| `getAllArticles()`       | `Article[]` sorted newest first, published only | `content/writing/*.mdx`      |
| `getArticleBySlug(slug)` | `MDXDocument<Article> \| null`                  | Single `.mdx` file           |
| `getProfile()`           | `Profile`                                       | `content/data/profile.ts`    |
| `getAllExperience()`     | `Experience[]`                                  | `content/data/experience.ts` |
| `getAllLabItems()`       | `LabItem[]`                                     | `content/data/lab.ts`        |
| `getNowData()`           | Raw `nowData` object                            | `content/data/now.ts`        |

**Internal flow for `getAllProjects()`:**

1. Reads all `.mdx` / `.md` files from `content/projects/`
2. Parses YAML frontmatter with `gray-matter`
3. Falls back to filename as `slug` if not set in frontmatter
4. Validates with `ProjectSchema.safeParse()` — logs errors, skips invalid files
5. Returns sorted array (newest date first)

**`MDXDocument<T>` interface:**

```ts
interface MDXDocument<T> {
    metadata: T; // Validated frontmatter typed object
    content: string; // Raw MDX body string
    readingTime?: string; // e.g. "5 min read"
}
```

---

### `lib/utils.ts`

Shared utility functions used across the app.

| Function                 | Signature                               | Description                                                                               |
| ------------------------ | --------------------------------------- | ----------------------------------------------------------------------------------------- |
| `cn()`                   | `cn(...inputs: ClassValue[])`           | Merges Tailwind class names safely (clsx + tailwind-merge). Prevents conflicting classes. |
| `formatDate()`           | `formatDate(dateStr: string)`           | `"2024-03-15"` → `"Mar 15, 2024"`                                                         |
| `formatYear()`           | `formatYear(dateStr: string)`           | `"2024-03-15"` → `"2024"`                                                                 |
| `calculateReadingTime()` | `calculateReadingTime(content: string)` | Counts words, divides by 200 wpm → `"5 min read"`                                         |

---

## 4. Content Layer (`content/`)

No database, no CMS. All content lives in these files. **To update content = edit these files.**

---

### `content/data/profile.ts`

Single exported `profileData` object. Controls name, bio, headline, location, social links, and the four skill category arrays displayed on the homepage and About page.

---

### `content/data/experience.ts`

Exported `experienceData` array. Each object = one job on the Experience page timeline. **Array order = display order** on the page.

---

### `content/data/lab.ts`

Exported `labData` array. Each item = one interactive experiment on the Lab page. The `componentId` field must match the name of a React component imported in `app/lab/page.tsx`.

---

### `content/data/now.ts`

Exported `nowData` object. Controls the `/now` page — a snapshot of current focus, reading list, and setup. Updated manually whenever your focus changes.

---

### `content/projects/*.mdx`

One file per project. Six current files:

- `attention-from-scratch.mdx`
- `automated-flight-data-pipeline.mdx`
- `distributed-stream-processor.mdx`
- `genai-rag-evaluation-pipeline.mdx`
- `mind-scope.mdx`
- `parquet-lakehouse-engine.mdx`

Each file = YAML frontmatter (validated by `ProjectSchema`) + Markdown/MDX prose body.

**⚠️ Warning:** Do **not** use `$...$` (LaTeX math) in MDX prose. The acorn JS parser treats `$` as JavaScript expression syntax and will break the build. Use plain text or `` `code spans` `` for math notation.

---

### `content/writing/*.mdx`

One file per article. Four current files:

- `building-evals-for-llm-agents.mdx`
- `distributed-state-in-event-driven-architectures.mdx`
- `understanding-kv-cache-optimization.mdx`
- `zero-copy-data-pipelines-in-rust.mdx`

Articles with `published: false` are invisible on all listing pages and return 404 on direct URL access.

---

## 5. Application Routes (`app/`)

All pages are **React Server Components** by default. Components needing browser APIs are explicitly marked `"use client"`.

---

### `app/layout.tsx` — Root Layout

Runs on every page. Responsibilities:

- Loads Inter (sans-serif) and JetBrains Mono fonts via `next/font/google`. Injects as CSS variables `--font-sans` and `--font-mono`.
- Wraps all pages with `<Header>` and `<Footer>`.
- Sets global `<head>` metadata (title template, description, OpenGraph, robots directives).

---

### `app/globals.css` — Global CSS

Defines CSS custom properties (variables) for the two-theme system:

```css
:root {
    /* Dark mode defaults */
}
.light {
    /* Light mode overrides */
}
```

Theme switching works by toggling the `light` class on `<html>` — when removed, dark-mode variables apply; when added, light-mode variables apply. All Tailwind color utilities (`bg-background`, `text-foreground`, etc.) resolve to these variables.

---

### `app/page.tsx` — Homepage

Server component. Calls `getFeaturedProjects()`, `getAllArticles()`, `getProfile()`, `getAllExperience()`. Renders: Hero → Featured Projects → Recent Writing → Experience snippet → Skills.

---

### `app/about/page.tsx` — About

Static server component. Reads `getProfile()`. Renders extended bio, skills grid by category, and philosophy/approach sections.

---

### `app/projects/page.tsx` — Projects List

Reads all projects via `getAllProjects()`. Passes them to `<ProjectFilter>` (client component) for real-time search and category filtering.

---

### `app/projects/[slug]/page.tsx` — Project Detail

Dynamic route. Calls `getProjectBySlug(slug)`. Renders: project metadata, status/category badges, tech stack chips, metrics grid (if any), MDX body, GitHub/demo links. Exports `generateStaticParams()` for full static pre-rendering at build time.

---

### `app/writing/page.tsx` — Writing List

Reads all published articles via `getAllArticles()`. Renders each as an `<ArticleCard>`.

---

### `app/writing/[slug]/page.tsx` — Article Detail

Dynamic route. Calls `getArticleBySlug(slug)`. Renders: article header, `<TableOfContents>` sticky sidebar, MDX body. Exports `generateStaticParams()`.

---

### `app/lab/page.tsx` — Lab

Server component shell that imports and renders three interactive client components:

- `<AttentionVisualizer />`
- `<TokenizerExplorer />`
- `<VectorSimilarityLab />`

Lab item metadata from `getAllLabItems()` populates the description cards.

---

### `app/experience/page.tsx` — Experience

Reads `getAllExperience()`. Renders a vertical timeline with role, company, period, responsibilities, impact metrics per entry. The entry with `current: true` is visually highlighted.

---

### `app/now/page.tsx` — Now

Reads `getNowData()`. Renders `lastUpdated`, `location`, `headline`, and all `sections` as distinct content blocks.

---

### `app/resume/page.tsx` — Resume

Static server component. Renders a structured resume layout. The download buttons use native HTML `<a download>` — no JavaScript, no print dialog:

```html
<a
    href="/Sudhanwa_Kaveeshwar_Resume.pdf"
    download="Sudhanwa_Kaveeshwar_Resume.pdf"
>
    Download PDF
</a>
```

---

### `app/sitemap.ts` — Sitemap

Next.js sitemap function. Generates `/sitemap.xml` with all static routes + all project and article slugs.

---

### `app/robots.ts` — robots.txt

Generates `/robots.txt`. Allows all bots and points to the sitemap.

---

### `app/feed.xml/route.ts` — RSS Feed

Route Handler generating RSS 2.0 XML from all published articles. Accessible at `/feed.xml`.

---

### `app/not-found.tsx` — 404

Shown for any unmatched route. Minimal design with a link back to the homepage.

---

## 6. Components (`components/`)

---

### `components/layout/Container.tsx`

A layout wrapper `<div>` with max-width and horizontal padding. Used on every page to constrain content width consistently.

---

### `components/layout/Header.tsx`

Site-wide navigation header. Contains:

- Site name / logo linking to `/`
- Navigation links: Home, Projects, Writing, Lab, Experience, Now, Resume
- `<ThemeToggle>` button
- Mobile hamburger menu (client-side state)

---

### `components/layout/Footer.tsx`

Footer with secondary navigation links, social icon links (GitHub, LinkedIn, X), and copyright text.

---

### `components/layout/ThemeToggle.tsx`

`"use client"` — toggles dark/light theme. On mount: reads `localStorage.theme`, falls back to `prefers-color-scheme` media query. On click: toggles `light` class on `<html>`, saves to `localStorage`.

---

### `components/mdx/MDXContent.tsx`

Renders raw MDX string using `next-mdx-remote/rsc`. Provides custom component overrides:

- `h2`, `h3` — add `id` attributes derived from heading text (for TOC anchor links)
- `pre` / `code` — rendered as `<CodeBlock>`
- `blockquote` — styled callout box
- `a` — external links open in new tab with `rel="noopener noreferrer"`

Available custom components usable inside any `.mdx` file: `<Callout>`, `<MetricsGrid>`

---

### `components/mdx/CodeBlock.tsx`

`"use client"` — renders `<pre><code>` blocks with a language badge and a clipboard copy button (shows checkmark for 2 seconds after click).

---

### `components/mdx/Callout.tsx`

Styled aside block. Usage in MDX:

```mdx
<Callout type="info">Note text here.</Callout>
<Callout type="warning">Warning text here.</Callout>
```

---

### `components/mdx/MetricsGrid.tsx`

Renders a responsive grid of KPI metric cards. Usage in MDX:

```mdx
<MetricsGrid metrics={[{ label: "Speed", value: "3x", change: "+200%" }]} />
```

---

### `components/projects/ProjectCard.tsx`

Displays a single project. Shows: title, description, category badge, status badge, technology chips, featured marker. Links to `/projects/{slug}`.

---

### `components/projects/ProjectFilter.tsx`

`"use client"` — receives all projects as props. Maintains local state for active category filter and search query. Renders filtered `<ProjectCard>` list with no server round-trips.

---

### `components/writing/ArticleCard.tsx`

Displays a single article as a list item: title, description, formatted date, reading time, tag chips. Links to `/writing/{slug}`.

---

### `components/writing/TableOfContents.tsx`

`"use client"` — parses `h2`/`h3` headings from the raw MDX content string. Renders a sticky sidebar list of anchor links. Uses `IntersectionObserver` to highlight the currently visible section as the user scrolls.

---

### `components/lab/AttentionVisualizer.tsx`

`"use client"` — interactive attention heatmap. Lets users adjust query/key vectors and visualizes softmax attention scores across a token sequence in real time using canvas or SVG.

---

### `components/lab/TokenizerExplorer.tsx`

`"use client"` — simulates byte-pair encoding tokenization on user-provided input text. Shows colored token boundaries, token IDs, byte lengths, and efficiency metrics.

---

### `components/lab/VectorSimilarityLab.tsx`

`"use client"` — 2D canvas where users drag vector endpoints. Computes and displays cosine similarity, dot product, and Euclidean distance live.

---

### `components/ui/Icons.tsx`

Custom SVG icon components. **Must be used for all social icon links** — `lucide-react` v0.511 does not export `Github`, `Linkedin`, or `Twitter`.

Exports:

- `GithubIcon` — GitHub mark SVG
- `LinkedinIcon` — LinkedIn "in" logo SVG
- `TwitterIcon` — X (Twitter) bird/X logo SVG

Props: `className?: string`, `size?: number`

---

## 7. Public Assets (`public/`)

Files here are served directly at the root URL with no processing.

| File                             | Served at                         | Purpose         |
| -------------------------------- | --------------------------------- | --------------- |
| `Sudhanwa_Kaveeshwar_Resume.pdf` | `/Sudhanwa_Kaveeshwar_Resume.pdf` | Resume download |

Place images, fonts, or other binary assets here. Reference them with absolute root-relative paths (`/image.png`, not `./image.png`).

---

## 8. Data Flow: End-to-End

### MDX Content Pages (Projects & Writing)

```
.mdx file on disk
  │
  ▼
gray-matter.parse()         ← Splits YAML frontmatter from body
  │
  ├─► frontmatter (YAML)
  │     │
  │     ▼
  │   Zod schema.safeParse()  ← Validates all fields and enums
  │     │
  │     ▼
  │   Typed TypeScript object (Project | Article)
  │
  └─► content (MDX string)
        │
        ▼
      MDXRemote.render()      ← Renders MDX as React Server Component tree
        │
        ▼
      Page component           ← Assembles metadata + rendered MDX
        │
        ▼
      Static HTML response
```

### Static Data Pages (Experience, Now, Lab, Profile)

```
content/data/*.ts
  │
  ▼
Direct TS import in lib/content.ts
  │
  ▼
Zod schema.parse()            ← Validates on build
  │
  ▼
Typed array / object
  │
  ▼
Page component renders
```

### Theme Switching

```
User clicks ThemeToggle
  │
  ▼
Toggle "light" class on <html>
  │
  ├─► Write to localStorage.theme
  │
  ▼
CSS vars in globals.css resolve to light-mode values
  │
  ▼
All Tailwind semantic color classes update automatically
```

---

## 9. Styling System

Three-layer architecture:

1. **CSS Custom Properties** (`app/globals.css`) — semantic color tokens. Values swap between dark/light themes.

2. **Tailwind Config** (`tailwind.config.ts`) — maps CSS vars to Tailwind utility names (`bg-background`, `text-foreground`, `bg-surface`, `border-surface-border`).

3. **Components** — use semantic Tailwind names. No per-component `dark:` variants needed for core colors.

**Accent color**: Emerald `#10b981`. Available as `text-accent`, `bg-accent`, `border-accent`.

**Font system**: Two CSS variables (`--font-sans`, `--font-mono`) injected on `<html>` by `next/font`. Consumed by Tailwind `font-sans` and `font-mono` utilities.

**MDX prose**: `@tailwindcss/typography` (`prose` class). Configured to inherit color and accent hover links via `#10b981`.

---

## 10. Key Architectural Decisions

| Decision                                   | Reason                                                                               |
| ------------------------------------------ | ------------------------------------------------------------------------------------ |
| No CMS / database                          | Zero infrastructure cost. Content lives in Git. Works fully offline.                 |
| Server Components by default               | No JS shipped to client for content pages. Faster load, better SEO.                  |
| `"use client"` only at leaf components     | Interactive widgets isolated. Parent pages stay server-rendered.                     |
| Zod validation on all content              | Catches typos/missing fields at build time. No silent broken pages.                  |
| `gray-matter` for frontmatter              | Industry-standard, handles edge cases. No custom regex parsing.                      |
| Custom SVG icons                           | `lucide-react` v0.511 missing `Github/Linkedin/Twitter`. Custom SVG is reliable.     |
| `next/font/google`                         | Fonts via CSS variable injection into `<html>`. Avoids Next.js `<link>` tag warning. |
| `generateStaticParams()` on dynamic routes | All project/article pages pre-rendered to static HTML. No server at runtime.         |
| No `$...$` math in MDX                     | acorn (MDX JS parser) treats `$` as JS expression delimiter — causes parse errors.   |
