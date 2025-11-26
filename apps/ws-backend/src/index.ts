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
            const decoded= jwt.verify(token,JWT_SECRET) as {userId:string}
            console.log('Decode:',decoded)
            console.log(decoded.userId)
            info.req.userId=decoded.userId
            console.log(info.req.userId)
            done(true)
        } catch (error) {
            done(false, 401, 'Invalid token')
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
             console.log('connected 01')
        users.push({
            userId:request.userId as string,
            ws,
            rooms:[]
        })
        console.log('connected 02')
    ws.on('message',async (data)=>{
        console.log("raw Data:", data)
         //it's in buffer
          try{
            const raw = data.toString("utf8");
            console.log('Raw:',raw)
       

             //data is what client send as an object
        const parsedData=await JSON.parse(raw) //{type:"join_room", roomId:1}
        //{
        //  type:enum[join_room, leave_room, chat]
        //  roomId:
        //  message:
        //} 
        console.log("after parsed",parsedData)
        
        if(parsedData.type=="join_room"){
            const user=users.find(x=>x.ws==ws)
            user?.rooms.push(parsedData.roomId) //we should we pushing just the 
            console.log('user.rooms', user?.rooms)
        }

        if(parsedData.type=="leave_room"){
            const user=users.find(x=>x.ws==ws)
            if(!user) return;
            user.rooms=user.rooms.filter(x=>x !==parsedData.roomId)
            
        }

        if(parsedData.type==="chat"){
            const roomId=parsedData.roomId
            const message= parsedData.message
            console.log(`CHAT: {roomID: ${roomId}, message:${message}}`)

            //TODO: push it to the queue
            const createChat=await prismaClient.chat.create({
                data:{
                    message,
                    user:{
                        connect:{id: request.userId as string}
                    },
                    room:{
                        connect:{id: roomId}
                    },
                }
            })
            console.log(createChat)
            console.log('All Users:', users)
            //not inside any room id
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
        }catch(err){
                console.error("WebSocket error:", err);
                ws.send(JSON.stringify({
                    type: "error",
                    message: "Server error"
                }));
        }
       

    })
})