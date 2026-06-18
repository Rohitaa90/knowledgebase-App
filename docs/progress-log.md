# Progress Log — AI Content Generator

## Milestone 1 — Project Setup + Database

### Decisions Made
- Chose Next.js 15 App Router with TypeScript for modern full-stack development in a single repo
- Chose Neon (managed serverless PostgreSQL) over local Postgres for zero-config cloud DB on free tier
- Chose Prisma ORM for type-safe DB access and easy migrations
- Decided on `src/` directory structure to keep app code separate from config files

### Problems Encountered
- **Prisma 7 breaking change:** `url` property is no longer allowed inside `schema.prisma` datasource block. Had to create a separate `prisma.config.ts` file with `datasource.url` and install `@prisma/adapter-pg` + `pg` packages.
- **`earlyAccess` and `migrate.adapter` config:** These properties were invalid in the final Prisma 7 `defineConfig` shape — removed them after TypeScript errors.
- **DB connection test failing:** `ECONNREFUSED` error initially because `dotenv/config` was not imported in the test script, so `DATABASE_URL` was `undefined`.

### Outcome
- Neon DB connected successfully
- `User` and `Generation` tables created via `prisma migrate dev --name init`
- Prisma client generated and singleton pattern working

---

## Milestone 2 — Authentication

### Decisions Made
- Used NextAuth v4 with Credentials provider (email + password) instead of OAuth to keep the setup simple and self-contained
- JWT session strategy chosen over database sessions to avoid extra session tables
- Extended NextAuth session type to include `userId` so API routes can identify the logged-in user without an extra DB query
- Split auth pages into server component (session redirect) + client component (form) — required by Next.js App Router since `getServerSession` is server-only and form handlers need `"use client"`

### Problems Encountered
- **Dashboard 404:** After moving pages into `src/`, the `(dashboard)/page.tsx` was mapping to `/` instead of `/dashboard`. Fixed by creating a `(dashboard)/dashboard/` subfolder and adding a root `page.tsx` that redirects to `/dashboard`.
- **`@auth/prisma-adapter` installed but unused:** Was installed during initial setup for a future OAuth flow but not needed for Credentials provider — kept for now, will remove before final cleanup.

### Outcome
- Register → login → dashboard flow working end-to-end
- Unauthenticated users redirected to `/login`
- Already logged-in users redirected away from `/login` and `/register`
- `session.user.id` available in all API routes

---

## Milestone 3 — AI Integration

### Decisions Made
- Originally planned to use Google Gemini API (`gemini-2.0-flash`)
- Switched to **Groq API** (`llama-3.3-70b-versatile`) after Gemini free tier returned `limit: 0` quota errors across multiple API keys and Google accounts — likely a regional restriction affecting India-based accounts
- Kept the file named `lib/gemini.ts` and function named `generateContent()` to avoid refactoring all import references — only the internal implementation changed
- Used `llama-3.3-70b-versatile` on Groq — fast, high quality, generous free tier

### Problems Encountered
- **Gemini quota issue:** Every Gemini API key tested returned `limit: 0` on free tier for `gemini-2.0-flash`, `gemini-2.0-flash-lite`, and `gemini-1.5-flash`. Root cause: Google AI Studio free tier appears to be restricted or quota-zeroed for certain regions.
- **`gemini-1.5-flash` 404:** Model not available on the `v1beta` endpoint for the tested keys.

### Outcome
- `generateContent(templateType, prompt, tone)` working with Groq
- Tested with blog/casual prompt — full, well-structured response returned
- Error handling in place — throws descriptive error on API failure

---

## Milestone 4 — Generate API Route

### Decisions Made
- Session validated server-side using `getServerSession` — returns 401 immediately if no session, no DB call wasted
- Input validation returns 400 before calling Groq — avoids unnecessary API usage
- Groq errors caught and returned as 500 with the original error message for easier debugging

### Outcome
- `POST /api/generate` working correctly
- Saves generation to DB with `userId`, `templateType`, `prompt`, `tone`, `output`
- Returns `{ id, output }` to frontend

---

## Milestone 5 — Generator UI

### Decisions Made
- State (`output`) lifted to dashboard page so both `GeneratorForm` and `OutputCard` can share it without prop drilling through a context
- `onResult` callback pattern used to pass generated content up from form to page
- No page reload on generation — React state update only

### Outcome
- Form submits, shows loading state, displays output in OutputCard
- Copy to clipboard working
- Error message shown inline if API call fails

---

## Milestone 7 — History Feature

### Decisions Made
- History ordered by `createdAt desc` — newest first is the most natural UX
- Ownership check on DELETE (403 if userId mismatch) — prevents users from deleting each other's records
- Expand/collapse output per item — avoids overwhelming the page with long AI-generated text

### Outcome
- History list loads on mount, shows all past generations
- Delete removes item from UI without reload
- Empty state and loading state handled

---

## Milestone 8 — Route Protection + UI Polish

### Decisions Made
- NavBar rendered inside dashboard layout (server component) so user name is available from session without an extra client fetch
- NavBar itself is a client component for `signOut()` interactivity
- Switched color palette from indigo/purple to teal — more distinctive, less overused in SaaS apps
- Auth pages styled as a landing/home page with gradient background and app branding above the form card

### Outcome
- All routes protected correctly
- Consistent teal design system across all pages
- Responsive layout verified on mobile widths
