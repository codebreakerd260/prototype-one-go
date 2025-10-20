# Database Guide

This guide provides an overview of the database schema for the VYGUGA application and explains how to manage it using Drizzle ORM.

## Schema

The database schema is defined in `backend/src/db/schema.ts` and includes the following tables:

- `users`: Stores user information, including their email, name, and OAuth provider details.
- `products`: Contains the product catalog, with details like name, description, price, and image URL.
- `orders`: Tracks customer orders, including the user, total amount, and order status.
- `order_items`: A join table that links orders to the products they contain.
- `carts`: Represents a user's shopping cart.
- `cart_items`: A join table that links carts to the products they contain.

## Migrations

Database migrations are managed using Drizzle Kit.

### Connecting to the Database

To run migrations, you first need to connect to your Neon database:

1.  **Create a `.env` file** in the `backend` directory.
2.  **Add your Neon database connection string** to the `.env` file:

    ```
    DATABASE_URL="postgres://user:password@host:port/dbname"
    ```

### Generating Migrations

Whenever you make a change to the schema in `backend/src/db/schema.ts`, you need to generate a new migration file:

```bash
npm run drizzle:generate
```

This command will compare your schema with the current state of the database and create a new SQL migration file in `backend/src/db/migrations`.

### Applying Migrations

To apply the pending migrations to your database, run the following command:

```bash
npm run drizzle:migrate
```

This command will execute all the migration files that have not yet been applied to the database.
