import { experienceService } from "@/services/experienceService";

export const experienceController = {
    getExperiences: () => {
        return experienceService.getExperiences();
    },

    createExperience: ({ body }: { body: any }) => {
        return experienceService.createExperience(body);
    },

    updateExperience: ({ params, body }: { params: { experienceId: string }, body: any }) => {
        return experienceService.updateExperience(params.experienceId, body);
    },

    deleteExperience: ({ params }: { params: { experienceId: string } }) => {
        return experienceService.deleteExperience(params.experienceId);
    },
};