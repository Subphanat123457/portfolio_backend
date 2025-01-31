import { PrismaClient } from "@prisma/client";
import { log } from "../utils/logger";
import jwt from 'jsonwebtoken'; // ใช้ jsonwebtoken แทน
import { comparePassword } from "../utils/encryption";


const prisma = new PrismaClient();

// Secret key สำหรับการเซ็นต์ JWT
const SECRET_KEY = process.env.SECRET_KEY as string; // ควรใช้ค่า secret ที่มีความปลอดภัยมากกว่านี้

export const authService = () => ({
    login: async (username: string, password: string): Promise<string> => {
        try {
            log('Logging in user', { username });

            const user = await prisma.user.findFirst({
                where: { username },
            });

            if (!user) {
                log('User not found', { username });
                throw new Error('User not found');
            }

            // ตรวจสอบรหัสผ่าน
            const isPasswordValid = await comparePassword(password, user.password);

            if (!isPasswordValid) {
                log('Invalid password', { username });
                throw new Error('Invalid password');
            }

            log('Successfully logged in user', { id: user.id });

            // สร้าง JWT token โดยใช้ jsonwebtoken
            const token = jwt.sign({ id: user.id, role: user.role, user: user.username }, SECRET_KEY, { expiresIn: '1d' });
            
            return token;
        } catch (error) {
            log('Error logging in user', { error });
            throw new Error('Unable to login user');
        }
    },
});
