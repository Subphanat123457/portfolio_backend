import { Elysia, t } from 'elysia';
import { profileController } from '../controllers/profileController';

export const profileRoutes = new Elysia({ prefix: '/profile' })
  // GET /profile
  .get('/', () => profileController.getProfiles(), {
    detail: {
      summary: 'Get all profiles',
      tags: ['Profile'], // ระบุหมวดหมู่
      responses: {
        200: { description: 'Successfully retrieved profiles' },
      },
    },
  })

  // GET /profile/:userId
  .get('/:profileId', ({ params }) => profileController.getProfile({ params }), {
    params: t.Object({
      profileId: t.String(), // เปลี่ยนเป็น String เนื่องจาก cuid เป็น string
    }),
    detail: {
      summary: 'Get profile by user ID',
      tags: ['Profile'], // ระบุหมวดหมู่
      responses: {
        200: { description: 'Successfully retrieved profile' },
        404: { description: 'Profile not found' },
      },
    },
  })

if (process.env.NODE_ENV === 'development') {
  profileRoutes
    // POST /profile
    .post('/', ({ body }) => profileController.createProfile({ body }), {
      body: t.Object({
        id: t.Optional(t.String()), // เปลี่ยนเป็น String เนื่องจาก cuid เป็น string
        bio: t.Optional(t.String()), // bio เป็น optional string
        image: t.Optional(t.String()), // image เป็น optional string
        first_name: t.Optional(t.String()), // first_name เป็น optional string
        last_name: t.Optional(t.String()), // last_name เป็น optional string
      }),
      detail: {
        summary: 'Create a new profile',
        tags: ['Profile'], // ระบุหมวดหมู่
        responses: {
          201: { description: 'Successfully created profile' },
          400: { description: 'Invalid input' },
        },
      },
    })
    // PUT /profile/:userId
    .put('/:profileId', ({ params, body }) => profileController.updateProfile({ params, body }), {
      params: t.Object({
        profileId: t.String(), // เปลี่ยนเป็น String เนื่องจาก cuid เป็น string
      }),
      body: t.Object({
        bio: t.Optional(t.String()), // bio เป็น optional string
        image: t.Optional(t.String()), // image เป็น optional string
        first_name: t.Optional(t.String()), // first_name เป็น optional string
        last_name: t.Optional(t.String()), // last_name เป็น optional string
      }),
      detail: {
        summary: 'Update profile by user ID',
        tags: ['Profile'], // ระบุหมวดหมู่
        responses: {
          200: { description: 'Successfully updated profile' },
          400: { description: 'Invalid input' },
          404: { description: 'Profile not found' },
        },
      },
    });
}
