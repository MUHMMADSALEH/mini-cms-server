import express from "express"
import dotenv from "dotenv";
dotenv.config();
// import authRouter from "./routes/auth.js";
// import blogRouter from "./routes/blog.js";

// console.log("Database URL:", process.env.DATABASE_URL);
import { connectToDb } from "./utility/dbConnection.js";

import cors from 'cors';


const port=3000;


const app=express();
app.use(cors());
app.use(express.json())
// app.use("/api/auth",authRouter);
// app.use("/api/blog",blogRouter);
app.use("/",(re,res)=>{
    res.send("hello")
});


app.listen(port,()=>{
    connectToDb();
console.log(`Server is running on:  ${port}`);
})