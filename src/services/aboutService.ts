import { PrismaClient, About as PrismaAbout } from "@prisma/client";
import { log } from "../utils/logger";

const prisma = new PrismaClient();

export const aboutService = {
    getAbouts: async (): Promise<PrismaAbout[]> => {
        try {
            log('Fetching all abouts');
            const abouts = await prisma.about.findMany();
            log('Successfully fetched abouts', { count: abouts.length });
            return abouts;
        } catch (error) {
            log('Error fetching abouts', { error });
            throw new Error('Unable to fetch abouts');
        }
    },

    createAbout: async (about: PrismaAbout): Promise<PrismaAbout> => {
        try {
            log('Creating new about', { content: about.content });

            const existingAbout = await prisma.about.findFirst({
                where: { content: about.content },
            });

            if (existingAbout) {
                log('About already exists', { content: about.content });
                throw new Error('About already exists');
            }

            const newAbout = await prisma.about.create({
                data: {
                    content: about.content,
                },
            });

            log('Successfully created about', { id: newAbout.id });
            return newAbout;
        } catch (error) {
            log('Error creating about', { error });
            throw new Error('Unable to create about');
        }
    },

    updateAbout: async (id: string, about: PrismaAbout): Promise<PrismaAbout> => {
        try {
            log(`Updating about with id ${id}`, { content: about.content });

            const existingAbout = await prisma.about.findUnique({
                where: { id },
            });

            if (!existingAbout) {
                log('About not found', { id });
                throw new Error('About not found');
            }

            const updatedAbout = await prisma.about.update({
                where: { id },
                data: {
                    content: about.content,
                },
            });

            log('Successfully updated about', { id });
            return updatedAbout;
        } catch (error) {
            log(`Error updating about with id ${id}`, { error });
            throw new Error('Unable to update about');
        }
    },
};