import express from 'express';
import cors, { CorsOptions } from 'cors';
import { buildRouter } from './router-factory';
import { errorHandler } from './middleware/error-handler';
import { FirestoreUserRepository } from '../infrastructure/repositories/firestore-user.repo';
import { FirestoreTaskRepository } from '../infrastructure/repositories/firestore-task.repo';

const allowOrigins = [
  'https://banckend-tasks.web.app',
  'https://banckend-tasks.firebaseapp.com',
  'http://localhost:4200'
];

export const app = express();

const corsOptions: CorsOptions = {
  origin: (origin, cb) => {
    if (!origin || allowOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

const userRepo = new FirestoreUserRepository();
const taskRepo = new FirestoreTaskRepository();
app.use('/api', buildRouter({ userRepo, taskRepo }));

app.use(errorHandler);
