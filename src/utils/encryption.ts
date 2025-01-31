import bcrypt from 'bcrypt';

const saltRounds = parseInt(process.env.ROUND as string, 10); // จำนวนรอบการเข้ารหัส

// เข้ารหัสรหัสผ่าน
export const encryptPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, saltRounds);
};

// ตรวจสอบรหัสผ่าน
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};