import { PrismaClient, Certificate as PrismaCertificate} from "@prisma/client";
import { log } from "../utils/logger";

const prisma = new PrismaClient();

export const certificateService = {
    getCertificates: async (): Promise<PrismaCertificate[]> => {
        try {
            log('Fetching all certificates');
            const certificates = await prisma.certificate.findMany();
            log('Successfully fetched certificates', { count: certificates.length });
            return certificates;
        } catch (error) {
            log('Error fetching certificates', { error });
            throw new Error('Unable to fetch certificates');
        }
    },

    // id         String   @id @default(cuid()) // เปลี่ยนเป็น cuid
    // title      String
    // image      String
    // issued_by  String
    // date       DateTime
    // created_at DateTime @default(now())
    // updated_at DateTime @updatedAt

    createCertificate: async (certificate: PrismaCertificate): Promise<PrismaCertificate> => {
        try {
            log('Creating new certificate', { title: certificate.title });

            const existingCertificate = await prisma.certificate.findFirst({
                where: { title: certificate.title },
            });

            if (existingCertificate) {
                log('Certificate already exists', { title: certificate.title });
                throw new Error('Certificate already exists');
            }

            const newCertificate = await prisma.certificate.create({
                data: {
                    title: certificate.title,
                    image: certificate.image,
                    issued_by: certificate.issued_by,
                    date: certificate.date,
                },
            });

            log('Successfully created certificate', { id: newCertificate.id });
            return newCertificate;
        } catch (error) {
            log('Error creating certificate', { error });
            throw new Error('Unable to create certificate');
        }
    },

    updateCertificate: async (id: string, certificate: PrismaCertificate): Promise<PrismaCertificate> => {
        try {
            log(`Updating certificate with id ${id}`, { title: certificate.title });

            const existingCertificate = await prisma.certificate.findUnique({
                where: { id },
            });

            if (!existingCertificate) {
                log('Certificate not found', { id });
                throw new Error('Certificate not found');
            }

            const updatedCertificate = await prisma.certificate.update({
                where: { id },
                data: {
                    title: certificate.title,
                    image: certificate.image,
                    issued_by: certificate.issued_by,
                    date: certificate.date,
                },
            });

            log('Successfully updated certificate', { id });
            return updatedCertificate;
        } catch (error) {
            log('Error updating certificate', { error });
            throw new Error('Unable to update certificate');
        }
    }
};