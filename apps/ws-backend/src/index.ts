import jwt from "jsonwebtoken";
import type {JwtPayload} from "jsonwebtoken";

import { WebSocketServer } from "ws";
import type { WebSocket } from "ws";

import { JWT_SECRET } from "@repo/backend-common/config";
import {prismaClient} from "@repo/db/prismaClient"
import cookie from "cookie";


const wss= new WebSocketServer({port:8080})

function authUser(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('DECODED',decoded)
    if (typeof decoded == "string") {
      console.error("Decoded token is a string, expected object");
      return null;
    }
    if (!decoded.userId) {
      console.error("No valid user ID in token");
      return null;
    }
    console.log('DECODED 2',decoded.userId)

    return decoded.userId;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}

interface User{
    userId:string,
    ws:WebSocket,
    rooms:string[]
}
const users:User[]=[]

wss.on('connection',async (ws, request)=>{
    //   const url = request.url;
    //   console.log('URL',request.url)
    //     if (!url) {
    //         console.error("No valid URL found in request");
    //         return;
    //     }
    //     const parsedUrl = new URL(request.url!, "http://localhost");
    //     const token = parsedUrl.searchParams.get("token");
    const cookieHeader= request.headers.cookie
    if(cookieHeader==undefined){
        console.log('headers cookie from request is undefined')
        console.log('headers cookie from request is undefined')
        console.log('headers cookie from request is undefined')

    }
    const cookieParser= cookie.parse(cookieHeader as string)

    const token=cookieParser.sketcha_token

        console.log('TOKEN:', token)
        if (!token || token === null) {
            console.error("No valid token found in query params");
            ws.close(1008, "User not authenticated");
            return;
        }
        const userId = authUser(token);
        console.log('USERID AFTER TOKEN:',userId)
        if (!userId) {
            console.error("Connection rejected: invalid user");
            ws.close(1008, "User not authenticated");
            return;
        }

             console.log('connected 01')
        users.push({
            userId,
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
        const parsedData= JSON.parse(raw) //{type:"join_room", roomId:1}
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
                        connect:{id:userId}
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
                    console.log('user.room: ',user.rooms)
                    console.log('user.rooms.includes(roomId): ',user.rooms.includes(roomId))

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