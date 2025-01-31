import { certificateService } from "@/services/certificateService";

export const certificateController = {
    getCertificates: () => {
        return certificateService.getCertificates();
    },

    createCertificate: ({ body }: { body: any }) => {
        return certificateService.createCertificate(body);
    },

    updateCertificate: ({ params, body }: { params: { certificateId: string }, body: any }) => {
        return certificateService.updateCertificate(params.certificateId, body);
    },
};