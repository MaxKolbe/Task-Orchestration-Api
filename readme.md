# Task Orchestration Framework

## Summary & Purpose
The Task Orchestration Framework is a modular backend application architected to manage and orchestrate tasks efficiently. Built to offer a robust and scalable architecture, it features various task-related operations including creation, cursor-based pagination, updates, photo uploads, and deletion. It also integrates Paystack for processing donations. The repository serves as a showcase of multiple stack combinations, maintaining several branches that demonstrate different database and feature integrations (MongoDB, PostgreSQL, Redis, Cloudinary), culminating in the main branch which utilizes Drizzle-ORM.

## Tech Stack
- **Language**: TypeScript / Node.js
- **Framework**: Express.js
- **Database / ORM**: PostgreSQL, Drizzle ORM
- **Authentication / Networking**: CORS, node-fetch
- **File Uploads**: Multer, Cloudinary (showcased in `s3` branch)
- **Tooling**: Jest, ESLint, Prettier, nodemon, tsx

## Setup Guide
Follow these steps to set up the project locally:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TaskOrchestrationFramework
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Configure your `.env` file with the necessary credentials. You will need:
   - Database connection strings
   - `TEST_PAYSTACK_KEY` for processing test donations
   - Any other required service keys (e.g., Cloudinary, depending on the branch features you wish to access)

4. **Database Operations (DrizzleKit)**
   - Push schema changes to the database directly (dev): `npm run db:push`
   - Generate database migrations: `npm run db:generate`
   - Apply migrations to database: `npm run db:migrate`
   - Generate & Migrate in one command: `npm run db:gen-mig`

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

7. **Other Scripts**
   - Run unit tests: `npm run test`
   - Format code: `npm run format`
   - Lint code: `npm run lint`

## Folder Structure
The application uses a modular (feature-based) architecture to keep business logic isolated and manageable:

```
/src
 ├── modules/
 │    ├── todo/             # Todo item management (controllers, routes, services, models)
 │    ├── payment/          # Paystack donation processing implementation
 │    ├── auth/             # Authentication handling module
 │    ├── user/             # User management module
 │    └── references/       # External reference integrations
 ├── configs/               # Configuration files (DB, Environment, Logger, Multer)
 ├── middlewares/           # Global middlewares (Error handling, Validation)
 ├── utils/                 # Utilities (cacheUtils, encode/decode function, responseHandler)
 ├── types/                 # Custom TypeScript type definitions
 ├── app.ts                 # Express application setup and routing orchestrator
 └── index.ts               # Server entry point
```

## API Endpoints

### Todo Items (Base: `/v1/`)
- `GET /v1/todos` - Retrieve all todo items.
- `GET /v1/todos/cursor` - Retrieve todo items using cursor-based pagination.
- `GET /v1/todos/todo/:id` - Retrieve a single todo item by its ID.
- `POST /v1/todos` - Create a new todo item.
- `PUT /v1/todos/:id` - Update an existing todo item.
- `DELETE /v1/todos/:id` - Delete a todo item.
- `POST /v1/photo` - Upload a photo (expects an `avatar` file field).

### Donations (Base: `/v1/donate`)
- `POST /v1/donate` - Initialize a donation transaction using Paystack (expects `email`, `amount` in request body).
- `GET /v1/donate/success` - Callback endpoint to verify the transaction status asynchronously.

## Branches
The repository contains isolated implementations to demonstrate various stack choices. Checkout these branches to experience isolated use-cases:
1. **Todo app with static/in-memory database**: `branch/static`
2. **Todo app using mongodb database**: `branch/mongo`
3. **Todo app using postgresql database**: `branch/postgres`
4. **Todo app using drizzle-orm**: `branch/drizzle`
5. **Todo app with redis cache**: `cache`
6. **Todo app with third party media storage (with cloudinary)**: `branch/s3`
7. **Todo app with paystack api**: `branch/paystack`

*The main branch composes of all these technologies but primarily focuses on Drizzle-ORM for database orchestration.*
