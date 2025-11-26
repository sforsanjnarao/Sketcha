

import { JWT_SECRET } from "@repo/backend-common/config";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const middleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      return res.status(401).json({ message: "Token missing" });

    const token = authHeader.split(" ")[1]; 
    if (!token)
      return res.status(401).json({ message: "Invalid token format" });


    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
   

    req.userId = decoded.userId;

    
    next();
  } catch (err) {
    return res.status(403).json({ message: "Unauthorized" });
  }
};




// export const middleware=async (req:Request,res:Response,next:NextFunction)=>{

//   try{
//     const authHeader=req.headers['authorization']
//     if(!authHeader) return res.json({message:'token missing'})

//     const token =authHeader.split(" ")[1]
//     if(!token) return res.json({message:'token missing'})
//     const decoded=  jwt.verify(token, JWT_SECRET) as {userId: string}
//     req.userId=decoded.userId

//     next()
//   } catch(err){
//     return res.status(403).json({ message: "Unauthorized" });
//   }
// }