import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import express from "express";
import connectDB from "../config/db.js";
import authRoutes from "../routes/auth.js";
import cors from "cors";
import serverless from "@vendia/serverless-express";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server is running from Vercel!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: err.message || "Something went wrong!" });
});

// Connect to DB only once and cache the handler
let serverlessHandler;

const handler = async (req, res) => {
  if (!serverlessHandler) {
    await connectDB(); // one-time DB connection
    serverlessHandler = serverless(app);
  }
  return serverlessHandler(req, res);
};

export default handler;
