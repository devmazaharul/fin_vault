// prisma.config.ts
import "dotenv/config";
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // এটি সরাসরি তোমার .env থেকে DATABASE_URL নিয়ে নেবে
    url: process.env.DATABASE_URL,
  },
});