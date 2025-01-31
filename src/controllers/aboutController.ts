import { aboutService } from "@/services/aboutService";

export const aboutController = {
  getAbouts: () => {
    return aboutService.getAbouts();
  },
  
  createAbout: ({ body }: { body: any }) => {
    return aboutService.createAbout(body);
  },

    updateAbout: ({ params, body }: { params: { aboutId: string }, body: any }) => {
        return aboutService.updateAbout(params.aboutId, body);
    },
};