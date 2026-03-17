import express from 'express';
import { corsMiddleware } from './middlewares/corsMiddleware.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(corsMiddleware);

app.use('/', userRoutes);

export default app;
