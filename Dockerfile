FROM node:20-alpine

# ১. pnpm এনাবল করা
RUN corepack enable

WORKDIR /app

# ২. আগে শুধু প্যাকেজ ফাইলগুলো কপি করা (এটিই হলো অপ্টিমাইজেশন)
COPY package.json pnpm-lock.yaml ./

# ৩. ডিপেন্ডেন্সি ইনস্টল করা (লেয়ার ক্যাশ হবে)
RUN pnpm install

# ৪. এবার বাকি সব কোড কপি করা
COPY . .

# ৫. বিল্ড এবং জেনারেট করা
RUN npx prisma generate
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]