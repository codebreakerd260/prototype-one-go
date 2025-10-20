# Production Guide

This guide provides a comprehensive overview of how to deploy and maintain the VYGUGA e-commerce application in a production environment.

## 1. Deployment

We recommend a JAMstack-style deployment, with the frontend hosted on a static hosting provider and the backend on a managed Node.js service.

### Frontend (Vercel)

Vercel is a great choice for deploying Vite + React applications.

1.  **Push your code to a Git repository** (e.g., GitHub, GitLab).
2.  **Sign up for a Vercel account** and connect it to your Git provider.
3.  **Create a new project** and import your repository.
4.  **Configure the project:**
    -   **Framework Preset:** Vercel should automatically detect Vite.
    -   **Build Command:** `npm run build`
    -   **Output Directory:** `dist`
5.  **Add Environment Variables:**
    -   You don't need to add any environment variables for the frontend, as it will make relative API requests to the backend.
6.  **Deploy!** Vercel will automatically build and deploy your frontend.

### Backend (Render)

Render is a modern cloud platform that makes it easy to deploy Node.js applications.

1.  **Sign up for a Render account** and connect it to your Git provider.
2.  **Create a new "Web Service"** and select your repository.
3.  **Configure the service:**
    -   **Environment:** Node
    -   **Root Directory:** `backend`
    -   **Build Command:** `npm run build`
    -   **Start Command:** `node dist/index.js`
4.  **Add Environment Variables:**
    -   `DATABASE_URL`: Your Neon database connection string (use the "pooled" connection string from Neon).
    -   `GOOGLE_CLIENT_ID`: Your Google OAuth client ID.
    -   `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret.
    -   `SESSION_SECRET`: A long, random string for session management.
5.  **Deploy!** Render will build and deploy your backend service.

**Important:** After deploying your backend, you'll need to update the Google OAuth redirect URI in the Google Cloud Console to use your new Render URL (e.g., `https://your-app-name.onrender.com/api/auth/google/callback`).

## 2. Environment Management

-   **Development:** Use a `.env` file in the `backend` directory for local development. This file should not be committed to version control.
-   **Production:** Use the environment variable management provided by your hosting providers (Vercel and Render). Never hardcode secrets in your code.

## 3. CI/CD (Continuous Integration / Continuous Deployment)

Both Vercel and Render have built-in CI/CD pipelines. When you push to your main branch, they will automatically trigger a new build and deployment.

For more advanced workflows, you can use **GitHub Actions**. Here's a basic example of a workflow that runs tests on every push:

```yaml
# .github/workflows/ci.yml
name: CI

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
```

## 4. Testing

### Backend (Vitest)

[Vitest](https://vitest.dev/) is a fast and modern testing framework.

1.  **Install Vitest:**
    ```bash
    cd backend
    npm install -D vitest
    ```
2.  **Create a test script** in `backend/package.json`:
    ```json
    "test": "vitest"
    ```
3.  **Write tests** for your API endpoints.

### End-to-End (Playwright)

[Playwright](https://playwright.dev/) is a great tool for end-to-end testing of your entire application.

1.  **Install Playwright:**
    ```bash
    npm init playwright@latest
    ```
2.  **Write tests** to simulate user flows, such as logging in, adding items to the cart, and checking out.

## 5. Monitoring & Logging

-   **Logging:** Both Vercel and Render provide real-time logging for your applications. For more advanced logging, consider a service like **Logtail** or **Sentry**.
-   **Uptime Monitoring:** Use a service like **UptimeRobot** to get notified if your application goes down.
-   **Performance Monitoring:** Use **Sentry** or **Datadog** to track performance and identify bottlenecks.

## 6. Security Checklist

-   [ ] **Use HTTPS:** Both Vercel and Render provide free SSL certificates.
-   [ ] **Secure your session secret:** Use a long, random string for your `SESSION_SECRET` and keep it out of version control.
-   [ ] **Set `cookie.secure` to `true` in production:** In `backend/src/index.ts`, set the session cookie to be secure in a production environment.
-   [ ] **Validate all user input:** Use a library like **Zod** to validate all incoming data on your backend.
-   [ ] **Rate Limiting:** Protect your API from brute-force attacks by implementing rate limiting (e.g., with `@fastify/rate-limit`).
-   [ ] **CORS:** Configure Cross-Origin Resource Sharing (CORS) on your backend to only allow requests from your frontend's domain (e.g., with `@fastify/cors`).
-   [ ] **Regularly update dependencies:** Use `npm audit` to check for security vulnerabilities in your dependencies.
