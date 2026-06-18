# AI Content Generator

A mini SaaS web app that generates content (blog posts, social captions, emails, product descriptions) using AI. Built with Next.js 15, Prisma, PostgreSQL, NextAuth, and Groq API.

## Features

- Email/password authentication (signup + login)
- AI content generation — select content type, enter a topic, choose a tone
- Generation history — view, expand, and delete past generations
- Protected dashboard routes
- Responsive UI with Tailwind CSS

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Auth:** NextAuth v4 (Credentials provider)
- **Database:** PostgreSQL via Neon (serverless)
- **ORM:** Prisma 7
- **AI:** Groq API (`llama-3.3-70b-versatile`)

## Local Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ai-content-generator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in the values in `.env`:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>/<dbname>?sslmode=require
GROQ_API_KEY=your_groq_api_key
NEXTAUTH_SECRET=any_random_32_char_string
NEXTAUTH_URL=http://localhost:3000
```

- **DATABASE_URL** — Get a free PostgreSQL database from [neon.tech](https://neon.tech)
- **GROQ_API_KEY** — Get a free API key from [console.groq.com/keys](https://console.groq.com/keys)
- **NEXTAUTH_SECRET** — Generate one with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### 4. Run database migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Go to `/register` and create an account
2. Log in at `/login`
3. On the dashboard, select a content type, enter a topic, and optionally choose a tone
4. Click **Generate** — the AI-generated content appears on the right
5. View past generations at `/dashboard/history`
6. Click **Show output** to expand a generation, or **Delete** to remove it

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Login and register pages
│   ├── (dashboard)/      # Protected dashboard pages
│   ├── api/              # API routes (auth, generate, history)
│   └── layout.tsx
├── components/           # UI components (NavBar, GeneratorForm, OutputCard, HistoryList)
├── lib/                  # Prisma client, NextAuth config, Groq integration
└── types/                # TypeScript type extensions
prisma/
└── schema.prisma         # Database schema
docs/
├── planning.md
├── ai-journal.md
├── progress-log.md
└── reflection.md
```

## Documentation

- [Planning Document](docs/planning.md)
- [AI Journal](docs/ai-journal.md)
- [Progress Log](docs/progress-log.md)
- [Reflection](docs/reflection.md)
