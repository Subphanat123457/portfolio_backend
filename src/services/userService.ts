import { encryptPassword, comparePassword } from "../utils/encryption";
import { PrismaClient, User as PrismaUser } from "@prisma/client";
import { log } from "../utils/logger";

const prisma = new PrismaClient();

export const userService = {
    getUsers: async (): Promise<PrismaUser[]> => {
        try {
            log('Fetching all users');
            const users = await prisma.user.findMany({
                take: 1
            });
            log('Successfully fetched users', { count: users.length });
            return users;
        } catch (error) {
            log('Error fetching users', { error });
            throw new Error('Unable to fetch users');
        }
    },

    getUser: async (id: string): Promise<PrismaUser | null> => {
        try {
            log(`Fetching user with id ${id}`);
            const user = await prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                log('User not found', { id });
                throw new Error('User not found');
            }
            log('Successfully fetched user', { id });
            return user;
        } catch (error) {
            log(`Error fetching user with id ${id}`, { error });
            throw new Error('Unable to fetch user');
        }
    },

    createUser: async (user: PrismaUser): Promise<PrismaUser> => {
        try {
            log('Creating new user', { username: user.username, email: user.email });

            const existingUsername = await prisma.user.findUnique({
                where: { username: user.username },
            });
            const existingEmail = await prisma.user.findUnique({
                where: { email: user.email },
            });

            if (existingUsername) {
                log('Username already exists', { username: user.username });
                throw new Error('Username already exists');
            }

            if (existingEmail) {
                log('Email already exists', { email: user.email });
                throw new Error('Email already exists');
            }

            const encryptedPassword = await encryptPassword(user.password);
            const newUser = await prisma.user.create({
                data: {
                    ...user,
                    password: encryptedPassword,
                },
            });

            log('Successfully created user', { id: newUser.id });
            return newUser;
        } catch (error) {
            log('Error creating user', { error });
            throw new Error('Unable to create user');
        }
    },

    updateUser: async (id: string, user: PrismaUser): Promise<PrismaUser | null> => {
        try {
            log(`Updating user with id ${id}`);
            const existingUser = await prisma.user.findUnique({
                where: { id },
            });
            if (!existingUser) {
                log('User not found', { id });
                throw new Error('User not found');
            }

            const updatedData: PrismaUser = {
                ...existingUser,
                ...user,
                password: user.password ? await encryptPassword(user.password) : existingUser.password,
            };

            const updatedUser = await prisma.user.update({
                where: { id },
                data: updatedData,
            });

            log('Successfully updated user', { id });
            return updatedUser;
        } catch (error) {
            log(`Error updating user with id ${id}`, { error });
            throw new Error('Unable to update user');
        }
    },

    deleteUser: async (id: string): Promise<PrismaUser | null> => {
        try {
            log(`Deleting user with id ${id}`);
            const deletedUser = await prisma.user.delete({
                where: { id },
            });
            log('Successfully deleted user', { id });
            return deletedUser;
        } catch (error) {
            log(`Error deleting user with id ${id}`, { error });
            throw new Error('Unable to delete user');
        }
    },

    verifyPassword: async (id: string, password: string): Promise<boolean> => {
        try {
            log(`Verifying password for user with id ${id}`);
            const user = await prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                log('User not found', { id });
                throw new Error('User not found');
            }
            const isPasswordValid = await comparePassword(password, user.password);
            log('Password verification result', { id, isPasswordValid });
            return isPasswordValid;
        } catch (error) {
            log(`Error verifying password for user with id ${id}`, { error });
            throw new Error('Unable to verify password');
        }
    },
};