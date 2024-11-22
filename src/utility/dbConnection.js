import mongoose from "mongoose"



export const connectToDb=()=>{
  // console.log("database url",process.env.DATABASE_URL)
  mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("Connected to Db")
  }).catch((err)=>{
    console.log(err)
    console.log("Disconnected to Db",err);
  })

}