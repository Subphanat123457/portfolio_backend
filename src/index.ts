import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { profileRoutes } from './routes/profileRoutes';
import { userRoutes } from './routes/userRoutes';
import { aboutRoutes } from './routes/aboutRoutes';
import { skillRoutes } from './routes/skillRoutes';
import { experienceRoutes } from './routes/experienceRoutes';
import { educationRoutes } from './routes/educationRoutes';
import { certificateRoutes } from './routes/certificateRoutes';
import { projectRoutes } from './routes/projectRoutes';
import { authRoutes } from './routes/authRoutes';
import { logger } from './utils/logger';
import { helmet } from 'elysia-helmet';
// import { compression } from 'elysia-compression'

const app = new Elysia()
  .use(cors(
    // กำหนด origin ที่ยอมรับเฉพาะ localhost:3000
    {
      origin: 'http://localhost:8080',
      methods: ['GET'],
      credentials: true
      // allowedHeaders: ['Content-Type', 'Authorization'],
      // credentials: true
    }
  ))

if (process.env.NODE_ENV === 'production') {
  app
    .use(
      swagger({
        path: '/api/docs', // เส้นทาง Swagger UI
        documentation: {
          info: {
            title: 'Portfolio API',
            version: '1.0.0',
          },
          tags: [
            { name: 'Profile', description: 'Operations related to user profiles' },
            { name: 'User', description: 'Operations related to users' },
            { name: 'About', description: 'Operations related to about' },
            { name: 'Skill', description: 'Operations related to skills' },
            { name: 'Experience', description: 'Operations related to experiences' },
            { name: 'Education', description: 'Operations related to educations' },
            { name: 'Certificate', description: 'Operations related to certificates' },
            { name: 'Project', description: 'Operations related to projects' },
            { name: 'Auth', description: 'Operations related to authentication' },
          ],
        },
      })
    )
}
app
  .group('/api', (app) =>
    app.use(profileRoutes).use(userRoutes).use(aboutRoutes).use(skillRoutes).use(experienceRoutes).use(educationRoutes).use(certificateRoutes).use(projectRoutes).use(authRoutes)
  )
  .get('/', () => 'API is running!')
  .use(helmet())
  .listen(9000);

logger.info(`🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`);