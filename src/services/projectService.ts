import { PrismaClient, Projects as PrismaProjects } from "@prisma/client";
import { log } from "../utils/logger";

const prisma = new PrismaClient();

export const projectService = {
    getProjects: async (): Promise<PrismaProjects[]> => {
        try {
            log('Fetching all projects');
            const projects = await prisma.projects.findMany();
            log('Successfully fetched projects', { count: projects.length });
            return projects;
        } catch (error) {
            log('Error fetching projects', { error });
            throw new Error('Unable to fetch projects');
        }
    },

    // model Projects {
    //     id          String   @id @default(cuid()) // เปลี่ยนเป็น cuid
    //     title       String
    //     description String
    //     tags        String[]
    //     image   String
    //     code_url String
    //     demo_url String
    //     created_at  DateTime @default(now())
    //     updated_at  DateTime @updatedAt
    // }

    createProject: async (projects: PrismaProjects): Promise<PrismaProjects> => {
        try {
            log('Creating new project', { title: projects.title });

            const existingProjects = await prisma.projects.findFirst({
                where: { title: projects.title },
            });

            if (existingProjects) {
                log('Projects already exists', { title: projects.title });
                throw new Error('Projects already exists');
            }

            const newProjects = await prisma.projects.create({
                data: {
                    title: projects.title,
                    description: projects.description,
                    image: projects.image,
                    tags: projects.tags,
                    code_url: projects.code_url,
                    demo_url: projects.demo_url,
                },
            });

            log('Successfully created projects', { id: newProjects.id });
            return newProjects;
        } catch (error) {
            log('Error creating projects', { error });
            throw new Error('Unable to create projects');
        }
    },

    updateProjects: async (id: string, projects: PrismaProjects): Promise<PrismaProjects> => {
        try {
            log(`Updating projects with id ${id}`, { title: projects.title });

            const existingProjects = await prisma.projects.findUnique({
                where: { id },
            });

            if (!existingProjects) {
                log('Projects not found', { id });
                throw new Error('Projects not found');
            }

            const updatedProjects = await prisma.projects.update({
                where: { id },
                data: {
                    title: projects.title,
                    description: projects.description,
                    image: projects.image,
                    tags: projects.tags,
                    code_url: projects.code_url,
                    demo_url: projects.demo_url,
                },
            });

            log('Successfully updated projects', { id: updatedProjects.id });
            return updatedProjects;
        } catch (error) {
            log('Error updating projects', { error });
            throw new Error('Unable to update projects');
        }
    },

    deleteProjects: async (id: string): Promise<PrismaProjects
    > => {
        try {
            log(`Deleting projects with id ${id}`);

            const existingProjects = await prisma.projects.findUnique({
                where: { id },
            });

            if (!existingProjects) {
                log('Projects not found', { id });
                throw new Error('Projects not found');
            }

            const deletedProjects = await prisma.projects.delete({
                where: { id },
            });

            log('Successfully deleted projects', { id: deletedProjects.id });
            return deletedProjects;
        } catch (error) {
            log('Error deleting projects', { error });
            throw new Error('Unable to delete projects');
        }
    }
};
