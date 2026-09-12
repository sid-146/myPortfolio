# Vercel Deployment Guide

> Step-by-step guide for deploying the **Sudhanwa Kaveeshwar Portfolio** to [Vercel](https://vercel.com).
> Covers Git integration, Vercel CLI, custom domains, DNS setup, continuous deployment, and troubleshooting.

---

## Table of Contents

1. [Overview & Architecture on Vercel](#1-overview--architecture-on-vercel)
2. [Prerequisites](#2-prerequisites)
3. [Step 1: Commit and Push Code to GitHub](#3-step-1-commit-and-push-code-to-github)
4. [Step 2: Deploy via Vercel Dashboard (Recommended)](#4-step-2-deploy-via-vercel-dashboard-recommended)
5. [Step 3: Deploy via Vercel CLI (Alternative)](#5-step-3-deploy-via-vercel-cli-alternative)
6. [Step 4: Configure a Custom Domain](#6-step-4-configure-a-custom-domain)
7. [Step 5: Post-Deployment Verification Checklist](#7-step-5-post-deployment-verification-checklist)
8. [Continuous Deployment & Branch Workflow](#8-continuous-deployment--branch-workflow)
9. [Troubleshooting Common Issues](#9-troubleshooting-common-issues)

---

## 1. Overview & Architecture on Vercel

This portfolio is built with **Next.js 15 App Router**, **React 19**, **Tailwind CSS**, and **MDX**.

Because Vercel is the creator and maintainer of Next.js, deploying on Vercel provides:
- **Zero Configuration**: Vercel automatically detects Next.js, configures build commands, and sets up caching.
- **Edge Network & Fast Static Delivery**: All pre-rendered static routes (`generateStaticParams`) are cached and delivered from edge nodes worldwide with sub-millisecond response times.
- **Automatic Preview Deployments**: Every git branch or pull request automatically gets a dedicated preview URL with live comments.
- **Automatic SSL**: Free Let's Encrypt TLS/SSL certificates renewed automatically.
- **Hobby Tier (Free)**: Unlimited static deployments, automatic CI/CD, and custom domain support at zero cost.

---

## 2. Prerequisites

Before starting, ensure you have:

1. **GitHub Account**: Connected to your repository:  
   `https://github.com/sid-146/myPortfolio`
2. **Vercel Account**: Sign up for free at [vercel.com/signup](https://vercel.com/signup) using your **GitHub account** (this makes importing repositories 1-click).
3. **Resume PDF in Public Folder**: Ensure your PDF resume is placed at:  
   `public/Sudhanwa_Kaveeshwar_Resume.pdf`  
   *(The resume download buttons link directly to this file).*
4. **Clean Local Build**: Verify the project builds without errors:
   ```bash
   npm run build
   ```

---

## 3. Step 1: Commit and Push Code to GitHub

Your portfolio code must be committed and pushed to your remote GitHub repository so Vercel can pull and build it.

### 1. Check your git status

Open your terminal in `d:\GitHub_Clones\myPortfolio`:

```bash
git status
```

### 2. Stage all project files

```bash
git add .
```

### 3. Commit your changes

```bash
git commit -m "feat: complete portfolio with Next.js 15, MDX content, lab widgets, and documentation"
```

### 4. Push to GitHub

Check which branch you are on:
```bash
git branch
```

If you are on `dev`:
```bash
git push origin dev
```

If you want to push to `main` (standard production branch for Vercel):
```bash
# Switch or merge into main:
git checkout -b main
git push -u origin main
```

*(Note: You can deploy from either `main` or `dev` — you can choose your production branch in Vercel's settings).*

---

## 4. Step 2: Deploy via Vercel Dashboard (Recommended)

This is the easiest method and enables automatic continuous deployment on every `git push`.

### 1. Sign In to Vercel

1. Go to [https://vercel.com](https://vercel.com).
2. Click **Log In** and choose **Continue with GitHub**.
3. Authorize Vercel to access your GitHub repositories if prompted.

---

### 2. Import the Repository

1. In your Vercel Dashboard, click the **Add New...** dropdown button (top right).
2. Select **Project**.
3. Under **Import Git Repository**, look for `sid-146/myPortfolio`.
   - *If it doesn't appear, click "Adjust GitHub App Permissions" and grant Vercel access to the `myPortfolio` repository.*
4. Click the blue **Import** button next to `myPortfolio`.

---

### 3. Configure Project Settings

Vercel will open the **Configure Project** screen:

| Setting | Value to Use | Explanation |
|---|---|---|
| **Project Name** | `my-portfolio` (or your preferred name) | Determines the default `.vercel.app` subdomain |
| **Framework Preset** | `Next.js` | Automatically detected by Vercel |
| **Root Directory** | `./` | Leave as root directory |
| **Build Command** | `next build` (default) | Do not override unless customized |
| **Output Directory** | `.next` (default) | Next.js output directory |
| **Install Command** | `npm install` (default) | Installs dependencies |

#### Environment Variables
Currently, the portfolio is completely self-contained and static — **no environment variables are required**.
*(If you later add analytics tokens like Google Analytics `NEXT_PUBLIC_GA_ID`, you can paste them here).*

---

### 4. Click Deploy

1. Click the **Deploy** button.
2. Vercel will start the deployment process:
   - Cloning repository
   - Installing dependencies (`npm install`)
   - Running static build (`next build`)
   - Collecting page traces & generating static HTML
   - Uploading outputs to the global edge network
3. The build typically finishes in **45 to 90 seconds**.
4. Once completed, you will see a celebration screen with a screenshot of your live portfolio and a URL like:  
   `https://my-portfolio-xxxx.vercel.app`

---

## 5. Step 3: Deploy via Vercel CLI (Alternative)

If you prefer deploying directly from your terminal without opening a browser:

### 1. Install Vercel CLI globally

```bash
npm install -g vercel
```

### 2. Log in to Vercel

```bash
vercel login
```
Follow the prompt to authenticate via browser or email.

### 3. Deploy a Preview Build

In the project root directory (`d:\GitHub_Clones\myPortfolio`):

```bash
vercel
```

Answer the interactive setup questions:
- `Set up and deploy "d:\GitHub_Clones\myPortfolio"?` → **Y**
- `Which scope do you want to deploy to?` → **Select your account**
- `Link to existing project?` → **N**
- `What's your project's name?` → **my-portfolio**
- `In which directory is your code located?` → **./**
- `Want to modify these settings?` → **N**

Vercel will upload and deploy a preview URL.

### 4. Deploy to Production

Once verified, deploy to your live production URL:

```bash
vercel --prod
```

---

## 6. Step 4: Configure a Custom Domain

To link your personal domain (such as `sudhanwa.dev` or `sudhanwakaveeshwar.com`):

### 1. Add Domain in Vercel

1. In your Vercel Dashboard, go to your project: **my-portfolio**.
2. Click **Settings** (top navigation tab).
3. Click **Domains** in the left sidebar.
4. In the text field, enter your domain name (e.g., `sudhanwa.dev` or `www.sudhanwa.dev`).
5. Click **Add**.
6. Vercel will recommend adding both:
   - `sudhanwa.dev` (apex domain)
   - `www.sudhanwa.dev` (subdomain redirect)
   Choose **Redirect to apex** or **Redirect to www** according to your preference.

---

### 2. Configure DNS Records with Your Domain Registrar

Log in to where you bought your domain (GoDaddy, Namecheap, Cloudflare, Google Domains / Squarespace, Porkbun, etc.) and navigate to **DNS Management / DNS Records**.

Add the following records:

#### Option A: Apex Domain (`yourdomain.com`)
| Type | Name / Host | Value / Points To | TTL |
|---|---|---|---|
| **A** | `@` (or leave blank) | `76.76.21.21` | Automatic / 3600 |

#### Option B: Subdomain or `www` (`www.yourdomain.com`)
| Type | Name / Host | Value / Points To | TTL |
|---|---|---|---|
| **CNAME** | `www` | `cname.vercel-dns.com` | Automatic / 3600 |

---

### 3. Wait for DNS Propagation and SSL Generation

- DNS updates take anywhere from **2 minutes to 24 hours** (usually under 15 minutes).
- As soon as DNS resolves, Vercel automatically provisions a free **Let's Encrypt SSL/TLS certificate**.
- The status indicator in Vercel Domains will turn **Green (Valid Configuration)**.

---

## 7. Step 5: Post-Deployment Verification Checklist

After deployment finishes, run through this quick checklist on your live URL:

| # | Check Item | How to Verify | Expected Result |
|---|---|---|---|
| 1 | **Homepage** | Visit `/` | Hero, bio, featured projects, latest articles, and skills grid render properly |
| 2 | **Projects Directory** | Visit `/projects` | All 6 projects show; category filter buttons and search box filter in real-time |
| 3 | **Project Detail Pages** | Visit `/projects/attention-from-scratch` | Metadata, tags, metrics grid, code blocks with copy buttons render cleanly |
| 4 | **Writing Directory** | Visit `/writing` | All 4 articles list with reading times and tags |
| 5 | **Article Detail Pages** | Visit any `/writing/[slug]` | Prose typography, sticky Table of Contents on the side highlights active section |
| 6 | **Interactive Lab** | Visit `/lab` | Test all 3 widgets: Attention Visualizer, Tokenizer Explorer, Vector Similarity canvas |
| 7 | **Experience Timeline** | Visit `/experience` | 3 Bajaj Finserv Health roles appear; current role has green highlight indicator |
| 8 | **Now Page** | Visit `/now` | "Building", "Learning", "Reading", and "Setup" sections display with current date |
| 9 | **Resume Page & Download** | Visit `/resume` | Click **Download PDF** at top or bottom; browser downloads `Sudhanwa_Kaveeshwar_Resume.pdf` |
| 10 | **Dark / Light Theme** | Click Theme Toggle in header | Colors instantly switch; refresh the page to confirm choice persists in `localStorage` |
| 11 | **Mobile Navigation** | Resize browser to mobile width | Hamburger button opens drawer; links navigate properly |
| 12 | **SEO & Feeds** | Check `/sitemap.xml`, `/robots.txt`, `/feed.xml` | Valid XML / text outputs generated dynamically |

---

## 8. Continuous Deployment & Branch Workflow

Vercel provides seamless Git-driven continuous integration:

```
Push to branch 'dev' ──────► Automatic Preview Deployment (unique URL)
                                       │
                              (Test & Review)
                                       │
Merge PR into 'main' ──────► Automatic Production Deployment (live domain)
```

### Production Branch Setting
By default, Vercel assigns `main` as your Production branch.
If your default development branch is `dev` and you want Vercel to treat `dev` as Production:
1. Go to **Settings** → **Git** in Vercel.
2. Under **Production Branch**, change `main` to `dev`.
3. Click **Save**.

### Instant Rollbacks
If you push a change that introduces an issue:
1. Go to **Deployments** tab in Vercel.
2. Find the previous stable deployment.
3. Click the three dots `...` → **Instant Rollback**.
4. Your live domain will immediately point to that previous build with zero downtime.

---

## 9. Troubleshooting Common Issues

### Issue 1: Build fails with `acorn parse error` or `Unexpected token`
- **Cause**: Inline or block math formulas using `$` or `$$` inside `.mdx` files (e.g. `$W_q \cdot W_k^T$`). Acorn parses `$` as JavaScript expression interpolation.
- **Solution**: Replace LaTeX `$...$` in prose with backticks `` `...` `` or plain text. Check recent edits in `content/projects/` or `content/writing/`.

---

### Issue 2: Build fails with `Invalid project frontmatter` or `Invalid article frontmatter`
- **Cause**: Frontmatter in a `.mdx` file failed Zod schema validation (e.g., misspelled category, missing date, invalid enum).
- **Solution**: Check the Vercel build logs. Look for the error line printed by `lib/content.ts`. Refer to `docs/CONTENT_GUIDE.md` for the exact allowed values for `category` and `status`.

---

### Issue 3: Resume PDF download gives a 404 error
- **Cause**: The file `Sudhanwa_Kaveeshwar_Resume.pdf` is not present in the `public/` directory or has a different filename.
- **Solution**:
  1. Ensure your PDF is saved as `public/Sudhanwa_Kaveeshwar_Resume.pdf`.
  2. Check that Git has tracked the file:
     ```bash
     git status public/
     ```
  3. Commit and push:
     ```bash
     git add public/Sudhanwa_Kaveeshwar_Resume.pdf
     git commit -m "docs: add resume PDF"
     git push
     ```

---

### Issue 4: TypeScript or ESLint errors during `next build`
- **Cause**: Vercel runs `next build`, which by default executes `tsc --noEmit` and `eslint`.
- **Solution**: Run the check locally before pushing:
  ```bash
  cmd /c "npm run build"
  ```
  Fix any highlighted type errors or unused imports before pushing to GitHub.

---

### Issue 5: Node.js version mismatch
- **Cause**: Next.js 15 requires Node.js 18.18+ or Node.js 20+.
- **Solution**:
  1. Go to **Settings** → **General** in your Vercel project.
  2. Scroll down to **Node.js Version**.
  3. Ensure it is set to **20.x** (recommended) or **18.x**.
  4. Save and trigger a redeploy.

---

## Summary of Documentation Files

- [`CODEBASE.md`](file:///d:/GitHub_Clones/myPortfolio/docs/CODEBASE.md) — Comprehensive technical architecture, file responsibilities, and data flow.
- [`CONTENT_GUIDE.md`](file:///d:/GitHub_Clones/myPortfolio/docs/CONTENT_GUIDE.md) — How to add, update, and delete projects, articles, experience, now page, and lab items.
- [`VERCEL_DEPLOYMENT.md`](file:///d:/GitHub_Clones/myPortfolio/docs/VERCEL_DEPLOYMENT.md) — Step-by-step instructions for deploying and maintaining the site on Vercel.
