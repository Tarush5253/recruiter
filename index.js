import dotenv from "dotenv";
dotenv.config({ path: './.env' });

import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';

// Connect to DB immediately when module loads
connectDB().catch((err) => {
  console.error("MongoDB connection failed:", err);
});

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

// Export Express app as Vercel handler
export default app;
