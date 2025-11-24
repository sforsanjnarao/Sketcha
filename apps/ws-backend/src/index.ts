import jwt from "jsonwebtoken";
import type {JwtPayload} from "jsonwebtoken";

import { WebSocketServer } from "ws";
import type { WebSocket } from "ws";

import { JWT_SECRET } from "@repo/backend-common/config";
import {prismaClient} from "@repo/db/prismaClient"

const wss= new WebSocketServer({port:8080,
    verifyClient:(info,done)=>{
        const authHeader= info.req.headers["authorization"]
        if(!authHeader){
            return done(false, 401,'token missing')
        }
        const token= authHeader.split(" ")[1] 
        if(!token) return done(false, 401, ' token not available')

        try {
            const decoded= jwt.verify(token,JWT_SECRET) as {useId:string}
            info.req.userId=decoded.useId
            done(true)
        } catch (error) {
            done(false, 401, 'Invalid token ')
        }
    }
})
interface User{
    userId:string,
    ws:WebSocket,
    rooms:string[]
}
const users:User[]=[]

wss.on('connection',async (ws, request)=>{
  
        users.push({
            userId:request.userId as string,
            ws,
            rooms:[]
        })
    ws.on('message',async (data)=>{
        //data is what client send as an object
        const parsedData=JSON.parse(data as unknown as string)
        //parsedData{
        //  type:enum[join_room, leave_room, chat]
        //  roomId:
        //  message:
        //} 

        if(parsedData.type=="join_room"){
            const user=users.find(x=>x.ws==ws)
            user?.rooms.push(parsedData.roomId) //we should we pushing just the 
        }

        if(parsedData.type=="leave_room"){
            const user=users.find(x=>x.ws==ws)
            if(!user) return;
            user.rooms=user.rooms.filter(x=>x !==parsedData.roomId)
            
        }

        if(parsedData.type==="chat"){
            const roomId=parsedData.roomId
            const message= parsedData.message

            //TODO: push it to the queue
            await prismaClient.chat.create({
                data:{
                    roomId,
                    message,
                    userId:request.userId as string
                }
            })
            users.forEach(user=>{
                if(user.rooms.includes(roomId)){
                    user.ws.send(JSON.stringify({
                        type:'chat',
                        message:message,
                        roomId
                    }))
                }
            })
        }

    })
})