import { PrismaClient, Experience as PrismaExperience } from "@prisma/client";
import { log } from "../utils/logger";

const prisma = new PrismaClient();

export const experienceService = {
    getExperiences: async (): Promise<PrismaExperience[]> => {
        try {
            log('Fetching all experiences');
            const experiences = await prisma.experience.findMany();
            log('Successfully fetched experiences', { count: experiences.length });
            return experiences;
        } catch (error) {
            log('Error fetching experiences', { error });
            throw new Error('Unable to fetch experiences');
        }
    },

    createExperience: async (experience: PrismaExperience): Promise<PrismaExperience> => {
        try {
            log('Creating new experience', { position: experience.position });

            const existingExperience = await prisma.experience.findFirst({
                where: { position: experience.position },
            });

            if (existingExperience) {
                log('Experience already exists', { position: experience.position });
                throw new Error('Experience already exists');
            }

            const newExperience = await prisma.experience.create({
                data: {
                    company: experience.company,
                    position: experience.position, // เปลี่ยนจาก title เป็น position
                    description: experience.description,
                    start_date: experience.start_date,
                    end_date: experience.end_date,
                },
            });

            log('Successfully created experience', { id: newExperience.id });
            return newExperience;
        } catch (error) {
            log('Error creating experience', { error });
            throw new Error('Unable to create experience');
        }
    },

    updateExperience: async (id: string, experience: PrismaExperience): Promise<PrismaExperience> => {
        try {
            log(`Updating experience with id ${id}`, { position: experience.position });

            const existingExperience = await prisma.experience.findUnique({
                where: { id },
            });

            if (!existingExperience) {
                log('Experience not found', { id });
                throw new Error('Experience not found');
            }

            const updatedExperience = await prisma.experience.update({
                where: { id },
                data: {
                    company: experience.company,
                    position: experience.position, // เปลี่ยนจาก title เป็น position
                    description: experience.description,
                    start_date: experience.start_date,
                    end_date: experience.end_date,
                },
            });

            log('Successfully updated experience', { id });
            return updatedExperience;
        } catch (error) {
            log('Error updating experience', { error });
            throw new Error('Unable to update experience');
        }
    },

    deleteExperience: async (id: string): Promise<PrismaExperience> => {
        try {
            log(`Deleting experience with id ${id}`);
            const existingExperience = await prisma.experience.findUnique({
                where: { id },
            });
            if (!existingExperience) {
                log('Experience not found', { id });
                throw new Error('Experience not found');
            }
            const deletedExperience = await prisma.experience.delete({
                where: { id },
            });
            log('Successfully deleted experience', { id });
            return deletedExperience;
        } catch (error) {
            log(`Error deleting experience with id ${id}`, { error });
            throw new Error('Unable to delete experience');
        }
    },
};
