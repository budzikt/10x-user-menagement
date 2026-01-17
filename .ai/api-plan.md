# REST API Plan

## 1. Resources

The application utilizes the Supabase platform, which exposes the database and services via a RESTful API. The main resources identified are:

1.  **Auth (User)**: Manages user identity and sessions (System table: `auth.users`).
2.  **Profile**: Manages user specific details (Table: `public.profiles`).
3.  **Storage (Avatar)**: Manages binary file uploads for profile pictures (Bucket: `avatars`).

## 2. Endpoints

### 2.1. Authentication
*Note: These endpoints are handled by the Supabase Auth service (GoTrue) and orchestrated via Next.js Server Actions.*

#### Sign Up
*   **HTTP Method:** `POST`
*   **URL:** `/auth/v1/signup`
*   **Description:** Registers a new user with email and password.
*   **Request Payload:**
    ```json
    {
      "email": "user@example.com",
      "password": "securePassword123"
    }
    ```
*   **Response Payload:**
    ```json
    {
      "id": "uuid",
      "aud": "authenticated",
      "email": "user@example.com",
      "confirmation_sent_at": "timestamp"
    }
    ```
*   **Success:** 200 OK
*   **Error:** 400 Bad Request (Invalid email), 422 Unprocessable Entity (Password too weak).

#### Login (Sign In)
*   **HTTP Method:** `POST`
*   **URL:** `/auth/v1/token?grant_type=password`
*   **Description:** Authenticates a user and issues a session token.
*   **Request Payload:**
    ```json
    {
      "email": "user@example.com",
      "password": "securePassword123"
    }
    ```
*   **Response Payload:**
    ```json
    {
      "access_token": "jwt-token",
      "token_type": "bearer",
      "user": { "id": "uuid", "email": "..." }
    }
    ```
*   **Success:** 200 OK
*   **Error:** 400 Bad Request (Invalid credentials).

#### Logout
*   **HTTP Method:** `POST`
*   **URL:** `/auth/v1/logout`
*   **Description:** Invalidates the current user session.
*   **Success:** 204 No Content.

---

### 2.2. Profiles
*Note: Accessed via Supabase PostgREST API.*

#### Get Current User Profile
*   **HTTP Method:** `GET`
*   **URL:** `/rest/v1/profiles`
*   **Query Parameters:**
    *   `select`: `username,full_name,website,avatar_url`
    *   `id`: `eq.{current_user_id}` (Enforced via RLS, client filters by own ID)
    *   `limit`: `1`
*   **Description:** Retrieves profile details for the authenticated user.
*   **Response Payload:**
    ```json
    [
      {
        "username": "jdoe",
        "full_name": "John Doe",
        "website": "https://johndoe.com",
        "avatar_url": "path/to/image.jpg"
      }
    ]
    ```
*   **Success:** 200 OK
*   **Error:** 401 Unauthorized (If not logged in), 406 Not Acceptable.

#### Update User Profile
*   **HTTP Method:** `PATCH`
*   **URL:** `/rest/v1/profiles`
*   **Query Parameters:**
    *   `id`: `eq.{current_user_id}`
*   **Description:** Updates specific fields of the user's profile.
*   **Request Payload:**
    ```json
    {
      "username": "new_username",
      "full_name": "New Name",
      "website": "https://newsite.com",
      "updated_at": "2024-01-01T12:00:00Z"
    }
    ```
*   **Response Payload:** (Empty if `Prefer: return=minimal` is used, or the updated object)
*   **Success:** 200 OK or 204 No Content.
*   **Error:**
    *   401 Unauthorized
    *   409 Conflict (If `username` is already taken)
    *   400 Bad Request (If validation fails, e.g., username too short).

---

### 2.3. Storage (Avatars)
*Note: Accessed via Supabase Storage API.*

#### Upload Avatar
*   **HTTP Method:** `POST`
*   **URL:** `/storage/v1/object/avatars/{file_path}`
*   **Description:** Uploads a raw binary image file.
*   **Headers:**
    *   `Authorization`: `Bearer {token}`
    *   `Content-Type`: `image/*`
*   **Request Body:** Binary File Content
*   **Response Payload:**
    ```json
    {
      "Key": "avatars/user_id/image.png"
    }
    ```
*   **Success:** 200 OK
*   **Error:** 401 Unauthorized, 400 Bad Request (File too large or invalid type).

#### Download Avatar
*   **HTTP Method:** `GET`
*   **URL:** `/storage/v1/object/avatars/{file_path}`
*   **Description:** Downloads the binary image file.
*   **Success:** 200 OK (Returns binary stream).
*   **Error:** 404 Not Found.

## 3. Authentication and Authorization

*   **Mechanism:** JSON Web Tokens (JWT).
*   **Implementation:**
    *   Supabase Auth handles the issuance and verification of tokens.
    *   **Next.js Middleware:** Intercepts requests, refreshes the session via the `sb-{ref}-auth-token` cookie, and ensures the user is authenticated for protected routes (like `/account`).
    *   **Row Level Security (RLS):** Authorization is enforced at the database level. The database checks the `auth.uid()` of the requesting user against the `id` column in the `profiles` table to ensure users can only view and edit their own data.

## 4. Validation and Business Logic

### 4.1. Validation Conditions
*   **Profile - Username:**
    *   Must be unique across the system (Database Unique Index).
    *   Minimum length: 3 characters (Database Constraint: `username_length`).
*   **Profile - Website:**
    *   Standard Text format (Frontend validation recommended for URL format).
*   **Avatar - File:**
    *   Must be an image format (Enforced by Storage Policy).

### 4.2. Business Logic Implementation
*   **Profile Creation:**
    *   *Logic:* A PostgreSQL Trigger (`on_auth_user_created`) automatically creates a row in the `public.profiles` table when a new user signs up in `auth.users`. This ensures every user has a profile container immediately.
*   **Private Profiles:**
    *   *Logic:* RLS policies are set to `SELECT ... USING (auth.uid() = id)`. This ensures that the API endpoint `GET /profiles` only returns the record belonging to the requester, effectively implementing the "private profile" requirement from the PRD.
*   **Session Persistence:**
    *   *Logic:* Handled by `lib/supabase/server.ts` and `middleware.ts`, converting Supabase's JWTs into secure HttpOnly cookies to persist sessions across page reloads and protect against XSS.
