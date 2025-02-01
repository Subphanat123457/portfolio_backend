FROM oven/bun:latest

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY src src
COPY tsconfig.json .
COPY prisma ./prisma/ 

RUN npx prisma generate # สร้าง Prisma Client

CMD ["bun", "run", "src/index.ts"]
