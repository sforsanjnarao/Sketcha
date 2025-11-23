import express, { urlencoded } from 'express'
const app=express()
import auth from './routes/auth.routes'
import room from './routes/rooms.routes'
import cookieParser from 'cookie-parser'

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',auth)
app.use('/api',room)
app.listen(4000)