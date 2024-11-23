
import User from "../models/user.model.js";
import { Utils } from "../utility/utils.js";
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
 ;
export class AuthController{

    
    static signup=async(req,res)=>{
        console.log("body fron signup   :",req.body)
       
      try{
        const user=await User.findOne({username:req.body.username});
        if(user)return res.status(400).json({status:false,message:"User aleardy exist"});
        const hashPassword=await Utils.hashPassword(req.body.password);
        const newUser=await User.create({...req.body,password:hashPassword});
        return res.json({status:true,user:newUser});
     
    }  catch(err){
        return res.status(500).json({status:false,message:err.message});
    }
    }

    static signin=async(req,res)=>{
        console.log("from sign in :",req.body)
        try{
           const user=await User.findOne({username:req.body.username});
           console.log("user from db  :",user)
           if(!user) return res.status(400).json({status:false,message:"Invalid Credentials"});
           const result=await Utils.validatePassword(req.body.password,user.password);
           if(!result)return res.status(400).json({status:false,message:"Invalid Credentials"});
           const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET_KEY, 
            { expiresIn: "1d" } // token expiration time
        );
        res.setHeader('Set-Cookie', cookie.serialize('auth_token', token, {
            httpOnly: true, // Ensures the cookie can't be accessed via JavaScript
            // secure: process.env.NODE_ENV === 'production', // Only set cookie over HTTPS in production
            maxAge: 24 * 60 * 60, // Cookie expires in 1 day
            path: '/', // Cookie is available for the entire domain
            sameSite: 'strict', // Prevents the browser from sending this cookie along with cross-site requests
        }));

        res.status(200).json({ status: true, message: "Signin successful" });


        }catch(err){
            return res.status(500).json({status:false,message:err.message});
        }
    }
}

export const signOut = (req, res) => {
    res.setHeader('Set-Cookie', cookie.serialize('auth_token', '', {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        maxAge: 0, // Set maxAge to 0 to delete the cookie
        path: '/',
    }));

    res.status(200).json({ status: true, message: "Logout successful" });
};
