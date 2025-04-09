// api/index.js
import dotenv from "dotenv";
dotenv.config({ path: './.env' });

import express from 'express';
import connectDB from '../config/db.js'; // adjust path
import authRoutes from '../routes/auth.js'; // adjust path
import cors from 'cors';
import serverless from '@vendia/serverless-express';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send("server is running");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: err.message || "Something went wrong!" });
});

// connect to DB before exporting handler
await connectDB();

export const handler = serverless({ app });
