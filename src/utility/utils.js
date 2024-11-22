import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
const JWT_SECRET_KEY="jfdslfjlsdfklsdf"
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

    static async generateToken(payload){
      const token=await jwt.sign(payload,JWT_SECRET_KEY);
      return token;
    }

    static async verifyToken(payload){
        try {
            const verifiedToken = await jwt.verify(payload, JWT_SECRET_KEY);
            return { valid: true, data: verifiedToken }; // Return decoded token data if valid
        } catch (error) {
            return { valid: false, error: error.message }; // Return error details if invalid
        }
    }
}