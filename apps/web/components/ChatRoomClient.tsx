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
            console.log('getting the socket with loading:',socket)
            socket.send(JSON.stringify({
                type:'join_room',
                roomId:id
            }))
            console.log('sent by server')
         socket.onmessage=(event)=>{
            const parsedData=JSON.parse(event.data)
            if(parsedData.type==='chat'){
                setChats(c=>[...c,parsedData.message])
            }
         }
         console.log('should run ')
        }

    },[socket, loading, id])

  return (
    <div>
        {chats.map((m,id)=> <div key={id}>{m.message}</div>)}


        <input type="text"  value={currentMessage} onChange={(e)=>setCurrentMessage(e.target.value)}/>
        <button onClick={()=>{
            console.log('sending the message by clicking the button from client to server')
            socket?.send(JSON.stringify({
                type:'chat',
                message:currentMessage,
                roomId:id
            }))
            setCurrentMessage('')
            console.log('is it got send')
        }
        }>send message</button>
    </div>
  )
}

export default ChatRoomClient