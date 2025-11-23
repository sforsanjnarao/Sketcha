

import { JWT_SECRET } from "@repo/backend-common/config";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const middleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    //token and everything is get saved in req.headers automatically 
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      return res.status(401).json({ message: "Token missing" });

    const token = authHeader.split(" ")[1]; // Bearer token
    if (!token)
      return res.status(401).json({ message: "Invalid token format" });


    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    //request is like a backpack of incoming object like this
    // req = {
    //   headers: {...},
    //   body: {...},
    //   params: {...},
    //   query: {...},
    // }

    req.userId = decoded.userId;

    // and we adding this in the backpack
    // req = {
    //   headers: {...},
    //   body: {...},
    //   params: {...},
    //   query: {...},
    //   userId: "12345"   // 👈 ADDED BY MIDDLEWARE
    // }
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