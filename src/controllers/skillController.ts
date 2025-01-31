import { skillService } from "@/services/skillService";

export const skillController = {
    getSkills: () => {
        return skillService.getSkills();
    },

    createSkill: ({ body }: { body: any }) => {
        return skillService.createSkill(body);
    },

    updateSkill: ({ params, body }: { params: { skillId: string }, body: any }) => {
        return skillService.updateSkill(params.skillId, body);
    },

    deleteSkill: ({ params }: { params: { skillId: string } }) => {
        return skillService.deleteSkill(params.skillId);
    },
};