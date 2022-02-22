import express from 'express';
import cors from 'cors';
import db from './db/db.js';
import dotenv from 'dotenv';
import roleRoutes from './routes/roleRoute.js';
import userRoutes from './routes/userRoute.js';
import taskRoutes from './routes/taskRoute.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/role/', roleRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/task/', taskRoutes);

app.listen(process.env.PORT, () => {
  console.log(`App running on port: ${process.env.PORT}`);
});

db.dbConnection();
