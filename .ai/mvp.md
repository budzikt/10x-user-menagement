# MVP: Next.js + Supabase User Management

## General Goal of Project
To provide a robust, production-ready user management boilerplate using Next.js (App Router) and Supabase. The primary goal is to demonstrate a secure authentication flow, server-side session management, and CRUD operations for user profiles and file storage, serving as a foundation for SaaS or social applications.

## Basic Functionalities
- **Authentication:** 
  - User Sign Up and Login via Email/Password.
  - Secure session handling using HttpOnly cookies and Next.js Middleware.
  - Auth state synchronization between server and client components.
- **Profile Management:**
  - View and edit user profile details: Full Name, Username, and Website.
  - Real-time fetching of user data upon page load.
- **File Storage (Avatars):**
  - Upload profile pictures to Supabase Storage.
  - secure download/preview of user avatars.
  - Association of avatar URLs with user profiles in the database.
- **Routing:**
  - Protected routes (e.g., `/account`) accessible only to authenticated users.
  - Public landing page and login interface.

## What is Excluded from MVP
- **Social Auth:** OAuth providers (Google, GitHub, etc.) are not currently implemented in the UI.
- **Advanced Account Security:** Two-factor authentication (2FA), password reset flows, or email change verification.
- **Public Profiles:** Capability for users to view other users' profiles (profiles are currently self-managed only).
- **Account Deletion:** Self-service account removal.
- **Complex Validation:** Zod/React Hook Form integration (uses basic HTML5 validation).

## Success Criteria
1. **User Onboarding:** A new user can sign up and is automatically logged in and redirected to their account page.
2. **Data Persistence:** Changes to the username, website, or full name are saved to the Supabase `profiles` table and reflect immediately.
3. **Media Handling:** An uploaded image successfully appears in the avatar component and persists across reloads.
4. **Security:** Unauthenticated users attempting to access `/account` are redirected to the login page; the session persists securely on refresh.
