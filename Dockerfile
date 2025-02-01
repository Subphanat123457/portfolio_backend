FROM node:18-bullseye

# ติดตั้ง Bun
RUN curl -fsSL https://bun.sh/install | bash

# เพิ่ม Bun ใน PATH
ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY src src
COPY tsconfig.json .
COPY prisma ./prisma/

# ใช้ npx เพื่อสร้าง Prisma Client
RUN npx prisma generate

CMD ["bun", "run", "src/index.ts"]
