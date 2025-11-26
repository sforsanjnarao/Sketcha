"use client"
import React, { useEffect, useState } from 'react'
import { useSocket } from '../hook/useSocket'

const ChatRoomClient = ({message, id}:{
    message:{message:string}[],
    id:string
}) => {

    const [chats, setChats]=useState(message)
    const {socket, loading}=useSocket()
    const [currentMessage, setCurrentMessage]=useState('')

    useEffect(()=>{
        if(socket && !loading){
            socket.send(JSON.stringify({
                type:'join_room',
                roomId:id
            }))

         socket.onmessage=(event)=>{
            const parsedData=JSON.parse(event.data)
            if(parsedData.type==='chat'){
                setChats(c=>[...c,parsedData.message])
            }
         }
        }

    },[socket, loading, id])

  return (
    <div>
        {chats.map((m)=> <div>{m.message}</div>)}


        <input type="text"  value={currentMessage} onChange={(e)=>setCurrentMessage(e.target.value)}/>
        <button onClick={()=>{
            socket?.send(JSON.stringify({
                type:'chat',
                message:currentMessage,
                roomId:id
            }))
            setCurrentMessage('')
        }
        }>send message</button>
    </div>
  )
}

export default ChatRoomClient