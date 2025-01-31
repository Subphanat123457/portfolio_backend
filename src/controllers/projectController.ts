import { projectService } from "@/services/projectService";

export const projectController = {
    getProjects: () => {
        return projectService.getProjects();
    },

    createProject: ({ body }: { body: any }) => {
        return projectService.createProject(body);
    },

    updateProject: ({ params, body }: { params: { projectId: string }, body: any }) => {
        return projectService.updateProjects(params.projectId, body);
    },

    deleteProjects: ({ params }: { params: { projectId: string } }) => {
        return projectService.deleteProjects(params.projectId);
    },
};