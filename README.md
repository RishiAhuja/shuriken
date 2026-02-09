# Shuriken

A production-ready Next.js starter template with authentication, database, and modern tooling.

## Overview

Shuriken is a minimal, professional starter template for building Next.js applications. It includes essential authentication, database setup, and a clean UI component library - without opinionated features that you might not need.

## Architecture

Shuriken uses a **split-application architecture** with two separate Next.js applications:

### Port 3001: Landing Page (`/landing` directory)
- Public-facing website
- Marketing content and product information  
- Static pages that can be deployed to CDN edge
- Simple, fast, SEO-friendly

### Port 3000: Main Application (`/app` directory)
- Protected dashboard and features
- Authentication required
- Full API backend
- Database access via Prisma

**Why Split Architecture?**
- **Performance**: Deploy landing to CDN edge, app to server
- **Scalability**: Scale each independently based on traffic
- **Flexibility**: Update marketing without touching core app
- **Security**: Keep sensitive application logic separate
- **Deployment**: Use different strategies (edge vs serverless vs container)

## Tech Stack

### Core
- **Next.js 16** - App Router, Server Components, Turbopack
- **TypeScript** - Strict mode for type safety
- **React 19** - Latest React features

### Database
- **PostgreSQL** - Relational database
- **Prisma ORM** - Type-safe database client
- **shadcn/ui** - 50+ accessible components built on Radix UI primitives
- **Tailwind CSS v4** - Utility-first CSS with custom design tokens
- **CVA** - Class variance authority for component variants
- **Indigo/Emerald theme** - Professional color system with semantic intent

### Developer Experience
- **Pino** - High-performance structured logging with environment-aware formatting
- **Biome** - Fast linting and formatting (ESLint + Prettier replacement)
### Authentication
- **Session-based auth** - Secure cookie sessions
- **Password hashing** - bcrypt for secure storage
- **Zod validation** - Runtime schema validation

### UI & Styling
- **shadcn/ui** - 50+ components built on Radix UI
- **Tailwind CSS v4** - Utility-first styling
- **Indigo + Emerald theme** - Professional color system

### Developer Tools
- **Biome** - Fast linting and formatting
- **SWR** - Data fetching with caching
- **Husky** - Git hooks for quality checks
- **pnpm** - Fast package manager

### Optional Features
- **Docker** - Production deployment
- **SOPS** - Encrypted secrets (remove if not needed)

## Quick Start

### Prerequisites

- **Node.js** 20.x or later
- **pnpm** 9.x or later  
- **PostgreSQL** database
- **age** CLI (optional, for secrets)

### Installation

1. **Clone and install**
   ```bash
   git clone <your-repository-url>
   cd shuriken
   pnpm install
   ```

2. **Set up environment**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your database URL and settings.
   ```bash
   pnpm secrets:edit
   ```

3. **Set up database**
   ```bash
   # Run migrations
   pnpm db:migrate
   
   # (Optional) Seed with sample data
   pnpm db:seed
   ```

4. **Start development**
   
   Start both apps concurrently:
   ```bash
   pnpm mprocs
   ```
   
   Or start individually:
   ```bash
   # Main app (port 3000)
   pnpm dev
   
   # Landing page (port 3001)  
   cd landing && pnpm dev
   ```

