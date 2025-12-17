import { useEffect, useState } from "react";
import { WS_URL } from "../config";
//this just opening a websocket connect and returning ws object and loading if it set up or not


export const WS_URI = (() => {
  const url = WS_URL;
  if (!url) throw new Error("WS_URL is missing");
  return url;
})();
 export  function useSocket(){
    const [loading, setLoading]= useState(true)
    const [socket, setSocket]= useState<WebSocket>()

    useEffect(()=>{
        try{
        const ws= new WebSocket(WS_URI)
        ws.onopen=()=>{
            setLoading(false)
            setSocket(ws)  //saving the connection object
        }}catch(error){
            console.error("Failed to initialize WebSocket:", error)
            setLoading(false)
        }
    },[])

    return({
        loading, socket
    })

}