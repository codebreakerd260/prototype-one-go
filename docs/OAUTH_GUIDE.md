# OAuth Authentication Guide

This guide explains how to set up Google OAuth for the VYGUGA application.

## Setting up Google OAuth Credentials

1.  **Go to the Google Cloud Console:**
    Navigate to the [Google Cloud Console](https://console.cloud.google.com/) and create a new project.

2.  **Enable the Google People API:**
    In your project, go to the "APIs & Services" > "Library" section and enable the "Google People API".

3.  **Create OAuth Credentials:**
    - Go to "APIs & Services" > "Credentials".
    - Click "Create Credentials" and select "OAuth client ID".
    - Choose "Web application" as the application type.
    - Add `http://localhost:3000/api/auth/google/callback` to the "Authorized redirect URIs".
    - Click "Create".

4.  **Copy your Client ID and Client Secret:**
    After creating the credentials, you will see your **Client ID** and **Client Secret**. You will need these for your environment variables.

## Environment Variables

Add the following environment variables to your `.env` file in the `backend` directory:

```
# Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Session Management
SESSION_SECRET="a-very-long-and-random-secret-string-for-session"
```

Replace `"your_google_client_id"` and `"your_google_client_secret"` with the credentials you obtained from the Google Cloud Console. The `SESSION_SECRET` should be a long, random string to keep your user sessions secure.

## Authentication Flow

1.  The user clicks on a "Login with Google" button on the frontend, which navigates to `/api/auth/google`.
2.  The backend redirects the user to the Google login page.
3.  After the user approves the login, Google redirects them back to `/api/auth/google/callback`.
4.  The backend exchanges the authorization code for an access token, fetches the user's profile from Google, and creates or updates the user in the database.
5.  The user's ID is stored in a session, and they are redirected back to the frontend application.
6.  Subsequent requests from the user will include the session cookie, allowing the backend to identify them.
