<div align="center">
  <img src="landing/public/logo.png" alt="Shuriken logo" width="250" />
  <h1>Shuriken</h1>
</div>

Shuriken is a sharp, production-ready Next.js starter for teams that want a clean, intentional foundation. It makes strong, battle-tested choices so you don’t have to.

The template is inspired by the development environment from my company, [zenbasehq/ninja](https://github.com/zenbasehq).

## Split Architecture

Shuriken runs two Next.js applications that deploy independently.

### Landing app (port 3001)

The landing app lives in the `landing/` directory. This is your public marketing site and the equivalent of `shuriken.com`. It is optimized for fast load times and clean SEO, and it can be deployed to a CDN edge with minimal runtime requirements.

### Main app (port 3000)

The main app lives in the root `app/` directory. This is your product and the equivalent of `app.shuriken.com`. It contains the dashboard, protected routes, and server-side API endpoints. Database access and server-only logic live here.

This separation keeps marketing fast and simple while letting the application scale independently.

## Why these tools

Shuriken is not a grab bag of libraries. Each tool exists to solve a concrete problem with minimal overhead.

- Next.js provides routing, server components, and deployment flexibility in one framework.
- TypeScript keeps the codebase strict and safe.
- Prisma gives a type-safe ORM and predictable migrations.
- Zod validates API inputs and environment variables early.
- Tailwind CSS provides fast, consistent styling.
- shadcn/ui gives a clean component system on top of Radix primitives.
- SWR handles client-side data fetching with cache and revalidation.
- Pino provides structured logging in development.
- Biome replaces ESLint and Prettier with a fast formatter and linter.
- Husky + lint-staged enforce clean commits.
- pnpm keeps installs fast and deterministic.
- Docker enables reproducible production builds.
- SOPS protects secrets across environments.
- mprocs runs the landing app, main app, and database together.

## Quick start

### Requirements

Node.js 20+, pnpm, and a Postgres database.

### Install

```bash
git clone git@github.com:RishiAhuja/shuriken.git
cd shuriken
pnpm install
```

### Environment

Create `.env` in the repository root:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/db
NEXT_PUBLIC_MAIN_APP_URL=http://localhost:3000
NEXT_PUBLIC_LANDING_URL=http://localhost:3001
```

### Database

```bash
pnpm db:migrate
pnpm db:seed
```

### Run both apps

```bash
pnpm mprocs
```

Landing runs at [http://localhost:3001](http://localhost:3001). The main app runs at [http://localhost:3000](http://localhost:3000).

## Project layout

```
shuriken/
├── app/                        # Main app (port 3000)
├── landing/                    # Landing app (port 3001)
├── components/                 # Shared UI components
├── hooks/                      # Shared hooks
├── lib/                        # Core utilities
├── services/                   # Business logic
├── packages/database/          # Prisma schema and migrations
└── docs/                       # Documentation
```

## Logo

Place your logo at:

```
landing/public/logo.png
```

This logo appears in the landing navbar and hero section.

## Features

Prisma provides typed access to Postgres. SWR handles client data fetching and cache revalidation. The UI system is built on Tailwind CSS and shadcn/ui with a sharp, high-contrast theme.

## Deployment

You can deploy the landing app separately from the main app. This allows `shuriken.com` to stay fast and static while `app.shuriken.com` scales for authenticated traffic. Docker configuration is provided for production environments if you want a containerized setup.

```bash
docker build -f infrastructure/dockerfiles/Dockerfile.prod -t shuriken .
docker compose -f infrastructure/docker/docker-compose.prod.yml up -d
```

### Railway / Render / Fly.io

Point to `infrastructure/dockerfiles/Dockerfile.prod` and configure environment variables.

## Performance

- Standalone Next.js output for minimal bundle
- Turbopack dev server
- Server Components for reduced JavaScript
- Prisma connection pooling
- Redis caching

## Security

- SOPS encryption for secrets
- Zod validation for all inputs
- Secure password hashing
- Session expiration
- CORS configuration
- In-memory rate limiting on auth endpoints

### Rate limiting

`lib/rate-limit.ts` implements a sliding window rate limiter applied to the login and register routes. Each client IP is tracked in a `Map` with a request count and a window expiry. Once the count exceeds the configured limit, the endpoint returns `429 Too Many Requests` with a `Retry-After` header.

Default limits: **10 requests per 60 seconds** for auth routes. The store cleans up expired entries every 60 seconds to prevent unbounded memory growth.

This is an in-memory implementation — it resets on process restart and does not share state across multiple instances. For multi-instance deployments, swap the store for Redis using `INCR` / `EXPIRE`.

## Troubleshooting

**Port in use:**
```bash
lsof -ti:3000 | xargs kill -9
```

**Prisma out of sync:**
```bash
pnpm db:generate
```

**Docker issues:**
```bash
pnpm docker:dev:down
docker system prune -a
pnpm docker:dev
```

**Secrets decryption:**
```bash
export SOPS_AGE_KEY_FILE=.age-key.txt
pnpm secrets:decrypt
```

## Contributing

1. Fork repository
2. Create feature branch
3. Run `pnpm lint` and `pnpm type-check`
4. Submit pull request

## License

MIT. See [LICENSE](LICENSE) for details.

Copyright (c) 2026 Rishi Ahuja

## Support

Open a GitHub issue for questions or problems.
