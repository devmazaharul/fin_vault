# 🏦 AI-Driven Conversational Fintech Dashboard

> Natural language → Banking action. Powered by Gemini + Next.js 15 + PostgreSQL.

---

## ⚠️ Note on Next.js Version

Next.js **16.2.4 এখনো exist করে না**। Latest stable হলো **Next.js 15.x**।  
এই project Next.js **15 (App Router)** দিয়ে build করা হবে।

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **UI Library** | shadcn/ui + Radix UI |
| **AI** | Vercel AI SDK + Gemini 1.5 Flash |
| **Auth** | NextAuth.js v5 (Credentials + JWT) |
| **Database** | PostgreSQL (Docker) |
| **ORM** | Prisma v6 |
| **Validation** | Zod |
| **Rate Limiting** | Upstash Ratelimit / custom middleware |
| **Container** | Docker + Docker Compose |

---

## 📁 Project Structure

```
fintech-ai/
├── .env.local                     # Environment variables
├── .env.example                   # Example env (commit this)
├── docker-compose.yml             # PostgreSQL container
├── next.config.ts                 # Next.js config
├── tailwind.config.ts             # Tailwind config
├── tsconfig.json
├── components.json                # shadcn/ui config
│
├── prisma/
│   ├── schema.prisma              # Database schema
│   ├── seed.ts                    # Seed data
│   └── migrations/                # Auto-generated migrations
│
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Landing page (redirect to login)
│   │   │
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx       # Login page
│   │   │   └── register/
│   │   │       └── page.tsx       # Register page
│   │   │
│   │   ├── dashboard/
│   │   │   ├── layout.tsx         # Dashboard layout (sidebar + topbar)
│   │   │   ├── page.tsx           # Dashboard home (balance overview)
│   │   │   ├── chat/
│   │   │   │   └── page.tsx       # AI Chat interface
│   │   │   ├── transactions/
│   │   │   │   └── page.tsx       # Transaction history
│   │   │   └── settings/
│   │   │       └── page.tsx       # Account settings
│   │   │
│   │   └── api/
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts   # NextAuth handler
│   │       ├── chat/
│   │       │   └── route.ts       # AI chat endpoint (streamText)
│   │       ├── transfer/
│   │       │   └── route.ts       # Money transfer API
│   │       ├── balance/
│   │       │   └── route.ts       # Get balance API
│   │       └── history/
│   │           └── route.ts       # Transaction history API
│   │
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components (auto-generated)
│   │   ├── auth/
│   │   │   ├── login-form.tsx
│   │   │   └── register-form.tsx
│   │   ├── dashboard/
│   │   │   ├── sidebar.tsx
│   │   │   ├── topbar.tsx
│   │   │   ├── balance-card.tsx
│   │   │   └── transaction-table.tsx
│   │   └── chat/
│   │       ├── chat-interface.tsx  # Main chat UI
│   │       ├── message-bubble.tsx
│   │       └── confirm-modal.tsx   # Human-in-the-loop modal
│   │
│   ├── lib/
│   │   ├── prisma.ts              # Prisma client singleton
│   │   ├── auth.ts                # NextAuth config
│   │   ├── validations.ts         # Zod schemas
│   │   ├── ai-tools.ts            # AI function calling tools
│   │   └── rate-limit.ts          # Rate limiting logic
│   │
│   ├── hooks/
│   │   └── use-confirm.ts         # Confirmation dialog hook
│   │
│   ├── types/
│   │   └── index.ts               # Global TypeScript types
│   │
│   └── middleware.ts              # Route protection middleware
```

---

## 🐳 Docker Setup

### `docker-compose.yml`

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: fintech_db
    restart: unless-stopped
    environment:
      POSTGRES_USER: fintech_user
      POSTGRES_PASSWORD: fintech_pass
      POSTGRES_DB: fintech_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## 🗄️ Prisma Schema

### `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String        @id @default(cuid())
  name         String
  email        String        @unique
  password     String        // bcrypt hashed
  balance      Float         @default(0)
  pin          String?       // bcrypt hashed 4-digit PIN
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt

  sentTransactions     Transaction[] @relation("Sender")
  receivedTransactions Transaction[] @relation("Receiver")
  auditLogs            AuditLog[]
}

model Transaction {
  id          String            @id @default(cuid())
  amount      Float
  note        String?
  status      TransactionStatus @default(PENDING)
  createdAt   DateTime          @default(now())

  senderId    String
  sender      User @relation("Sender", fields: [senderId], references: [id])

  receiverId  String
  receiver    User @relation("Receiver", fields: [receiverId], references: [id])
}

