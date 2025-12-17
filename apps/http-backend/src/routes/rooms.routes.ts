import {json, Router } from "express";
import type {Router as ExpressRouter } from "express";
import { middleware } from "../middleware";
import { prisma } from "@repo/db2";
import { createRoom } from "@repo/common/zodTypes";
import { Request, Response } from "express";

const router: ExpressRouter =Router()

interface roomData{
  id:number
  slug:string,
  adminId:string
}

//get all rooms
router.get('/room',middleware, async (req,res)=>{
    try{
    const allRooms= await prisma.room.findMany({
        where:{
            adminId: req.userId
        },
        select:{
            id: true,
            slug:true,
            createdAt:true
        }
    })

    res.status(200).json({
        success:true,
        allRooms
    })
    } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
})
router.post('/create-room',middleware, 
    async (req:Request, res:Response)=>{
  const parsed= createRoom.safeParse(req.body)
  if(!parsed.success){
    return res.status(400).json({message:"Validation failed" })
  }

  const {slug}=parsed.data
  console.log("slug:", slug)
  try{
    const room:roomData= await prisma.room.create({
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
)


//get room by chat id
router.get("/chats/:roomId",middleware, async (req,res)=>{
    try{
        const {roomId}=req.params
        const roomID=Number(roomId)
        const message = await prisma.chat.findMany({
            where:{
                roomId:roomID
            },
            orderBy:{
                id: "desc"
            },
            take: 50
        })
        return res.json({
            message
        })
    }catch(err){
        return res.status(401).json({message: `ERROR:${err}`})
    }
})




//get room by name
router.get("/room/:slug",middleware, async (req,res)=>{
    try{
        console.log('i got hit by the backend')
        const {slug}=req.params
        const room = await prisma.room.findFirst({
            where:{
                slug:slug
            }
        })
        

        return res.status(200).json({
            room:room,
        })
    }catch(err){
        return res.status(401).json({message: `ERROR:${err}`})
    }
})








export default router