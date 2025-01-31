import { projectController } from "@/controllers/projectController";
import { Elysia, t } from 'elysia';

export const projectRoutes = new Elysia({ prefix: '/projects' })
    // GET /projects
    .get('/', () => projectController.getProjects(), {
        detail: {
            summary: 'Get all projects',
            tags: ['Project'], // ระบุหมวดหมู่
            responses: {
                200: { description: 'Successfully retrieved projects' },
            },
        },
    })

if (process.env.NODE_ENV === 'development') {
    projectRoutes
        // POST /projects
        .post('/', ({ body }) => projectController.createProject({ body }), {
            body: t.Object({
                title: t.String(), // ตรวจสอบว่า title เป็น string
                description: t.String(), // ตรวจสอบว่า description เป็น string
                image: t.String(), // ตรวจสอบว่า image เป็น string
                tags: t.Array(t.String()), // ตรวจสอบว่า tags เป็น array ของ string
                code_url: t.String(), // ตรวจสอบว่า code_url เป็น string
                demo_url: t.String(), // ตรวจสอบว่า demo_url เป็น string
            }),
            detail: {
                summary: 'Create a new project',
                tags: ['Project'], // ระบุหมวดหมู่
                responses: {
                    201: { description: 'Successfully created project' },
                    400: { description: 'Invalid input' },
                },
            },
        })
        // patch /projects/:projectId
        .patch('/:projectId', ({ params, body }) => projectController.updateProject({ params, body }), {
            params: t.Object({
                projectId: t.String(), // ตรวจสอบว่า projectId เป็น string
            }),
            body: t.Object({
                title: t.Optional(t.String()), // title เป็น optional string
                description: t.Optional(t.String()), // description เป็น optional string
                image: t.Optional(t.String()), // image เป็น optional string
                tags: t.Optional(t.Array(t.String())), // tags เป็น optional string
                code_url: t.Optional(t.String()), // code_url เป็น optional string
                demo_url: t.Optional(t.String()), // demo_url เป็น optional string
            }),
            detail: {
                summary: 'Update project by project ID',
                tags: ['Project'], // ระบุหมวดหมู่
                responses: {
                    200: { description: 'Successfully updated project' },
                    400: { description: 'Invalid input' },
                    404: { description: 'Project not found' },
                },
            },
        })
}