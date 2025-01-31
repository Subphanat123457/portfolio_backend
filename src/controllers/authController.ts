// src/controllers/authController.ts
import { authService } from "@/services/authService";

export const authController = {
    login: ({ body }: { body: any }) => {
        const { username, password } = body;
        return authService().login(username, password);
    },
};