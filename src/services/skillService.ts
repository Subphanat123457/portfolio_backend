import { PrismaClient, Skills as PrismaSkills } from "@prisma/client";
import { log } from "../utils/logger";

const prisma = new PrismaClient();

export const skillService = {
    getSkills: async (): Promise<PrismaSkills[]> => {
        try {
            log('Fetching all skills');
            const skills = await prisma.skills.findMany();
            log('Successfully fetched skills', { count: skills.length });
            return skills;
        } catch (error) {
            log('Error fetching skills', { error });
            throw new Error('Unable to fetch skills');
        }
    },

    getSkill: async (id: string): Promise<PrismaSkills | null> => {
        try {
            log(`Fetching skill with id ${id}`);
            const skill = await prisma.skills.findUnique({
                where: { id },
            });
            if (!skill) {
                log('Skill not found', { id });
                throw new Error('Skill not found');
            }
            log('Successfully fetched skill', { id });
            return skill;
        } catch (error) {
            log(`Error fetching skill with id ${id}`, { error });
            throw new Error('Unable to fetch skill');
        }
    },

    createSkill: async (skill: PrismaSkills): Promise<PrismaSkills> => {
        try {
            log('Creating new skill', { name: skill.name });

            const existingSkill = await prisma.skills.findFirst({
                where: { name: skill.name },
            });

            if (existingSkill) {
                log('Skill already exists', { name: skill.name });
                throw new Error('Skill already exists');
            }

            const newSkill = await prisma.skills.create({
                data: {
                    name: skill.name,
                },
            });

            log('Successfully created skill', { id: newSkill.id });
            return newSkill;
        } catch (error) {
            log('Error creating skill', { error });
            throw new Error('Unable to create skill');
        }
    },

    updateSkill: async (id: string, skill: PrismaSkills): Promise<PrismaSkills> => {
        try {
            log(`Updating skill with id ${id}`, { name: skill.name });

            const existingSkill = await prisma.skills.findUnique({
                where: { id },
            });

            if (!existingSkill) {
                log('Skill not found', { id });
                throw new Error('Skill not found');
            }

            const updatedSkill = await prisma.skills.update({
                where:
                {
                    id,
                },
                data: {
                    name: skill.name,
                },
            });

            log('Successfully updated skill', { id });
            return updatedSkill;
        } catch (error) {
            log(`Error updating skill with id ${id}`, { error });
            throw new Error('Unable to update skill');
        }
    },

    deleteSkill: async (id: string): Promise<PrismaSkills> => {
        try {
            log(`Deleting skill with id ${id}`);
            const existingSkill = await prisma.skills.findUnique({
                where: { id },
            });
            if (!existingSkill) {
                log('Skill not found', { id });
                throw new Error('Skill not found');
            }

            const deletedSkill = await prisma.skills.delete({
                where: { id },
            });

            log('Successfully deleted skill', { id });
            return deletedSkill;
        } catch (error) {
            log(`Error deleting skill with id ${id}`, { error });
            throw new Error('Unable to delete skill');
        }
    },
};
