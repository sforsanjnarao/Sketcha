import {json, Router } from "express";
import type {Router as ExpressRouter } from "express";
import { middleware } from "../middleware";
import { rooms } from "../controller/rooms.controller";
import { prismaClient } from "@repo/db/prismaClient";

const router: ExpressRouter =Router()




router.post('/create-room',middleware, rooms)

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

router.get("/room/:slug",middleware, async (req,res)=>{
    try{
        const {slug}=req.params
        const room = await prismaClient.room.findFirst({
            where:{
                slug:slug
            }
        })
        

        return res.status(200).json({
            room:room,
            message:'lala'
        })
    }catch(err){
        return res.status(401).json({message: `ERROR:${err}`})
    }
})





export default router