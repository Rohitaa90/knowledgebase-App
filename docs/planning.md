# Planning Document — AI Content Generator

## Problem Statement
Creating content for different platforms (blog posts, social captions, marketing emails, product descriptions) is repetitive and time-consuming, especially for individuals and small teams without dedicated writers. Manually brainstorming and drafting each piece from scratch slows down workflow. An AI-assisted tool that generates a solid first draft from a simple topic and tone input can save significant time and reduce writer's block.

## Application Overview
AI Content Generator is a mini SaaS web application where authenticated users select a content type, provide a topic and desired tone, and get AI-generated content in seconds using the Groq API. Every generation is saved to the user's history so it can be revisited, copied, or deleted later. The app is built as a focused, single-purpose tool rather than a general-purpose writing suite — it does one thing well.

## Features List
- User authentication (signup / login) via NextAuth
- Content generation form — select template type, enter topic, select tone/length
- AI-powered content generation using the Groq API (`llama-3.3-70b-versatile`)
- Copy-to-clipboard for generated output
- Generation history — view past generations, delete unwanted ones
- Protected dashboard routes (only logged-in users can generate or view history)
- Responsive UI built with Tailwind CSS

## Technical Architecture
- **Frontend:** Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Backend:** Next.js API route handlers
- **Authentication:** NextAuth (credentials-based)
- **Database:** PostgreSQL, accessed via Prisma ORM
- **AI Provider:** Groq API (`llama-3.3-70b-versatile`) for text generation
- **Deployment:** Vercel (app hosting) + Neon/Supabase (managed Postgres, free tier)

**High-level flow:**
User logs in → fills out the generator form → frontend calls `/api/generate` → route handler builds a prompt from the form inputs → calls the Groq API → saves the result to the `Generation` table → returns the content to the frontend → displayed in the output card and later visible in History.

## Database Design

**User**
| Field | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| email | string (unique) | |
| password | string | hashed |
| name | string | |
| createdAt | datetime | |

**Generation**
| Field | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| userId | uuid (FK → User.id) | |
| templateType | string | e.g. "blog", "caption", "email", "product-description" |
| prompt | text | user's topic/instructions |
| tone | string | optional |
| output | text | AI-generated content |
| createdAt | datetime | |

**Relationship:** One `User` has many `Generation` records (1-to-many).

## Development Milestones
1. Project setup — Next.js, Tailwind, Prisma, folder structure, env config
2. Database schema — User and Generation models, run migrations
3. Authentication — signup/login working end-to-end
4. Groq integration — `generateContent()` function tested standalone
5. Generate API route — connects form input to Groq, saves result to DB
6. Generator UI — form + output display
7. History feature — list, view, delete past generations
8. Route protection & UI polish — auth guards, styling pass
9. Testing & bug fixes
10. Deployment — Vercel + managed Postgres
11. Documentation finalization — README, ai-journal.md, progress-log.md, reflection.md