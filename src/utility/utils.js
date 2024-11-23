import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';

export class Utils{
  static  async  hashPassword(rawPassword){
    const salt= await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(rawPassword,salt);
   
      // console.log(hash)
      return hash;
    }
   static  async validatePassword(rawPassword,hashedPassword){
     const result=  await bcrypt.compare(rawPassword, hashedPassword);
     return result;
    }



    
}