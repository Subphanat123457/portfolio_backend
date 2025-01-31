import { authController } from "@/controllers/authController";
import { Elysia, t } from 'elysia';

export const authRoutes = new Elysia({ prefix: '/auth' })

if (process.env.NODE_ENV === 'development') {
    authRoutes
        // POST /auth/login
        .post('/login', async ({ body, cookie }) => {
            try {
                const token = await authController.login({ body }); // เรียกใช้ login จาก authController

                // ตั้งค่าคุกกี้สำหรับ JWT token
                cookie.token.set({
                    value: token,
                    httpOnly: false, // เพื่อป้องกันการเข้าถึงจากฝั่ง client
                    sameSite: 'strict', // เพื่อป้องกัน cross-site request
                    maxAge: 60 * 60 * 24 * 7, // อายุคุกกี้ 1 สัปดาห์ (ในหน่วยวินาที)
                });

                return { message: 'Login successful' }; // ส่ง token กลับ
            } catch (error: any) {
                return { error: error.message }; // ส่งข้อความผิดพลาดกลับ
            }
        }, {
            body: t.Object({
                username: t.String(), // ตรวจสอบว่า username เป็น string
                password: t.String(), // ตรวจสอบว่า password เป็น string
            }),
            detail: {
                summary: 'Login',
                tags: ['Auth'], // หมวดหมู่
                responses: {
                    200: { description: 'Successfully logged in' },
                    400: { description: 'Invalid input' },
                    401: { description: 'Unauthorized' },
                },
            },
        });
}
