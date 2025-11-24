import express, { urlencoded } from 'express'
const app=express()
import auth from './routes/auth.routes'
import room from './routes/rooms.routes'
import cookieParser from 'cookie-parser'
import dotenv from "dotenv";
dotenv.config({ path: "../../packages/db/.env" });

app.use(express.json())
app.use(cookieParser())

console.log("DB URL =>", process.env.DATABASE_URL);
app.use('/api/auth',auth)
app.use('/api',room)
app.listen(4000,()=>{
    console.log('running on port 4000')
})