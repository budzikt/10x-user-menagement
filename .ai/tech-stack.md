# Tech Stack

## Frontend Framework & Runtime
- **Next.js**: v16.0.5 (Latest) - React framework for production.
  - **App Router**: Used for routing (inferred from `app` directory).
  - **Turbopack**: Enabled for development (`next dev --turbopack`).
  - **React**: v19.1.1 - UI library.
  - **TypeScript**: v5 - Static typing.

## Styling
- **Tailwind CSS**: v4.1.11 - Utility-first CSS framework.
  - **PostCSS**: Used for processing CSS.
- **CSS Modules**: Not explicitly used, but supported.

## Backend & Database (BaaS)
- **Supabase**: Backend-as-a-Service platform.
  - **@supabase/supabase-js**: v2.53.0 - Client library.
  - **@supabase/ssr**: v0.6.1 - Server-side rendering helpers for Supabase Auth.
  - **PostgreSQL**: Underlying database provided by Supabase.
  - **Supabase Auth**: Authentication service.
  - **Supabase Storage**: File storage for avatars.

## Linting & Quality
- **ESLint**: v9.32.0 - Linter.
- **eslint-config-next**: v15.4.5 - Next.js specific linting rules.

## Package Manager
- **npm**: Inferred from `package-lock.json`.

## Deployment (Inferred)
- **Vercel**: Likely deployment target given the `next.config.ts` and standard Next.js patterns.
