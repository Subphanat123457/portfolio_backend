import { PrismaClient, Education as PrismaEducation } from "@prisma/client";
import { log } from "../utils/logger";

const prisma = new PrismaClient();

export const educationService = {
    getEducations: async (): Promise<PrismaEducation[]> => {
        try {
            log('Fetching all educations');
            const educations = await prisma.education.findMany();
            log('Successfully fetched educations', { count: educations.length });
            return educations;
        } catch (error) {
            log('Error fetching educations', { error });
            throw new Error('Unable to fetch educations');
        }
    },

    createEducation: async (education: PrismaEducation): Promise<PrismaEducation> => {
        try {
            log('Creating new education', { school: education.school });

            const existingEducation = await prisma.education.findFirst({
                where: { school: education.school },
            });

            if (existingEducation) {
                log('Education already exists', { school: education.school });
                throw new Error('Education already exists');
            }

            const newEducation = await prisma.education.create({
                data: {
                    school: education.school,
                    degree: education.degree,
                    field_of_study: education.field_of_study,
                    start_date: education.start_date,
                    end_date: education.end_date,
                },
            });

            log('Successfully created education', { id: newEducation.id });
            return newEducation;
        } catch (error) {
            log('Error creating education', { error });
            throw new Error('Unable to create education');
        }
    },

    updateEducation: async (id: string, education: PrismaEducation): Promise<PrismaEducation> => {
        try {
            log(`Updating education with id ${id}`, { school: education.school });

            const existingEducation = await prisma.education.findUnique({
                where: { id },
            });

            if (!existingEducation) {
                log('Education not found', { id });
                throw new Error('Education not found');
            }

            const updatedEducation = await prisma.education.update({
                where: { id },
                data: {
                    school: education.school,
                    degree: education.degree,
                    field_of_study: education.field_of_study,
                    start_date: education.start_date,
                    end_date: education.end_date,
                },
            });

            log('Successfully updated education', { id: updatedEducation.id });
            return updatedEducation;
        } catch (error) {
            log('Error updating education', { error });
            throw new Error('Unable to update education');
        }
    }
};