model AuditLog {
  id        String   @id @default(cuid())
  action    String   // "TRANSFER", "LOGIN", "CHANGE_PIN"
  details   Json     // flexible metadata
  ip        String?
  createdAt DateTime @default(now())

  userId    String
  user      User @relation(fields: [userId], references: [id])
}

enum TransactionStatus {
  PENDING
  COMPLETED
  FAILED
  CANCELLED
}
```

---

## 🔐 Environment Variables

### `.env.example`

```env
# Database
DATABASE_URL="postgresql://fintech_user:fintech_pass@localhost:5432/fintech_db"

# NextAuth
NEXTAUTH_SECRET="your-super-secret-key-change-this"
NEXTAUTH_URL="http://localhost:3000"

# AI
GOOGLE_GENERATIVE_AI_API_KEY="your-gemini-api-key"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🚀 Installation & Setup Commands

### Step 1 — Project Create করো

```bash
npx create-next-app@latest fintech-ai \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd fintech-ai
```

### Step 2 — Dependencies Install

```bash
# Core AI
npm install ai @ai-sdk/google

# Auth
npm install next-auth@beta

# Database
npm install prisma @prisma/client
npm install -D prisma

# Validation
npm install zod

# UI Components (shadcn setup)
npx shadcn@latest init

# shadcn components add করো
npx shadcn@latest add button input card dialog badge
npx shadcn@latest add table separator skeleton toast
npx shadcn@latest add dropdown-menu avatar sheet

# Password hashing
npm install bcryptjs
npm install -D @types/bcryptjs

# Additional utilities
npm install clsx tailwind-merge lucide-react
npm install @radix-ui/react-icons
```

### Step 3 — Docker দিয়ে PostgreSQL Start করো

```bash
# docker-compose.yml তৈরি করো (উপরের config দিয়ে)
docker compose up -d

# Container চলছে কিনা check করো
docker ps
```

### Step 4 — Prisma Setup

```bash
# Prisma initialize
npx prisma init

# schema.prisma লেখার পর migration run করো
npx prisma migrate dev --name init

# Prisma Studio (DB GUI)
npx prisma studio

# Seed data (optional)
npx prisma db seed
```

### Step 5 — shadcn/ui Configure

```bash
# components.json এ এই config থাকবে
# style: "default"
# baseColor: "slate"
# cssVariables: true
```

### Step 6 — Dev Server Start

```bash
npm run dev
# http://localhost:3000
```

---

## 🔒 Security Checklist

```
✅ Passwords — bcrypt hash (saltRounds: 12)
✅ JWT — HttpOnly cookie, 15min access token
✅ Route Protection — middleware.ts দিয়ে /dashboard guard
✅ AI Tools — LLM কে direct DB access নেই, শুধু predefined tools
✅ Zod Validation — সব API input validate করা
✅ Rate Limiting — /api/chat route এ max 20 req/min
✅ Human-in-the-loop — transfer confirm modal
✅ Audit Log — সব financial action log হয়
✅ Prompt Injection Guard — system prompt এ sensitive data leak prevention
```

---

## 🗂️ Key Files Quick Reference

| File | কী করে |
|---|---|
| `src/middleware.ts` | Dashboard route protect করে |
| `src/lib/auth.ts` | NextAuth config (credentials provider) |
| `src/lib/ai-tools.ts` | transferMoney, getBalance, getHistory tools |
| `src/app/api/chat/route.ts` | Gemini streamText endpoint |
| `src/lib/validations.ts` | Zod schemas for all inputs |
| `prisma/schema.prisma` | User, Transaction, AuditLog models |
| `docker-compose.yml` | PostgreSQL container |

---

## 📦 Scripts (package.json)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "db:seed": "ts-node prisma/seed.ts",
    "docker:up": "docker compose up -d",
    "docker:down": "docker compose down"
  }
}
```

---

## 🔄 Development Flow

```
1. docker:up          → PostgreSQL start
2. db:migrate         → Schema apply
3. dev                → Next.js start
4. prisma studio      → DB GUI (optional)
```

---

## 📌 Important Notes

- **Next.js version**: 15 (latest) — 16 exist করে না এখনো
- **NextAuth v5**: beta কিন্তু stable enough, App Router-এর জন্য best
- **Gemini Free Tier**: development-এ cost zero
- **Docker Volume**: `postgres_data` — container restart করলেও data থাকবে
- **Prisma Migrate vs DB Push**: development-এ `db push`, production-এ `migrate`