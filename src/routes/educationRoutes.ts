import { educationController } from "@/controllers/educationController";
import { Elysia, t } from 'elysia';

export const educationRoutes = new Elysia({ prefix: '/educations' })
    // GET /educations
    .get('/', () => educationController.getEducations(), {
        detail: {
            summary: 'Get all educations',
            tags: ['Education'], // ระบุหมวดหมู่
            responses: {
                200: { description: 'Successfully retrieved educations' },
            },
        },
    })
if (process.env.NODE_ENV === 'development') {
    educationRoutes
        // POST /educations
        .post('/', ({ body }) => educationController.createEducation({ body }), {
            body: t.Object({
                school: t.String(), // ตรวจสอบว่า title เป็น string
                degree: t.String(), // ตรวจสอบว่า content เป็น string
                field_of_study: t.String(), // ตรวจสอบว่า startDate เป็น string
                start_date: t.String(), // ตรวจสอบว่า endDate เป็น string
                end_date: t.String(), // ตรวจสอบว่า endDate เป็น string
            }),
            detail: {
                summary: 'Create a new education',
                tags: ['Education'], // ระบุหมวดหมู่
                responses: {
                    201: { description: 'Successfully created education' },
                    400: { description: 'Invalid input' },
                },
            },
        })
        // PUT /educations/:educationId
        .patch('/:educationId', ({ params, body }) => educationController.updateEducation({ params, body }), {
            params: t.Object({
                educationId: t.String(), // ตรวจสอบว่า educationId เป็น string
            }),
            body: t.Object({
                school: t.Optional(t.String()), // ตรวจสอบว่า title เป็น string
                degree: t.Optional(t.String()), // ตรวจสอบว่า content เป็น string
                field_of_study: t.Optional(t.String()), // ตรวจสอบว่า startDate เป็น string
                start_date: t.Optional(t.String()), // ตรวจสอบว่า startDate เป็น string
                end_date: t.Optional(t.String()), // ตรวจสอบว่า endDate เป็น string
            }),
            detail: {
                summary: 'Update education by education ID',
                tags: ['Education'], // ระบุหมวดหมู่
                responses: {
                    200: { description: 'Successfully updated education' },
                    400: { description: 'Invalid input' },
                    404: { description: 'Education not found' },
                },
            },
        })
}