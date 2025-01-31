import { certificateController } from "@/controllers/certificateController";
import { Elysia, t } from 'elysia';

export const certificateRoutes = new Elysia({ prefix: '/certificates' })
    // GET /certificates
    .get('/', () => certificateController.getCertificates(), {
        detail: {
            summary: 'Get all certificates',
            tags: ['Certificate'], // ระบุหมวดหมู่
            responses: {
                200: { description: 'Successfully retrieved certificates' },
            },
        },
    })

// id         String   @id @default(cuid()) // เปลี่ยนเป็น cuid
// title      String
// image      String
// issued_by  String
// date       DateTime
// created_at DateTime @default(now())
// updated_at DateTime @updatedAt

if (process.env.NODE_ENV === 'development') {
    certificateRoutes

        // POST /certificates
        .post('/', ({ body }) => certificateController.createCertificate({ body }), {
            body: t.Object({
                title: t.String(), // ตรวจสอบว่า title เป็น string
                image: t.String(), // ตรวจสอบว่า image เป็น string
                issued_by: t.String(), // ตรวจสอบว่า issued_by เป็น string
                date: t.String(), // ตรวจสอบว่า date เป็น string
            }),
            detail: {
                summary: 'Create a new certificate',
                tags: ['Certificate'], // ระบุหมวดหมู่
                responses: {
                    201: { description: 'Successfully created certificate' },
                    400: { description: 'Invalid input' },
                },
            },
        })
        // patch /certificates/:certificateId
        .patch('/:certificateId', ({ params, body }) => certificateController.updateCertificate({ params, body }), {
            params: t.Object({
                certificateId: t.String(), // ตรวจสอบว่า certificateId เป็น string
            }),
            body: t.Object({
                title: t.Optional(t.String()), // title เป็น optional string
                image: t.Optional(t.String()), // image เป็น optional string
                issued_by: t.Optional(t.String()), // issued_by เป็น optional string
                date: t.Optional(t.String()), // date เป็น optional string
            }),
            detail: {
                summary: 'Update certificate by certificate ID',
                tags: ['Certificate'], // ระบุหมวดหมู่
                responses: {
                    200: { description: 'Successfully updated certificate' },
                    400: { description: 'Invalid input' },
                    404: { description: 'Certificate not found' },
                },
            },
        });
}