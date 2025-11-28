import { useEffect, useState } from "react";
import { WS_URL } from "../config";

//add token here too
 export  function useSocket(){
    const [loading, setLoading]= useState(true)
    const [socket, setSocket]= useState<WebSocket>()


    useEffect(()=>{
        try{
        const ws= new WebSocket(WS_URL)
        console.log('ws:',ws)
        ws.onopen=()=>{
            setLoading(false)
            setSocket(ws)
            console.log('websocket is on')
        }}catch(error){
            
            console.error("Failed to initialize WebSocket:", error)
            setLoading(false)
        }
    },[])

    return({
        loading, socket
    })

}