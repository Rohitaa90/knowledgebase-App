# Reflection — AI Content Generator

## What Worked Well

### AI-Assisted Scaffolding
Using AI to generate the entire project structure, stub files, and boilerplate in one pass was extremely effective. What would have taken several hours of setup was done in minutes. The folder structure, Prisma schema, NextAuth config, and API route stubs were all production-quality starting points.

### Iterative Milestone-Based Prompting
Breaking the project into clear milestones (setup → DB → auth → AI → API → UI → history → polish) and prompting AI for one milestone at a time worked very well. Each prompt had enough context to produce focused, minimal output without over-engineering.

### Debugging with AI
When Prisma 7 introduced breaking changes that weren't in the AI's training data, using the error messages as context in follow-up prompts resolved the issues quickly. The AI correctly identified that `url` had moved to `prisma.config.ts` and that `earlyAccess`/`migrate.adapter` were no longer valid config keys.

### TypeScript Safety
Having TypeScript throughout caught several issues at compile time — particularly the Next.js 15 change where dynamic route `params` became a `Promise<{id: string}>` instead of `{id: string}`. The `tsc --noEmit` check after each milestone was a reliable safety net.

---

## What Did Not Work Well

### Gemini API Free Tier
The biggest blocker was Google Gemini API. Despite trying multiple API keys from different Google accounts, every key returned `limit: 0` quota errors on the free tier. This appears to be a regional restriction affecting India-based accounts. Switching to Groq resolved this but cost time in debugging and switching.

### Prisma 7 Breaking Changes
Prisma 7 was a very recent release with significant breaking changes to how the datasource URL and adapters are configured. The AI's knowledge of Prisma 7 config was incomplete, requiring several iterations to get the correct `prisma.config.ts` shape.

### Next.js App Router Server/Client Split
The App Router's strict separation between server and client components required splitting several pages into two files (a server component for session checks and a client component for interactivity). This added file count and complexity that wouldn't exist in the Pages Router.

---

## How AI Influenced Development

AI acted as a highly capable pair programmer throughout this project. It was most valuable for:

- **Speed** — generating correct boilerplate instantly
- **Pattern recall** — NextAuth config, Prisma singleton, API route structure
- **Consistency** — applying design changes uniformly across many files at once
- **Debugging** — turning error messages into targeted fixes quickly

The main limitation was with very recent library versions (Prisma 7, Next.js 15 params API) where the AI's training data didn't reflect the latest breaking changes. In these cases, the error message + iterative prompting approach worked well.

Overall, AI reduced development time by roughly 60-70% for boilerplate and structure, while the remaining 30-40% required human judgment — architecture decisions, debugging novel errors, switching API providers, and making UX calls.

---

## What I Would Improve With More Time

1. **Deployment** — Deploy to Vercel with Neon as the production database. The app is structured for this but wasn't deployed within the assessment timeframe.
2. **Streaming output** — Use Groq's streaming API to show generated content token by token instead of waiting for the full response.
3. **Better error UX** — Show more specific error messages to the user (e.g. distinguish between network errors and API quota errors).
4. **Account management** — Allow users to update their name/password or delete their account.
5. **Generation count/limits** — Add a simple usage counter per user to simulate SaaS usage limits.
6. **Tests** — Add integration tests for the API routes using Vitest or Jest.

---

## Key Learnings

- **Prompt specificity matters** — Vague prompts produce vague code. Detailed prompts with exact requirements, file paths, and constraints produce production-ready output.
- **Milestone-based prompting > monolithic prompts** — Asking AI to build one feature at a time produces better, more focused code than asking it to build everything at once.
- **Always verify with TypeScript** — Running `tsc --noEmit` after every AI-generated change catches type errors before they become runtime bugs.
- **AI doesn't know about breaking changes in very new library versions** — For cutting-edge dependencies, check the official changelog and supplement AI output with documentation.
- **Keep humans in the loop for architecture decisions** — AI is great at implementation but the developer needs to make the key architectural choices (tech stack, data model, auth strategy) to ensure the app is coherent.
