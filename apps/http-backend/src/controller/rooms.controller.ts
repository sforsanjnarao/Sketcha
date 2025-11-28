import { createRoom } from "@repo/common/zodTypes";
import { prismaClient } from "@repo/db/prismaClient";
import { Request, Response } from "express";


interface roomData{
  id:number
  slug:string,
  adminId:string
}
export const rooms=async (req:Request, res:Response)=>{
  const parsed= createRoom.safeParse(req.body)
  if(!parsed.success){
    return res.status(400).json({message:"Validation failed" })
  }

  const {slug}=parsed.data
  console.log("slug:", slug)
  try{
    const room:roomData= await prismaClient.room.create({
      data:{
        slug:slug,
        adminId:req.userId as string
        
      }
    })
    res.status(200).json({message:"room created",slug:room.slug ,roomId: room.id})
  }catch(err){
    res.status(400).json({"Error":err, message:"room creation failed"})
  }
  
}