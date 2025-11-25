import {json, Router } from "express";
import type {Router as ExpressRouter } from "express";
import { middleware } from "../middleware";
import { rooms } from "../controller/rooms.controller";
import { prismaClient } from "@repo/db/prismaClient";

const router: ExpressRouter =Router()




router.post('/create-room',middleware, rooms)

router.get("/room/:slug",middleware, async (req,res)=>{
    const {slug}=req.params
    const room = await prismaClient.room.findFirst({
        where:{
            slug:slug
        }
    })
    return res.json({
        room
    })
})

router.get("/chats/:roomId",middleware, async (req,res)=>{
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
})



export default router