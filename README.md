# SPAN Studio

SPAN Studio is a visual content and videography studio providing industrial walkthrough videos, commercial product films, photography, 3D technical animation, and post-production video editing for manufacturing and commercial businesses.

> **Status:** The repository is currently at **Phase 1 — Project Scaffold**. Full design system tokens, components, 3D scenes, animations, and backend routes belong to subsequent implementation phases.

## Technology Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS (v4) + PostCSS
- **Animation:** GSAP & @gsap/react
- **3D Visualization:** Three.js, @react-three/fiber, @react-three/drei
- **Database & ORM:** PostgreSQL via Neon Serverless, Drizzle ORM
- **Conversational Assistant:** Lightweight deterministic FAQ & Lead Navigator engine
- **Forms & Validation:** React Hook Form, Zod
- **Email Service:** Resend
- **Icons:** Lucide React
- **Code Quality:** ESLint, Prettier

## Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
2. Populate the required environment variables in `.env.local` (e.g. database URL, API keys). Placeholder templates are provided in `.env.example`.

## Local Development Commands

- **Install dependencies:**
  ```bash
  npm install
  ```
- **Start development server:**
  ```bash
  npm run dev
  ```
  Runs the local dev server on [http://localhost:3000](http://localhost:3000).
- **Production build:**
  ```bash
  npm run build
  ```
- **Start production server:**
  ```bash
  npm run start
  ```
- **Run linter:**
  ```bash
  npm run lint
  ```
