
import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js';

export const jwtVerify = async(req,res,next)=>{
   try {
     const token = req.cookies?.token || req.headers['Authorization'].split(' ')[1];
     console.log("jwt token ", token);
     if(
         !token
     ){
         throw new ApiError(
             404,
             "token not found"
         )
     }
 
     const isTokenExist = jwt.verify(
         token, process.env.JWT_TOKEN_SECRET
     )
 
     if(
         !isTokenExist 
     ){
         throw new ApiError(
             402,
             " no info found "
         )
     }
 
     req.user = isTokenExist._id;
 
     next();
   } catch (error) {
    console.log("jwt verify error ", error.message);
   }
}