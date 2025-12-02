"use client"
import React, { useEffect, useState } from 'react'
import { useSocket } from '../hook/useSocket'
import CollaborativeBoard from './CollaborativeBoard'

const ChatRoomClient = ({message, id}:{
    message:{message:string}[],
    id:string
}) => {

    const [chats, setChats]=useState(message)
    const {socket, loading}=useSocket()
    // const [currentMessage, setCurrentMessage]=useState('')

    useEffect(()=>{
        if(socket && !loading){
            socket.send(JSON.stringify({
                type:'join_room',
                roomId:Number(id),
                chats  //just to deploy
            }))
         socket.onmessage=(event)=>{
            const parsedData=JSON.parse(event.data)
            if(parsedData.type==='chat'){
                setChats(c=>[...c,{message:parsedData.message}])
            }
         }
        }

    },[socket, loading, id,chats])

  return (
   <div>
        <div>
            <h2 className="text-xl font-bold mb-2">Whiteboard</h2>
            {/* We pass the socket to the board so it can talk to the server */}
            <CollaborativeBoard socket={socket} roomId={id} />

        </div>
         {/* <div>
            {chats.map((m,index)=> <div key={index}>{m.message}</div>)}


            <input type="text"  value={currentMessage} onChange={(e)=>setCurrentMessage(e.target.value)}/>
            <button onClick={()=>{
                socket?.send(JSON.stringify({
                    type:'chat',
                    message:currentMessage,
                    roomId:Number(id)
                }))
                setCurrentMessage('')
            }
            }>send message</button>
        </div> */}
   </div>
  )
}

export default ChatRoomClient