5. **Open in browser**
   - Landing: [http://localhost:3001](http://localhost:3001)
   - Dashboard: [http://localhost:3000](http://localhost:3000)

## Project Structure

```
shuriken/
├── app/                          # Main app (port 3000)
│   ├── (dashboard)/              # Protected routes  
│   │   └── dashboard/            # Dashboard page
│   ├── api/                      # API routes
│   │   └── auth/                 # Auth endpoints
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Redirects to landing
├── landing/                      # Landing app (port 3001)
│   ├── app/                      # Landing pages
│   ├── components/               # Landing components
│   └── public/                   # Static assets (logo.png)
├── components/                   # Main app components
│   └── ui/                       # shadcn/ui components (50+)
├── hooks/                        # Custom React hooks
├── lib/                          # Core utilities  
│   ├── auth/                     # Auth helpers
│   ├── db.ts                     # Prisma client
│   └── env.ts                    # Env validation
├── services/                     # Business logic
│   └── auth/                     # Auth service
├── packages/database/            # Prisma schema
├── infrastructure/               # Docker configs (optional)
└── docs/                         # Documentation
```

## Logo Placement

**Place your Shuriken logo at:**
```
landing/public/logo.png
```

The logo will appear in:
- Landing page navbar (32x32px)
- Landing page hero (160x160px)

Recommended: PNG with transparent background, square aspect ratio.

## Environment Variables

Create `.env.local` with:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/db
NEXT_PUBLIC_MAIN_APP_URL=http://localhost:3000
NEXT_PUBLIC_LANDING_URL=http://localhost:3001
## Database

Minimal Prisma schema with essential models:
- **User** - Accounts with email and password
- **Session** - Active sessions with expiration
- **LoginHistory** - Optional login tracking
- **ActivityEvent** - Optional activity logging  
- **AuditLog** - Optional audit trail

### Commands

```bash
pnpm db:studio      # Open Prisma Studio (GUI)
pnpm db:generate    # Generate Prisma Client
pnpm db:migrate     # Run migrations
pnpm db:push        # Push schema (dev only)
pnpm db:seed        # Seed database
```

## UI Components

Built with shadcn/ui - 50+ components with Indigo (primary) and Emerald (success) theme:

- **Forms**: Input, Select, Checkbox, Radio, Switch, Textarea
- **Overlays**: Dialog, Sheet, Popover, Dropdown Menu, Tooltip
- **Data**: Table, Card, Badge, Avatar, Separator
- **Navigation**: Tabs, Breadcrumb, Sidebar
- **Feedback**: Alert, Toast, Progress, Spinner

```tsx
import { Button } from '@/components/ui/button';

<Button variant="default">Primary</Button>
<Button variant="success">Success</Button>
<Button variant="destructive">Delete</Button>
```

**Design Principles:**
- Hard edges (rounded-none) for modern, sharp look
- 2px borders for strong definition
- Indigo primary, Emerald success, Amber warning
- No animations (fast, professional)

See [components documentation](docs/design/design.md) for details.

## Docker Deployment (Optional)

### Development

```bash
pnpm docker:dev              # Start
pnpm docker:dev:down         # Stop services
```

### Production

```bash
pnpm docker:prod             # Build and deploy
pnpm docker:prod:logs        # View logs
pnpm docker:prod:down        # Stop services
```

Production setup includes multi-stage builds, health checks, persistent volumes, and Next.js standalone output.

## Authentication

Custom session-based authentication with password hashing, session management, and login history tracking.

```typescript
import { requireAuth, getOptionalAuth } from '@/lib/auth/utils';

// Protected API route
export async function GET(req: Request) {
  const { user } = await requireAuth(req);
  // user guaranteed
}
```

## Email

React Email templates in `services/email/templates/`:

```tsx
import { Button, Html, Text } from '@react-email/components';

export function WelcomeEmail({ name }: { name: string }) {
  return (
    <Html>
      <Text>Welcome, {name}!</Text>
      <Button href="https://yourapp.com">Get Started</Button>
    </Html>
  );
}
```

Send emails:

```typescript
import { sendEmail } from '@/services/email/email-service';

await sendEmail({
  to: 'user@example.com',
  subject: 'Welcome!',
  react: <WelcomeEmail name={user.name} />,
});
```

## Data Fetching

### SWR Hooks

```typescript
import { useFetch } from '@/hooks/use-fetch';

function Profile() {
  const { data, error, isLoading } = useFetch('/api/profile');
  if (isLoading) return <Spinner />;
  return <div>{data.name}</div>;
}
```

### Mutations

```typescript
import { useMutation } from '@/hooks/use-mutation';

const { trigger, isMutating } = useMutation('/api/profile', {
  method: 'PUT',
  onSuccess: () => toast.success('Updated'),
});
```

## Code Quality

```bash
pnpm lint           # Check issues
pnpm format         # Format files
pnpm type-check     # TypeScript check
```

Husky runs Biome checks before every commit.

## Customization

### Remove Features

**Authentication:** Delete `app/api/auth`, `lib/auth`, `services/auth` and related schema models

**Email:** Delete `services/email`, remove `resend` and `@react-email/*` from `package.json`

**Redis:** Remove from Docker Compose, delete Redis code, remove from `package.json`

### Add Features

- **API routes:** Add to `/app/api/`
- **Pages:** Add to `/app/` or `/app/(dashboard)/`
- **Business logic:** Add to `/services/`
- **Database models:** Update `packages/database/prisma/schema.prisma`

## Deployment

### Vercel

1. Connect repository to Vercel
2. Add environment variables
3. Deploy

### Docker (VPS, AWS, GCP)

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

1. SOPS encryption for secrets
2. Zod validation for all inputs
3. PII redaction in logs
4. Secure password hashing
5. Session expiration
6. CORS configuration

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

MIT

## Support

Open a GitHub issue for questions or problems.
