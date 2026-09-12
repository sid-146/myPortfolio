# Sudhanwa Kaveeshwar — Personal Engineering Portfolio

A modern, high-performance personal engineering portfolio designed with a content-first philosophy, developer aesthetics, subtle interactions, and full static pre-rendering.

Built with **Next.js 15 App Router**, **React 19**, **TypeScript**, **Tailwind CSS**, **MDX**, and **Zod**.

---

## ⚡ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React Server Components)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with `@tailwindcss/typography`
- **Content Engine**: File-based [MDX](https://mdxjs.com/) with YAML frontmatter via `gray-matter` and `next-mdx-remote`
- **Validation**: [Zod](https://zod.dev/) for compile-time and runtime frontmatter validation
- **Typography**: Inter (sans-serif) & JetBrains Mono (monospace) via `next/font/google`
- **Icons**: Custom SVG primitives & [Lucide React](https://lucide.dev/)
- **Theme**: Semantic dual-mode CSS variables (Dark mode default with persistent Light mode toggle)

---

## 📂 Documentation

Detailed documentation is available in the [`docs/`](./docs) folder:

| Document                                                      | Description                                                                                                                          |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 📘 [**Codebase Documentation**](./docs/CODEBASE.md)           | Full breakdown of every directory, configuration file, data loader, component, styling architecture, and design decisions.           |
| 📝 [**Content Management Guide**](./docs/CONTENT_GUIDE.md)    | Step-by-step instructions for adding, editing, and deleting projects, articles, experience entries, now page updates, and lab items. |
| 🚀 [**Vercel Deployment Guide**](./docs/VERCEL_DEPLOYMENT.md) | Complete guide for deploying to Vercel via Git integration or CLI, configuring custom domains, DNS setup, and troubleshooting.       |

---

## 🛠️ Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/sid-146/myPortfolio.git
cd myPortfolio
npm install
```

### 2. Run Local Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Static Validation

```bash
npm run build
```

---

## 📄 Resume Download Setup

Place your resume PDF in the `public/` directory with the following exact filename:

```
public/Sudhanwa_Kaveeshwar_Resume.pdf
```

The download buttons on `/resume` will automatically download this file.
