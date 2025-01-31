import { Elysia, t } from 'elysia';
import { userController } from '../controllers/userController';

export const userRoutes = new Elysia({ prefix: '/users' })
    // GET /users
    .get('/', () => userController.getUsers(), {
        detail: {
            summary: 'Get all users',
            tags: ['User'], // ระบุหมวดหมู่
            responses: {
                200: { description: 'Successfully retrieved users' },
            },
        },
    })
    // GET /users/:userId
    .get('/:userId', ({ params }) => userController.getUser({ params }), {
        params: t.Object({
            userId: t.String(), // ตรวจสอบว่า userId เป็น string
        }),
        detail: {
            summary: 'Get user by user ID',
            tags: ['User'], // ระบุหมวดหมู่
            responses: {
                200: { description: 'Successfully retrieved user' },
                404: { description: 'User not found' },
            },
        },
    })

if (process.env.NODE_ENV === 'development') {
    userRoutes
        // POST /users
        .post('/', ({ body }) => userController.createUser({ body }), {
            body: t.Object({
                username: t.String(), // ตรวจสอบว่า username เป็น string
                email: t.String(), // ตรวจสอบว่า email เป็น string
                password: t.String(), // ตรวจสอบว่า password เป็น string
            }),
            detail: {
                summary: 'Create a new user',
                tags: ['User'], // ระบุหมวดหมู่
                responses: {
                    201: { description: 'Successfully created user' },
                    400: { description: 'Invalid input' },
                },
            },
        })
        // PUT /users/:userId
        .put('/:userId', ({ params, body }) => userController.updateUser({ params, body }), {
            params: t.Object({
                userId: t.String(), // ตรวจสอบว่า userId เป็น string
            }),
            body: t.Object({
                username: t.Optional(t.String()), // username เป็น optional string
                email: t.Optional(t.String()), // email เป็น optional string
                password: t.Optional(t.String()), // password เป็น optional string
            }),
            detail: {
                summary: 'Update user by user ID',
                tags: ['User'], // ระบุหมวดหมู่
                responses: {
                    200: { description: 'Successfully updated user' },
                    400: { description: 'Invalid input' },
                    404: { description: 'User not found' },
                },
            },
        })
        // DELETE /users/:userId
        .delete('/:userId', ({ params }) => userController.deleteUser({ params }), {
            params: t.Object({
                userId: t.String(), // ตรวจสอบว่า userId เป็น string
            }),
            detail: {
                summary: 'Delete user by user ID',
                tags: ['User'], // ระบุหมวดหมู่
                responses: {
                    200: { description: 'Successfully deleted user' },
                    404: { description: 'User not found' },
                },
            },
        });
}

