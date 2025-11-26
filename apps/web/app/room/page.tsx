"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Room = () => {
    const [slug, setSlug]= useState("")
    const router= useRouter()
    const joinRoomHandler=()=>{
        router.push(`room/${slug}`)
    }
  return (
    <div>
        <input type="text" 
        value={slug} onChange={(e)=>setSlug(e.target.value)}
        placeholder='enter room name'
        />
        <button onClick={joinRoomHandler}>join room</button>
    </div>
  )
}

export default Room