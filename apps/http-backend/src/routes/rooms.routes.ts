import {json, Router } from "express";
import type {Router as ExpressRouter } from "express";
import { middleware } from "../middleware";
import { rooms } from "../controller/rooms.controller";
import { prismaClient } from "@repo/db/prismaClient";

const router: ExpressRouter =Router()




router.post('/create-room',middleware, rooms)


//get room by chat id
router.get("/chats/:roomId",middleware, async (req,res)=>{
    try{
        const {roomId}=req.params
        const roomID=Number(roomId)
        const message = await prismaClient.chat.findMany({
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


//get all rooms
router.get('/room',middleware, async (req,res)=>{
    try{
    const allRooms= await prismaClient.room.findMany({
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

//get room by name
router.get("/room/:slug",middleware, async (req,res)=>{
    try{
        console.log('i got hit by the backend')
        const {slug}=req.params
        const room = await prismaClient.room.findFirst({
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