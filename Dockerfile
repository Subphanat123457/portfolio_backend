# ใช้ Base Image ของ Bun
FROM oven/bun:latest AS backend

# ตั้งค่า Working Directory
WORKDIR /app

# คัดลอก Dependencies
COPY package.json .
COPY bun.lockb .

# ติดตั้ง Dependencies (ใช้ production เท่านั้น)
RUN bun install --production

# คัดลอก Source Code
COPY src src
COPY tsconfig.json .

# กำหนด Environment Variable (ในกรณีที่ไม่กำหนดจากภายนอก)
ENV NODE_ENV=production
ENV PORT=9000

# เปิดพอร์ตที่ต้องการ
EXPOSE 9000

# รัน Backend Server
CMD ["bun", "src/index.ts"]
