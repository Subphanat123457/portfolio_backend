import { PrismaClient, Profile as PrismaProfile } from "@prisma/client";
import { log } from "../utils/logger";

const prisma = new PrismaClient();

export const profileService = {
    getProfiles: async (): Promise<PrismaProfile[]> => {
        try {
            log('Fetching all profiles');
            const profiles = await prisma.profile.findMany();
            log('Successfully fetched profiles', { count: profiles.length });
            return profiles;
        } catch (error) {
            log('Error fetching profiles', { error });
            throw new Error('Unable to fetch profiles');
        }
    },

    getProfile: async (id: string): Promise<PrismaProfile | null> => {
        try {
            log(`Fetching profile with id ${id}`);
            const profile = await prisma.profile.findUnique({
                where: { id },
            });
            if (!profile) {
                log('Profile not found', { id });
                throw new Error('Profile not found');
            }
            log('Successfully fetched profile', { id });
            return profile;
        } catch (error) {
            log(`Error fetching profile with id ${id}`, { error });
            throw new Error('Unable to fetch profile');
        }
    },

    createProfile: async (profile: PrismaProfile): Promise<PrismaProfile> => {
        try {
            log('Creating new profile', { first_name: profile.first_name, last_name: profile.last_name });

            const existingProfile = await prisma.profile.findFirst({
                where: { first_name: profile.first_name, last_name: profile.last_name },
            });

            if (existingProfile) {
                log('Profile already exists', { first_name: profile.first_name, last_name: profile.last_name });
                throw new Error('Profile already exists');
            }

            const newProfile = await prisma.profile.create({
                data: {
                    bio: profile.bio,
                    image: profile.image,
                    first_name: profile.first_name,
                    last_name: profile.last_name,
                },
            });

            log('Successfully created profile', { id: newProfile.id });
            return newProfile;
        } catch (error) {
            log('Error creating profile', { error });
            throw new Error('Unable to create profile');
        }
    },

    updateProfile: async (id: string, profile: PrismaProfile): Promise<PrismaProfile> => {
        try {
            log(`Updating profile with id ${id}`, { first_name: profile.first_name, last_name: profile.last_name });

            const existingProfile = await prisma.profile.findUnique({
                where: {
                    id,
                },
            });

            if (!existingProfile) {
                log('Profile not found', { id });
                throw new Error('Profile not found');
            }

            const updatedProfile = await prisma.profile.update({
                where: { id },
                data: {
                    bio: profile.bio,
                    image: profile.image,
                    first_name: profile.first_name,
                    last_name: profile.last_name,
                },
            });

            log('Successfully updated profile', { id });
            return updatedProfile;
        } catch (error) {
            log('Error updating profile', { error });
            throw new Error('Unable to update profile');
        }
    }
};