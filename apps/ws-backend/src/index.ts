import { verify} from "jsonwebtoken";
import type {JwtPayload} from "jsonwebtoken";

import { WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/backend-common/config";

const wss= new WebSocketServer({port:8080})

wss.on('connection',async (ws, request)=>{
    const url= request.url;
    if(!url){
        return
    }
    const queryParams=new URLSearchParams(url.split('?')[1])
    const token= queryParams.get("token")|| ""
    const decoded= await verify(token, JWT_SECRET) as JwtPayload
    if(!decoded || !decoded.Id){
        ws.close();
        return
    }
    ws.on('message',(data)=>{
        ws.send('pong')
    })
})