# VYGUGA Backend

This directory contains the backend for the VYGUGA e-commerce application, built with Fastify, TypeScript, and Drizzle ORM.

## Prerequisites

- Node.js (v18 or higher)
- npm

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create a `.env` file:**
   Create a `.env` file in the `backend` directory and add the following environment variables:

   ```
   DATABASE_URL="your_neon_database_url"
   ```

3. **Run database migrations:**
   ```bash
   npm run drizzle:migrate
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

   The server will be running on `http://localhost:3000`.

## Scripts

- `npm start`: Starts the development server with `ts-node`.
- `npm run build`: Compiles the TypeScript code to JavaScript in the `dist` directory.
- `npm run drizzle:generate`: Generates database migrations based on your schema changes.
- `npm run drizzle:migrate`: Applies the pending database migrations.
