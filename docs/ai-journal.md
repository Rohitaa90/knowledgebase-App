# AI Journal — AI Content Generator

## AI Tools Used

- **Amazon Q (AWS)** — primary AI assistant used throughout the entire development lifecycle, from scaffolding to debugging to UI polish
- **Groq API (llama-3.3-70b-versatile)** — used as the AI backend for content generation inside the app itself

---

## Prompts Used

### 1. Project Scaffolding
**Prompt:**
> "I'm building a Next.js (App Router, TypeScript) project called AI Content Generator — a mini SaaS app where users generate content (blog posts, captions, emails, etc.) using an AI API, view their generation history, and manage their account. Set up this exact folder/file structure with stub files and TODO comments..."

**Output:** Complete project scaffold including all directories, stub pages, API routes, lib files, prisma schema, .env.example, docs folder, and README — all in one pass.

---

### 2. Database Schema + Prisma Setup
**Prompt:**
> "Implement Milestone 1: Database schema + connection. Define User and Generation models in prisma/schema.prisma, update lib/db.ts with a Prisma singleton, make sure DATABASE_URL is read from .env, run migration, and write a temporary test to confirm DB connection."

**Output:** Correct Prisma schema with proper relations, Prisma 7 compatible `prisma.config.ts`, pg adapter setup, and a working test script. Migration ran successfully against Neon PostgreSQL.

**Manual intervention:** Prisma 7 introduced breaking changes — `url` property moved out of `schema.prisma` into `prisma.config.ts`. Had to debug this iteratively. Also had to fix `earlyAccess` and `migrate.adapter` properties that were no longer valid in the final Prisma 7 config shape.

---

### 3. Authentication
**Prompt:**
> "Implement Milestone 2: Authentication using NextAuth with Credentials provider (email + password) connected to the existing Prisma User model. JWT session strategy, userId in session, register API route, login/register pages, dashboard route protection."

**Output:** Complete auth flow — `lib/auth.ts` with Credentials provider, bcrypt password comparison, JWT callbacks, register API route, login/register pages with loading and error states, dashboard layout with `getServerSession` redirect.

**Manual intervention:** Had to split login/register pages into a server component (for session redirect) and a client component (for form interactivity) due to Next.js App Router constraints.

---

### 4. AI Integration
**Prompt:**
> "Implement Milestone 3: Replace Gemini stub with real implementation using @google/generative-ai. Build generateContent(templateType, prompt, tone) function, add error handling, write a temporary test script."

**Output:** Complete `generateContent()` function with template-based prompt building and error handling.

**Challenge:** Google Gemini API free tier quota was `limit: 0` across multiple API keys and Google accounts — likely a regional restriction. Switched to **Groq API** (`llama-3.3-70b-versatile`) which worked immediately on the free tier. Updated `lib/gemini.ts` to use `groq-sdk`, replaced `GEMINI_API_KEY` with `GROQ_API_KEY` in env files.

---

### 5. Generate API Route
**Prompt:**
> "Implement Milestone 4: POST /api/generate route — validate session (401 if none), accept templateType/prompt/tone, validate inputs (400 if missing), call generateContent(), save Generation record to DB, return output and id."

**Output:** Clean API route with session check, input validation, Groq call, DB save, and proper error handling for Groq failures (500).

---

### 6. Generator UI
**Prompt:**
> "Implement Milestone 5: Build GeneratorForm.tsx (dropdown for type, textarea for prompt, tone selector, generate button with loading state, error handling) and OutputCard.tsx (displays output, copy to clipboard, placeholder state). Wire both in dashboard page."

**Output:** Fully functional form + output display wired together with React state. No page reload on generation.

---

### 7. History Feature
**Prompt:**
> "Implement Milestone 7: GET /api/history (session-protected, ordered by createdAt desc), DELETE /api/history/[id] (with ownership check, 403 if not owner), HistoryList.tsx (fetch on mount, expand/collapse, delete without reload, loading + empty states), wire into history page."

**Output:** Complete history feature with all edge cases handled.

---

### 8. Route Protection + UI Polish
**Prompt:**
> "Implement Milestone 8: Verify route protection, add nav bar with app name, Generate/History links, logout button, user name. UI polish — consistent spacing, loading/error states, responsive layout."

**Output:** NavBar component, improved dashboard layout, polished auth pages, consistent error styling.

**Manual intervention:** Discovered `/dashboard` was returning 404 because `(dashboard)/page.tsx` maps to `/` not `/dashboard`. Fixed by creating `(dashboard)/dashboard/` subfolder and adding a root redirect page.

---

### 9. Visual Design
**Prompts:**
> "Improve the visual design across all pages — consistent color palette, better typography, card-based layout, button styles, form inputs, nav bar, loading/error states. No functionality changes."
>
> "Replace purple/indigo with a different color — not common."

**Output:** Full teal-based design system, consistent card layouts, polished auth pages with gradient background, cursor-pointer globally applied.

---

## Where AI Helped Most

- **Scaffolding** — generated the entire project structure in one shot, saving hours of boilerplate setup
- **Boilerplate-heavy code** — Prisma schema, NextAuth config, API routes follow predictable patterns that AI handles very well
- **Debugging** — identified Prisma 7 breaking changes, Next.js App Router server/client component split issues, and dynamic route params type changes (`params` now a `Promise` in Next.js 15)
- **UI consistency** — applying a design system uniformly across many files quickly

## Where Manual Intervention Was Required

- Prisma 7 config changes (iterative debugging)
- Groq API switch (Gemini free tier completely non-functional)
- Dashboard 404 routing fix (App Router group route behavior)
- `.env` management and keeping sensitive keys out of chat
- Splitting server/client components for auth pages
