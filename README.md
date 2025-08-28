# Next Fullstack Auth

This is a simple authentication system built with **Next.js 15 App Router**, **TypeScript**, **Prisma**, and **JWT**. It demonstrates a modern approach to secure login, registration, and protected routes using server-side logic and refresh tokens.

---

## Features Implemented So Far

- **User Registration**
  - Users can register with `name`, `email`, and `password`.
  - Passwords are securely hashed using `argon2`.
  - Email is normalized to lowercase to avoid case-sensitivity issues.
  - Validations are enforced with **Zod**.
  - On success, the user is redirected to the **Login** page.

- **User Login**
  - Users can log in using email and password.
  - Passwords are verified using `argon2`.
  - Upon successful login:
    - An **access token** (15 min) and a **refresh token** (7 days) are generated using `jose`.
    - Refresh token is saved in the database.
    - Refresh token is stored as an **HttpOnly cookie**.
    - Old refresh tokens for the user are automatically deleted.
  - Login form validation using **react-hook-form + Zod**.
  - After login, the user is redirected to the **Dashboard**.

- **Logout**
  - Removes refresh token from the database.
  - Clears the refresh token cookie.

- **Protected Routes**
  - `/dashboard` and other sensitive pages require login.
  - Middleware verifies the refresh token before accessing protected routes.
  - Users who are already logged in cannot access `/login` or `/register`.
  - Unauthenticated users are redirected to `/login`.

- **Server-Side Dashboard**
  - Server-side rendering fetches user data from the database using the refresh token.
  - Displays real user information such as name and email.
  - Logout button is integrated in the dashboard.

---

## Libraries & Tools Used

- **Frontend:** Next.js 15, React, TypeScript, react-hook-form, Zod, axios
- **Backend:** Next.js API routes, Prisma / MongoDB
- **Security:** argon2 for password hashing, jose for JWT handling, HttpOnly cookies
- **State & UI:** Tailwind CSS

