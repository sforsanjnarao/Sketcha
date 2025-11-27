import axios from "axios";
import { BACKEND_URL } from "../../../config";
import ChatRoomClient from "../../../components/ChatRoomClient";


//here we are taking slug from the user in and retriving the roomID base on slug
async function getRoomId(slug:string) {
   const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNDY0NzJkNi0yZjZmLTQ4ZWMtOTkzNC0wMDAzOWZiMzI2NWQiLCJpYXQiOjE3NjQyNTE0MzksImV4cCI6MTc2NDMzNzgzOX0.NqeoY91mvW7w_PGBtpfwUdToihsWT5vwzV791FzT1g8'
   console.log(`${BACKEND_URL}/api/room/${slug}`)
    const response= await axios.get(`${BACKEND_URL}/api/room/${slug}`,
        {headers:{
            Authorization:`Bearer ${token}`
        }}
    )
    console.log('Response:',response)
    return response.data.room.id
}

async function getChats(roomId:string) {
    // const token= localStorage.getItem('sketcha_token')
   const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNDY0NzJkNi0yZjZmLTQ4ZWMtOTkzNC0wMDAzOWZiMzI2NWQiLCJpYXQiOjE3NjQyNTE0MzksImV4cCI6MTc2NDMzNzgzOX0.NqeoY91mvW7w_PGBtpfwUdToihsWT5vwzV791FzT1g8'
    const response= await axios.get(`${BACKEND_URL}/api/chats/${roomId}`,
        {headers:{
            Authorization:`Bearer ${token}`
        }}
    )
    return response.data.message
}


export default async function ChatRoom({params}:{params:{
    slug:string
    }}){
        console.log("PARAMS:", params);
        const {slug}= await params;
        const roomId= await getRoomId(slug)
        const message=await  getChats(roomId)
    return(
        <ChatRoomClient message={message} id={roomId}></ChatRoomClient>
    )
}