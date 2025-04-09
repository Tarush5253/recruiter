// api/index.js
import dotenv from "dotenv";
dotenv.config({ path: './.env' });

import express from 'express';
import connectDB from './config/db.js'; // adjust path
import authRoutes from './routes/auth.js'; // adjust path
import cors from 'cors';
import serverless from '@vendia/serverless-express';

const app = express();

app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {

    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send("server is running");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: err.message || "Something went wrong!" });
});


const port = process.env.PORT || 8080;
connectDB()
.then(()=>{
    app.listen(port , ()=>{
        console.log(`server is listening at port ${port}`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!! ", err);
})