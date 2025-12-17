import axios from "axios";
import { BACKEND_SERVER_URL, BACKEND_URL } from "../../../config";
import ChatRoomClient from "../../../components/ChatRoomClient";

import { cookies } from "next/headers";





//here we are taking slug from the user in and retriving the roomID base on slug
async function getRoomId(slug:string) {
try{
    const cookieStore= await cookies()
    const token= cookieStore.get('sketcha_token')?.value
    console.log('slug token:', token)
    // console.log(`${BACKEND_URL}/api/room/${slug}`)
    const response= await axios.get(`${BACKEND_SERVER_URL}/api/room/${slug}`,
        {
            headers:{
                Cookie:`sketcha_token=${token}`
            }
        }
    )
    console.log('Response:',response)
    console.log('Response.data:',response.data)

    return response.data.room.id
    }catch(err){
        console.error(err,'get route find with slug')
    }
}

async function getChats(roomId:string) {
    const cookieStore= await cookies()
    const token= cookieStore.get('sketcha_token')?.value
    console.log('chat token:', token)
    // const token= localStorage.getItem('sketcha_token')
//    const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNDY0NzJkNi0yZjZmLTQ4ZWMtOTkzNC0wMDAzOWZiMzI2NWQiLCJpYXQiOjE3NjQyNTE0MzksImV4cCI6MTc2NDMzNzgzOX0.NqeoY91mvW7w_PGBtpfwUdToihsWT5vwzV791FzT1g8'
    const response= await axios.get(`${BACKEND_SERVER_URL}/api/chats/${roomId}`,
        {
             headers:{
                Cookie:`sketcha_token=${token}`
            }
        }
    )
    return response.data.message
}


export default async function ChatRoom({params}:{params:{
    slug:string
    }}){
        console.log("PARAMS:", params);
        const {slug}= await params;
        const roomId= await getRoomId(slug)
        if(!roomId) return <div>room not found</div>
        const message=await  getChats(roomId)
        if(!message) return <div>chats not found not found</div>

    return(
        <ChatRoomClient message={message} id={roomId}></ChatRoomClient>
    )
}