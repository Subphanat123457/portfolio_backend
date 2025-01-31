import { Elysia } from 'elysia';
import { profileService } from '../services/profileService';

export const profileController = {
  getProfiles: () => {
    return profileService.getProfiles();
  },

  getProfile: ({ params }: { params: { profileId: string } }) => {
    return profileService.getProfile(params.profileId);
  },

  createProfile: ({ body }: { body: any }) => {
    return profileService.createProfile(body);
  },

  updateProfile: ({ params, body }: { params: { profileId: string }, body: any }) => {
    return profileService.updateProfile(params.profileId, body);
  },
};