import { experienceController } from "@/controllers/experienceController";
import { Elysia, t } from 'elysia';

export const experienceRoutes = new Elysia({ prefix: '/experiences' })
    // GET /experiences
    .get('/', () => experienceController.getExperiences(), {
        detail: {
            summary: 'Get all experiences',
            tags: ['Experience'], // ระบุหมวดหมู่
            responses: {
                200: { description: 'Successfully retrieved experiences' },
            },
        },
    })

if (process.env.NODE_ENV === 'development') {
    experienceRoutes
        // POST /experiences
        .post('/', ({ body }) => experienceController.createExperience({ body }), {
            body: t.Object({
                company: t.String(), // ตรวจสอบว่า title เป็น string
                position: t.String(), // ตรวจสอบว่า content เป็น string
                description: t.String(), // ตรวจสอบว่า startDate เป็น string
                start_date: t.String(), // ตรวจสอบว่า endDate เป็น string
                end_date: t.String(), // ตรวจสอบว่า endDate เป็น string
            }),
            detail: {
                summary: 'Create a new experience',
                tags: ['Experience'], // ระบุหมวดหมู่
                responses: {
                    201: { description: 'Successfully created experience' },
                    400: { description: 'Invalid input' },
                },
            },
        })
        // PUT /experiences/:experienceId
        .patch('/:experienceId', ({ params, body }) => experienceController.updateExperience({ params, body }), {
            params: t.Object({
                experienceId: t.String(), // ตรวจสอบว่า experienceId เป็น string
            }),
            body: t.Object({
                company: t.Optional(t.String()), // ตรวจสอบว่า title เป็น string
                position: t.Optional(t.String()), // ตรวจสอบว่า content เป็น string
                description: t.Optional(t.String()), // ตรวจสอบว่า startDate เป็น string
                start_date: t.Optional(t.String()), // ตรวจสอบว่า startDate เป็น string
                end_date: t.Optional(t.String()), // ตรวจสอบว่า endDate เป็น string
            }),
            detail: {
                summary: 'Update experience by experience ID',
                tags: ['Experience'], // ระบุหมวดหมู่
                responses: {
                    200: { description: 'Successfully updated experience' },
                    400: { description: 'Invalid input' },
                    404: { description: 'Experience not found' },
                },
            },
        })
}