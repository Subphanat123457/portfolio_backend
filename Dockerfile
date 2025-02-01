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

# ตั้งค่า Environment สำหรับ Production
ENV NODE_ENV production

# รัน Backend Server
CMD ["bun", "src/index.ts"]

# ใช้ Base Image ของ Nginx เพื่อทำ Reverse Proxy
FROM nginx:latest AS nginx

# คัดลอกไฟล์ Nginx Configuration
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# คัดลอก SSL Certificates (ถ้ามี)
COPY ./server.key ./server.csr /etc/nginx/certs/

# คัดลอก Backend จาก Backend Stage
COPY --from=backend /app /app

# เปิดพอร์ต HTTP และ HTTPS
EXPOSE 80
EXPOSE 443

# รัน Nginx
CMD ["nginx", "-g", "daemon off;"]