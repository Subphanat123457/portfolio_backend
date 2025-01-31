import { educationService } from "@/services/educationService";

export const educationController = {
    getEducations: () => {
        return educationService.getEducations();
    },

    createEducation: ({ body }: { body: any }) => {
        return educationService.createEducation(body);
    },

    updateEducation: ({ params, body }: { params: { educationId: string }, body: any }) => {
        return educationService.updateEducation(params.educationId, body);
    },
};