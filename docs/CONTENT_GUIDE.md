# Content Management Guide

> How to add, update, and remove content from the portfolio site.
> No deep code knowledge required for most tasks — just edit files and rebuild.

---

## Table of Contents

1. [Quick Reference](#1-quick-reference)
2. [Projects](#2-projects)
3. [Articles (Writing)](#3-articles-writing)
4. [Experience](#4-experience)
5. [Profile & About](#5-profile--about)
6. [Now Page](#6-now-page)
7. [Lab Experiments](#7-lab-experiments)
8. [Resume PDF](#8-resume-pdf)
9. [After Editing — Preview & Deploy](#9-after-editing--preview--deploy)
10. [Common Mistakes](#10-common-mistakes)

---

## 1. Quick Reference

| What you want to change     | Edit this file                                    |
| --------------------------- | ------------------------------------------------- |
| Add a project               | Create `content/projects/{slug}.mdx`              |
| Edit a project              | Edit `content/projects/{slug}.mdx`                |
| Remove a project            | Delete `content/projects/{slug}.mdx`              |
| Add an article              | Create `content/writing/{slug}.mdx`               |
| Edit an article             | Edit `content/writing/{slug}.mdx`                 |
| Hide an article (keep file) | Set `published: false` in frontmatter             |
| Update work experience      | Edit `content/data/experience.ts`                 |
| Update profile/bio/skills   | Edit `content/data/profile.ts`                    |
| Update the Now page         | Edit `content/data/now.ts`                        |
| Add a lab experiment        | Edit `content/data/lab.ts` + create component     |
| Replace resume PDF          | Overwrite `public/Sudhanwa_Kaveeshwar_Resume.pdf` |

---

## 2. Projects

**Location:** `content/projects/`
**One `.mdx` file per project.**

---

### Add a Project

1. Create a new file: `content/projects/my-project-name.mdx`
   The filename (without `.mdx`) becomes the URL slug: `/projects/my-project-name`

2. Add the **required frontmatter** at the top, between `---` delimiters:

```mdx
---
title: "My Project Title"
description: "One or two sentence summary shown on the projects list."
date: "2024-09-01"
category: "AI & ML"
status: "completed"
technologies: ["Python", "PyTorch", "FastAPI"]
tags: ["AI", "Research", "Open Source"]
featured: false
githubUrl: "https://github.com/sid-146/my-project"
demoUrl: "https://my-demo.example.com"
---

## Overview

Write your project description here in Markdown.

## Architecture

Describe the system design here.

## Results

What did you achieve?
```

3. **Save the file.** The project appears automatically on `/projects`. No other file needs to change.

---

### Required vs Optional Frontmatter Fields

| Field          | Required | Type       | Allowed Values / Notes                                                         |
| -------------- | -------- | ---------- | ------------------------------------------------------------------------------ |
| `title`        | YES      | `string`   | Display name                                                                   |
| `description`  | YES      | `string`   | Short summary for list page                                                    |
| `date`         | YES      | `string`   | Format: `"YYYY-MM-DD"`                                                         |
| `category`     | YES      | enum       | `"AI & ML"` / `"Data Engineering"` / `"Systems"` / `"Open Source"` / `"GenAI"` |
| `status`       | YES      | enum       | `"completed"` / `"active"` / `"maintained"` / `"experimental"`                 |
| `technologies` | YES      | `string[]` | Array of tech stack items                                                      |
| `tags`         | YES      | `string[]` | Used for search filtering                                                      |
| `featured`     | Optional | `boolean`  | `true` = appears on homepage. Default: `false`                                 |
| `githubUrl`    | Optional | `string`   | GitHub repo link                                                               |
| `demoUrl`      | Optional | `string`   | Live demo URL                                                                  |
| `metrics`      | Optional | `object[]` | KPI cards. See below.                                                          |
| `order`        | Optional | `number`   | Manual sort override                                                           |

**Metrics frontmatter example** (shows as a KPI card grid on the project detail page):

```yaml
metrics:
    - label: "Latency Reduction"
      value: "85%"
      change: "-850ms avg"
    - label: "Throughput"
      value: "10k events/s"
```

---

### Edit a Project

1. Open `content/projects/{slug}.mdx`
2. Change any frontmatter fields or the prose body below the second `---`
3. Save — changes appear on next build / dev refresh

---

### Remove a Project

Delete the `.mdx` file. The project page and all links to it disappear automatically on next build.

---

### Make a Project Featured (Homepage)

Set `featured: true` in frontmatter. The project will appear in the "Featured Projects" section on the homepage.

To un-feature, set `featured: false` (or remove the field entirely — it defaults to `false`).

---

### Using MDX Components Inside Project Pages

Inside any `.mdx` file body you can use these custom components:

```mdx
<Callout type="info">This is a highlighted information box.</Callout>

<Callout type="warning">This is a warning box.</Callout>
```

```mdx
<MetricsGrid
    metrics={[
        { label: "Speed", value: "3x faster" },
        { label: "Cost Reduction", value: "40%", change: "vs. baseline" },
    ]}
/>
```

---

## 3. Articles (Writing)

**Location:** `content/writing/`
**One `.mdx` file per article.**

---

### Add an Article

1. Create: `content/writing/my-article-title.mdx`
2. Add frontmatter:

```mdx
---
title: "My Article Title"
description: "Brief description shown on the writing list page."
date: "2024-09-01"
tags: ["Python", "Data Engineering", "Tutorial"]
published: true
---

## Introduction

Article body goes here...
```

3. The article appears at `/writing/my-article-title`.

---

### Required vs Optional Frontmatter Fields

| Field          | Required | Type       | Notes                                             |
| -------------- | -------- | ---------- | ------------------------------------------------- |
| `title`        | YES      | `string`   | Display title                                     |
| `description`  | YES      | `string`   | Short description for list page                   |
| `date`         | YES      | `string`   | Format: `"YYYY-MM-DD"`                            |
| `tags`         | YES      | `string[]` | Topic labels                                      |
| `published`    | Optional | `boolean`  | `false` hides article everywhere. Default: `true` |
| `readingTime`  | Optional | `string`   | Auto-calculated if omitted (e.g., `"5 min read"`) |
| `canonicalUrl` | Optional | `string`   | If cross-posted elsewhere, the original URL       |

---

### Draft / Hide an Article

Set `published: false` in frontmatter. The file stays on disk but is invisible on listing pages and returns 404 on direct URL access.

```yaml
---
title: "Work In Progress"
published: false
---
```

---

### Remove an Article

Delete the `.mdx` file. It disappears from all pages and the RSS feed automatically.

---

### Table of Contents

The article detail page automatically generates a Table of Contents from `## Heading` (h2) and `### Heading` (h3) tags in your article body. Just use proper Markdown headings — no extra config needed.

---

### Math / Equations in MDX

Do NOT use `$...$` or `$$...$$` for LaTeX math. The MDX parser treats `$` as a JavaScript expression delimiter and will break the build.

```
WRONG:  The loss is $L = -sum(y log y_hat)$
RIGHT:  The loss is L = -sum(y * log(y_hat))
RIGHT:  The loss is `L = -sum(y * log(y_hat))`
```

---

## 4. Experience

**Location:** `content/data/experience.ts`

---

### Add a New Job

Open the file and add a new object to the `experienceData` array. Add it at the **top of the array** if it is your most recent role:

```ts
export const experienceData = [
    // Add new job at the top for most-recent-first ordering
    {
        company: "Acme Corp",
        role: "Senior AI Engineer",
        period: "2025 — Present",
        location: "Bangalore, India",
        type: "Full-time" as const,
        summary: "One paragraph summarizing what you did in this role.",
        responsibilities: [
            "Key responsibility with a measurable outcome.",
            "Another responsibility with impact numbers.",
        ],
        technologies: ["Python", "LangChain", "Kubernetes"],
        impactMetrics: ["40% latency reduction", "2x throughput improvement"],
        current: true,
    },
    // ... existing entries below
];
```

---

### Field Reference

| Field              | Required | Type       | Allowed Values / Notes                                                         |
| ------------------ | -------- | ---------- | ------------------------------------------------------------------------------ |
| `company`          | YES      | `string`   | Company name                                                                   |
| `role`             | YES      | `string`   | Job title                                                                      |
| `period`           | YES      | `string`   | Free-form. e.g. `"2024 — Present"` or `"07/2023 — 10/2024"`                    |
| `location`         | YES      | `string`   | City, Country                                                                  |
| `type`             | YES      | enum       | `"Full-time"` / `"Contract"` / `"Open Source"` / `"Research"` / `"Internship"` |
| `summary`          | YES      | `string`   | One-paragraph role overview                                                    |
| `responsibilities` | YES      | `string[]` | Achievement bullet points                                                      |
| `technologies`     | YES      | `string[]` | Tools and tech stack used                                                      |
| `impactMetrics`    | Optional | `string[]` | Highlight stats shown as chips                                                 |
| `current`          | Optional | `boolean`  | `true` highlights this as your current role                                    |

---

### Edit a Job

Find the object for that role in the array, edit the relevant fields, save.

---

### Remove a Job

Delete the entire object (`{ ... },`) from the array. Make sure to remove any trailing comma issues to keep valid JavaScript syntax.

---

### Change Display Order

Move objects up or down in the array. **Array order = display order** on the Experience page.

---

## 5. Profile & About

**Location:** `content/data/profile.ts`

This single file controls everything shown as "you" on the homepage and About page.

---

### Update Name, Headline, Bio, Location

```ts
export const profileData = {
    name: "Sudhanwa Kaveeshwar",
    headline:
        "AI Engineer | AI Agent Development | Generative AI & Data Systems",
    role: "AI & Data Engineer specializing in Generative AI, LLM Integration, and Distributed Data Pipelines",
    location: "Pune, Maharashtra, India",
    bio: "Your professional bio — multi-sentence, first person or third person.",
    currentFocus: "What you are actively building or researching right now.",
    // ...
};
```

---

### Update Social Links

```ts
socials: {
  github: "https://github.com/your-username",     // Must be https:// URL
  linkedin: "https://linkedin.com/in/your-handle", // Must be https:// URL
  x: "https://x.com/your-handle",                 // Optional. Remove to hide X icon.
  email: "your@email.com",                         // Must be valid email format
},
```

Note: `github`, `linkedin`, and `x` are validated as full URLs by Zod. They must start with `https://`. `email` is validated as a proper email address.

---

### Update Skills

Add or remove items from the four string arrays:

```ts
skills: {
  languages: ["Python", "SQL", "TypeScript", "Rust"],
  aiAndMl: ["LangChain", "OpenAI SDK", "Hugging Face", "RAG"],
  dataEngineering: ["Apache Kafka", "Azure Databricks", "BigQuery"],
  systemsAndInfra: ["Docker", "Kubernetes", "AWS", "Apache Airflow"],
},
```

Each array maps to a skill category displayed on the About page and homepage skills grid.

---

## 6. Now Page

**Location:** `content/data/now.ts`

The Now page is a Derek Sivers-style page showing what you are currently focused on. It is updated manually whenever your focus shifts.

---

### Update "Now" Content

```ts
export const nowData = {
    lastUpdated: "2024-09-01", // Shown prominently at the top
    location: "Pune, India", // Where you currently are
    headline: "What I'm focused on right now.",

    sections: [
        {
            title: "Building",
            items: [
                "Describe what you are actively building.",
                "Another project or feature.",
            ],
        },
        {
            title: "Learning & Researching",
            items: [
                "A topic you are studying.",
                "A paper or concept you are exploring.",
            ],
        },
        {
            title: "Reading",
            items: ["Book Title by Author Name."],
        },
        {
            title: "Hardware / Setup",
            items: ["Current machine or workflow setup."],
        },
    ],
};
```

**To add a section:** Add a `{ title, items: [] }` object to `sections`.
**To remove a section:** Delete its object from `sections`.
**To update items:** Edit strings inside the `items` array.

Remember to update `lastUpdated` whenever you edit this file so visitors know when it was last refreshed.

---

## 7. Lab Experiments

**Location:** `content/data/lab.ts` + `components/lab/` + `app/lab/page.tsx`

Adding a Lab experiment requires **three coordinated changes**.

---

### Step 1 — Create the React Component

Create `components/lab/MyExperiment.tsx`:

```tsx
"use client"; // REQUIRED — lab components use browser APIs

import { useState } from "react";

export default function MyExperiment() {
    const [input, setInput] = useState("");

    return (
        <div className="p-4 bg-surface rounded-lg border border-surface-border">
            <h3 className="font-mono text-sm font-semibold mb-3 text-foreground">
                My Experiment
            </h3>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-surface-muted border border-surface-border rounded px-3 py-2 text-sm font-mono"
                placeholder="Enter input..."
            />
            {/* Render your interactive visualization here */}
        </div>
    );
}
```

---

### Step 2 — Register in lab.ts

Open `content/data/lab.ts` and add an entry:

```ts
export const labData = [
    // ... existing items ...
    {
        title: "My New Experiment",
        slug: "my-new-experiment", // Unique slug for this item
        description:
            "What this experiment demonstrates and why it is interesting.",
        category: "GenAI" as const, // "GenAI" | "Embeddings" | "Data Structures" | "Distributed"
        date: "2024-09-01",
        status: "Interactive" as const, // "Interactive" | "Prototype" | "Research"
        tags: ["Tag1", "Tag2"],
        componentId: "MyExperiment", // Must match your component's default export name
    },
];
```

---

### Step 3 — Import in Lab Page

Open `app/lab/page.tsx` and add:

```tsx
// Add import at the top
import MyExperiment from "@/components/lab/MyExperiment";

// Add JSX inside the page render
<section id="my-new-experiment" className="...">
    <MyExperiment />
</section>;
```

---

### Lab Item Field Reference

| Field         | Required | Type       | Allowed Values                                                     |
| ------------- | -------- | ---------- | ------------------------------------------------------------------ |
| `title`       | YES      | `string`   | Display name                                                       |
| `slug`        | YES      | `string`   | Unique identifier                                                  |
| `description` | YES      | `string`   | Shown on the Lab page card                                         |
| `category`    | YES      | enum       | `"GenAI"` / `"Embeddings"` / `"Data Structures"` / `"Distributed"` |
| `date`        | YES      | `string`   | Format: `"YYYY-MM-DD"`                                             |
| `status`      | YES      | enum       | `"Interactive"` / `"Prototype"` / `"Research"`                     |
| `tags`        | YES      | `string[]` | Topic labels                                                       |
| `componentId` | YES      | `string`   | Component export name (for metadata tracking)                      |

---

### Remove a Lab Experiment

1. Delete `components/lab/MyExperiment.tsx`
2. Remove its object from `content/data/lab.ts`
3. Remove the import and JSX from `app/lab/page.tsx`

---

## 8. Resume PDF

**Location:** `public/Sudhanwa_Kaveeshwar_Resume.pdf`

---

### Replace the PDF

1. Export your latest resume as a PDF
2. Rename the file to exactly: `Sudhanwa_Kaveeshwar_Resume.pdf`
3. Place it in the `public/` folder, replacing the existing file:

```
myPortfolio/
└── public/
    └── Sudhanwa_Kaveeshwar_Resume.pdf   <- Replace this file
```

No code changes needed. The download button on `/resume` already points to this path.

---

### Change the PDF Filename

If you want to rename the file:

1. Rename the PDF in `public/`
2. Open `app/resume/page.tsx` and update both `href` and `download` attributes (appears twice — once at the top, once at the bottom of the page):

```tsx
// Find:
<a href="/Sudhanwa_Kaveeshwar_Resume.pdf" download="Sudhanwa_Kaveeshwar_Resume.pdf">

// Change to:
<a href="/YourNewFileName.pdf" download="YourNewFileName.pdf">
```

---

## 9. After Editing — Preview & Deploy

### Preview Changes Locally

```bash
npm run dev
```

Visit `http://localhost:3000`. Changes to `.ts` and `.tsx` files hot-reload. Changes to `.mdx` files require a browser refresh.

---

### Verify Build Before Deploying

Always run a production build before pushing:

```bash
npm run build
```

A successful build prints something like:

```
Route (app)                               Size
├ ○ /                                     4.2 kB
├ ○ /projects                             2.1 kB
...
```

If the build fails, read the error output — it usually identifies which file and field is invalid.

---

### Deploy

Push changes to your Git repository. If connected to Vercel or Netlify, deployment happens automatically on every push to `main`.

---

## 10. Common Mistakes

### Wrong `category` or `status` value

Zod enforces exact string matches. A typo silently skips the item.

Correct `category` for projects:

```
"AI & ML"  |  "Data Engineering"  |  "Systems"  |  "Open Source"  |  "GenAI"
```

Correct `status` for projects:

```
"completed"  |  "active"  |  "maintained"  |  "experimental"
```

---

### Using `$` in MDX content

```
WRONG:  The loss function is $L = -sum(y log y_hat)$.
RIGHT:  The loss function is L = -sum(y * log(y_hat)).
RIGHT:  The loss function is `L = -sum(y * log(y_hat))`.
```

The `$` character triggers a JavaScript expression parse in MDX and will cause the build to fail.

---

### Missing required frontmatter field

If you omit a required field like `technologies`, the file is silently skipped. The project or article won't appear anywhere. Check the terminal running `npm run dev` for lines like:

```
Invalid project frontmatter in my-project.mdx: { technologies: ... }
```

---

### Wrong date format

Always use `"YYYY-MM-DD"`:

```yaml
date: "2024-09-01"   # Correct
date: "Sep 1, 2024"  # Wrong
date: "01/09/2024"   # Wrong
```

Other formats may cause incorrect date sorting or display.

---

### Multiple `current: true` in experience

Only one experience entry should have `current: true`. Multiple `true` values will visually highlight all of them as active roles.

---

### `componentId` mismatch in lab.ts

The `componentId` field in `lab.ts` is for metadata only. The component that actually renders is determined by the `import` in `app/lab/page.tsx`. Both must be consistent — adding a lab item without adding the import to the page means the experiment won't appear.

---

### Forgetting `as const` on enum fields in `.ts` data files

TypeScript data files (`.ts`) require `as const` type assertions on enum fields so Zod can validate them:

```ts
// Correct
type: "Full-time" as const,
status: "Interactive" as const,

// Wrong — TypeScript infers type as string, Zod rejects it
type: "Full-time",
status: "Interactive",
```

This applies to all fields in `experience.ts` and `lab.ts` that use Zod enum validation.
