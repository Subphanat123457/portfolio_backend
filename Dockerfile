# ใช้ Base Image ของ Bun สำหรับการ Build
FROM oven/bun:latest AS builder

# ตั้งค่า Working Directory
WORKDIR /app

# คัดลอกไฟล์ทั้งหมดไปยัง Working Directory
COPY . .

# ติดตั้ง Dependencies
RUN bun install

# ใช้ Nginx เพื่อทำ Reverse Proxy
FROM nginx:latest

# คัดลอกไฟล์ Nginx Configuration
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# คัดลอก SSL Certificates (server.key และ server.csr)
COPY ./server.key ./server.csr /etc/nginx/certs/

# คัดลอก Backend Source Code จาก builder stage
COPY --from=builder /app /app

# ตั้งค่า Working Directory สำหรับการทำงาน
WORKDIR /app

# เปิดพอร์ต HTTPS
EXPOSE 443

# รัน Nginx
CMD ["nginx", "-g", "daemon off;"]
