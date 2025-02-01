# Use Bun as the base image for building the project
FROM oven/bun:1.0.0 AS build

# Set the working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies and build the project
RUN bun install
RUN bun run build

# Use Nginx to serve the built files
FROM nginx:latest

# Copy Nginx configuration file
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Copy SSL certificates
COPY ./server.csr /etc/nginx/certs/server.csr
COPY ./server.key /etc/nginx/certs/server.key

# Copy built files from the builder stage to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose HTTPS port
EXPOSE 443

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
