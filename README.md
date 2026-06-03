# Pern Chat App

An extensible, real-time chat application built with the PERN stack (Postgres, Express, React, Node) and Socket.IO.

TL;DR: Backend (Express + Prisma + Socket.IO) on `backend/`, Frontend (Vite + React + TypeScript) on `frontend/`.

## Table of contents

- [Features](#features)
- [Tech stack & architecture](#tech-stack--architecture)
- [Prerequisites](#prerequisites)
- [Getting started (dev)](#getting-started-dev)
- [Environment variables](#environment-variables)
- [Database (Prisma)](#database-prisma)
- [Scripts](#scripts)
- [Testing & linting](#testing--linting)
- [Deployment notes](#deployment-notes)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time one-to-one and group messaging via `socket.io`
- Persistent messages stored in PostgreSQL via Prisma
- JWT-based authentication with protected API routes
- Clean separation: `backend/` API and `frontend/` client

## Tech stack & architecture

- Frontend: React, Vite, TypeScript
- Backend: Node.js, Express, TypeScript, Socket.IO
- Database: PostgreSQL with Prisma ORM
- Auth: JWT
- Realtime: Socket.IO (in `backend/socket/socket.ts`)

The server exposes REST endpoints for auth and message history and uses Socket.IO for live messaging and presence.

## Prerequisites

- Node.js 18+ (or latest LTS)
- npm, yarn, or pnpm
- PostgreSQL (local or hosted)

## Getting started (dev)

1. Install dependencies for both projects:

```bash
# from repo root
cd backend
npm install

cd ../frontend
npm install
```

2. Copy the backend env example and fill values:

```bash
cp backend/.env.example backend/.env
# edit backend/.env and set DATABASE_URL, JWT_SECRET, etc.
```

3. Prepare the database and run migrations:

```bash
cd backend
npx prisma migrate dev --name init
```

4. Start the backend and frontend in parallel (two terminals):

```bash
# backend
cd backend
npm run dev

# frontend
cd frontend
npm run dev
```

Open the frontend URL shown by Vite (typically `http://localhost:5173`). The frontend expects the backend/socket server to be reachable at the backend `PORT` (default `4000`).

## Environment variables

Create `backend/.env` with at least:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET=supersecretjwtkey
PORT=4000
```

Optional: add `FRONTEND_URL` or CORS origins if hosting frontend separately.

## Database (Prisma)

- Schema: `backend/prisma/schema.prisma`
- Migrate: `npx prisma migrate dev` (dev), `npx prisma migrate deploy` (production)
- Introspect an existing DB: `npx prisma db pull`

Consider adding `backend/.env.example` containing required variables for developers.

## Scripts

Backend (from `backend/`):

- `npm run dev` — start dev server (ts-node / nodemon)
- `npm run build` — compile TypeScript
- `npm run start` — run compiled server

Frontend (from `frontend/`):

- `npm run dev` — start Vite dev server
- `npm run build` — build production assets
- `npm run preview` — preview production build

## Testing & linting

If tests or linters are configured, run them from each package. Example placeholders:

```bash
cd backend
npm test
npm run lint

cd ../frontend
npm test
npm run lint
```

Add test coverage and CI as needed.

## Deployment notes

- Build the frontend and serve static files from a CDN or a web server.
- Run the backend on a Node host; set `DATABASE_URL` and `JWT_SECRET` in production.
- Use `npx prisma migrate deploy` during production deploys.
- When deploying sockets behind proxies/load balancers, ensure sticky sessions or use a shared adapter (e.g., Redis) for Socket.IO.

## Contributing

- Fork, create a feature branch, run tests, and open a PR with a clear description. Add or update `backend/.env.example` if env requirements change.

## License

MIT

---
