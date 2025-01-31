# ใช้ Base Image ของ Bun
FROM oven/bun:latest AS builder

# ตั้ง Working Directory
WORKDIR /app

# คัดลอกไฟล์โปรเจกต์
COPY . .

# ติดตั้ง Dependencies
RUN bun install

# ใช้ Nginx เพื่อ Proxy Backend
FROM nginx:latest

# คัดลอกไฟล์ Nginx Configuration
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# คัดลอก SSL Certificates (เตรียมไว้ในเครื่องโฮสต์)
COPY ./certs /etc/nginx/certs

# คัดลอก Backend Source Code จาก builder image
COPY --from=builder /app /app
WORKDIR /app

# เปิดพอร์ต HTTPS
EXPOSE 443

# รัน Nginx
CMD ["nginx", "-g", "daemon off;"]
