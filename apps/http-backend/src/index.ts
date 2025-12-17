import express, { urlencoded } from 'express'
const app=express()
import auth from './routes/auth.routes'
import room from './routes/rooms.routes'
import cookieParser from 'cookie-parser'
import dotenv from "dotenv";
import cors from 'cors'


dotenv.config({ path: "../../packages/db/.env" });


app.use(cors({origin:'http://localhost:3000',
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',auth)
app.use('/api',room)
app.listen(3001,()=>{
    console.log('running on port 3001')
})