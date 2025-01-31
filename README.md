# Portfolio API

A RESTful API built with Elysia.js and Bun for managing portfolio content.

## Setup

1. Install dependencies:
```bash
bun install
```

2. Start the development server:
```bash
bun run dev
```

The API will be available at http://localhost:3000
Swagger documentation is available at http://localhost:3000/swagger

## API Endpoints

### Users
- GET /api/users - Get all users
- GET /api/users/:id - Get user by ID
- POST /api/users - Create new user
- PUT /api/users/:id - Update user

### Posts
- GET /api/posts - Get all posts
- GET /api/posts/:id - Get post by ID
- POST /api/posts - Create new post
- PUT /api/posts/:id - Update post
- DELETE /api/posts/:id - Delete post

## Project Structure

```
src/
├── controllers/     # Request handlers
├── services/       # Business logic
├── routes/         # Route definitions
├── models/         # Data models
├── utils/          # Utility functions
└── index.ts        # Application entry point
```