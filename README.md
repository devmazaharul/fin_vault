# 🏦 AI-Driven Conversational Fintech Dashboard

Natural language → Banking action. Powered by Gemini + Next.js 15 + PostgreSQL.

This project is a modern fintech dashboard built with Next.js 15 (App Router). It allows users to perform banking actions (like transferring money or checking balances) using natural language, powered by the Vercel AI SDK and Google's Gemini LLM.

## 🧱 Tech Stack

| Layer             | Technology                            |
| :---------------- | :------------------------------------ |
| **Framework**     | Next.js 15 (App Router)               |
| **Language**      | TypeScript                            |
| **Styling**       | Tailwind CSS v4                       |
| **UI Library**    | shadcn/ui + Radix UI                  |
| **AI**            | Vercel AI SDK + Gemini 1.5 Flash      |
| **Auth**          | NextAuth.js v5 (Credentials + JWT)    |
| **Database**      | PostgreSQL (Docker)                   |
| **ORM**           | Prisma v6                             |
| **Validation**    | Zod                                   |
| **Rate Limiting** | Upstash Ratelimit / Custom middleware |
| **Container**     | Docker + Docker Compose               |

---

## 🔒 Security Checklist

- ✅ **Passwords** — bcrypt hash (saltRounds: 12)
- ✅ **JWT** — HttpOnly cookie, 15min access token
- ✅ **Route Protection** — `middleware.ts` for `/dashboard` guards
- ✅ **AI Tools** — LLM has no direct DB access, only predefined secure tools
- ✅ **Zod Validation** — Strict validation for all API inputs
- ✅ **Rate Limiting** — Max 20 req/min on `/api/chat` route
- ✅ **Human-in-the-loop** — Transfer confirmation modal required before transactions
- ✅ **Audit Log** — All financial actions are logged
- ✅ **Prompt Injection Guard** — System prompt designed to prevent sensitive data leaks

---

## 📁 Project Structure

```text
fintech-ai/
├── .env.local                     # Environment variables (ignored in git)
├── .env.example                   # Example env template
├── docker-compose.yml             # PostgreSQL container config
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
│   ├── app/                       # Next.js App Router
│   │   ├── (auth)/                # Login & Register pages
│   │   ├── dashboard/             # Dashboard, Chat, Transactions, Settings
│   │   └── api/                   # API Routes (Auth, Chat, Transfer, Balance)
│   │
│   ├── components/                # React Components
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── auth/                  # Auth forms
│   │   ├── dashboard/             # Dashboard layout & tables
│   │   └── chat/                  # AI Chat interface & confirm modals
│   │
│   ├── lib/                       # Utilities (Prisma, NextAuth, Zod, AI tools)
│   ├── hooks/                     # Custom React hooks
│   └── middleware.ts              # Route protection
🚀 Getting StartedPrerequisitesMake sure you have Node.js and Docker installed on your machine.1. Clone & Install DependenciesBashnpm install
2. Environment VariablesCopy the example environment file and fill in your secure credentials:Bashcp .env.example .env.local
.env.local Configuration:Code snippet# Database
DATABASE_URL="postgresql://<YOUR_DB_USER>:<YOUR_DB_PASSWORD>@localhost:5432/<YOUR_DB_NAME>"

# NextAuth
NEXTAUTH_SECRET="<GENERATE_A_STRONG_SECRET_KEY>"
NEXTAUTH_URL="http://localhost:3000"

# AI
GOOGLE_GENERATIVE_AI_API_KEY="<YOUR_GEMINI_API_KEY>"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
3. Start PostgreSQL with DockerUpdate the docker-compose.yml with your desired secure credentials, then start the container:Bashdocker compose up -d
4. Database Setup (Prisma)Initialize the database and apply the schema:Bashnpx prisma generate
npx prisma migrate dev --name init
(Optional) Seed the database with initial data:Bashnpx prisma db seed
5. Start Development ServerBashnpm run dev
Visit http://localhost:3000 in your browser.🐳 Docker Setup (docker-compose.yml)YAMLversion: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: fintech_db
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${DB_USER:-<YOUR_DB_USER>}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-<YOUR_DB_PASSWORD>}
      POSTGRES_DB: ${DB_NAME:-<YOUR_DB_NAME>}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
📦 Available ScriptsCommandDescriptionnpm run devStart development servernpm run buildBuild the app for productionnpm run startStart production servernpm run lintRun ESLintnpm run db:pushPush schema state to database (Dev only)npm run db:migrateApply migrations to databasenpm run db:studioOpen Prisma Studio GUInpm run docker:upStart PostgreSQL container in backgroundnpm run docker:downStop PostgreSQL container🔄 Development Flownpm run docker:up → Start PostgreSQLnpm run db:migrate → Apply Schemanpm run dev → Start Next.js Appnpm run db:studio → Inspect DB data visually📌 Important NotesNextAuth v5: We are using NextAuth v5 (Beta), which provides excellent support for the Next.js App Router.Gemini Free Tier: Development costs utilizing Gemini API remain zero under the standard free tier limits.Docker Volumes: The postgres_data volume ensures that your database records persist even if the Docker container is restarted or recreated.Prisma Migrations: Use db:push for rapid prototyping in development, but strictly use db:migrate for production environments.
```
## 🛡️ Security Best Practices
- **Password Hashing**: User passwords are securely hashed using bcrypt with a saltRounds of 12, ensuring strong protection against brute-force attacks.
- **JWT Authentication**: The application uses JSON Web Tokens (JWT) for authentication, stored in HttpOnly cookies to prevent XSS attacks. Access tokens have a short lifespan of 15 minutes, and refresh tokens are securely managed.
- **Route Protection**: The `middleware.ts` file ensures that all routes under `/dashboard                  
` are protected and only accessible to authenticated users.
- **AI Tool Access Control**: The Gemini LLM is configured to only access predefined secure tools for banking actions, preventing any unauthorized database access.
- **Input Validation**: All API inputs are validated using Zod schemas to prevent injection attacks and ensure data integrity.
- **Rate Limiting**: The `/api/chat` route is protected with rate limiting (      max 20 requests per minute) to prevent abuse and ensure fair usage.
- **Human-in-the-loop Confirmation**: For sensitive actions like money transfers, a confirmation modal is required to ensure that the user explicitly approves the transaction before it is executed.
- **Audit Logging**: All financial actions are logged in the database for auditing purposes, allowing administrators to review transaction history and detect any suspicious activity.
- **Prompt Injection Guard**: The system prompt for the AI is designed to prevent any attempts to extract sensitive information or perform unauthorized actions, ensuring that the AI operates within defined security boundaries.  



