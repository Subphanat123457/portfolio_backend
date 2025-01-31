import { Elysia, t } from 'elysia';
import { aboutController } from '@/controllers/aboutController';

export const aboutRoutes = new Elysia({ prefix: '/abouts' })
    // GET /abouts
    .get('/', () => aboutController.getAbouts(), {
        detail: {
            summary: 'Get all abouts',
            tags: ['About'], // ระบุหมวดหมู่
            responses: {
                200: { description: 'Successfully retrieved abouts' },
            },
        },
    });

if (process.env.NODE_ENV === 'development') {
    aboutRoutes
        // POST /abouts
        .post('/', ({ body }) => aboutController.createAbout({ body }), {
            body: t.Object({
                content: t.String(), // ตรวจสอบว่า content เป็น string
            }),
            detail: {
                summary: 'Create a new about',
                tags: ['About'], // ระบุหมวดหมู่
                responses: {
                    201: { description: 'Successfully created about' },
                    400: { description: 'Invalid input' },
                },
            },
        })

        // PATCH /abouts/:aboutId
        .patch('/:aboutId', ({ params, body }) => aboutController.updateAbout({ params, body }), {
            params: t.Object({
                aboutId: t.String(), // ตรวจสอบว่า aboutId เป็น string
            }),
            body: t.Object({
                content: t.Optional(t.String()), // content เป็น optional string
            }),
            detail: {
                summary: 'Update about by about ID',
                tags: ['About'], // ระบุหมวดหมู่
                responses: {
                    200: { description: 'Successfully updated about' },
                    400: { description: 'Invalid input' },
                    404: { description: 'About not found' },
                },
            },
        });

    console.log('Development mode: About routes are set up');
}
