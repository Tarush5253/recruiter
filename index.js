import dotenv from "dotenv";
dotenv.config({ path: './.env' });

import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';

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

connectDB()
.then(()=>{
    app.listen(port , ()=>{
        console.log(`server is listening at port ${port}`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!! ", err);
})