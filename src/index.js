import express from "express"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import authRouter from "./routes/auth.js";
import crudRouter from "./routes/crud.js";

// console.log("Database URL:", process.env.DATABASE_URL);
import { connectToDb } from "./utility/dbConnection.js";

import cors from 'cors';


const port=3000;


const app=express();
app.use(cors());
app.use(express.json())
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);


app.use("/api/crud",crudRouter);



app.listen(port,()=>{
    connectToDb();
console.log(`Server is running on:  ${port}`);
})