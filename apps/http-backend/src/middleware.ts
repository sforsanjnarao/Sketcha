import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const middleware=(req:Request, res:Response, next:NextFunction)=>{
        const token=req.headers['authorization']??""
        const decoded= jwt.verify(token,'sanjana')

        if(decoded){
            //to do: need to extend request with userid globally
            req.userId=decoded.userId
        }else{
            res.status(403).json({
                message:'unAuthorizaed'
            })
        }
        next()
}