import { Elysia, t } from 'elysia';
import { skillController } from '@/controllers/skillController';

export const skillRoutes = new Elysia({ prefix: '/skills' })
    // GET /skills
    .get('/', () => skillController.getSkills(), {
        detail: {
            summary: 'Get all skills',
            tags: ['Skill'], // ระบุหมวดหมู่
            responses: {
                200: { description: 'Successfully retrieved skills' },
            },
        },
    })

if (process.env.NODE_ENV === 'development') {
    skillRoutes
        // POST /skills
        .post('/', ({ body }) => skillController.createSkill({ body }), {
            body: t.Object({
                name: t.String(), // ตรวจสอบว่า name เป็น string
            }),
            detail: {
                summary: 'Create a new skill',
                tags: ['Skill'], // ระบุหมวดหมู่
                responses: {
                    201: { description: 'Successfully created skill' },
                    400: { description: 'Invalid input' },
                },
            },
        })
        // patch /skills/:skillId
        .patch('/:skillId', ({ params, body }) => skillController.updateSkill({ params, body }), {
            params: t.Object({
                skillId: t.String(), // ตรวจสอบว่า skillId เป็น string
            }),
            body: t.Object({
                name: t.Optional(t.String()), // name เป็น optional string
            }),
            detail: {
                summary: 'Update skill by skill ID',
                tags: ['Skill'], // ระบุหมวดหมู่
                responses: {
                    200: { description: 'Successfully updated skill' },
                    400: { description: 'Invalid input' },
                    404: { description: 'Skill not found' },
                },
            },
        })
        // DELETE /skills/:skillId
        .delete('/:skillId', ({ params }) => skillController.deleteSkill({ params }), {
            params: t.Object({
                skillId: t.String(), // ตรวจสอบว่า skillId เป็น string
            }),
            detail: {
                summary: 'Delete skill by skill ID',
                tags: ['Skill'], // ระบุหมวดหมู่
                responses: {
                    200: { description: 'Successfully deleted skill' },
                    404: { description: 'Skill not found' },
                },
            },
        });
}