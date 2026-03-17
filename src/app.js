import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', userRoutes);

app.get('/', (req, res) => {
    res.send("Welcome")
});

export default app;
