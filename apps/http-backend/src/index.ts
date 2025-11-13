import express, { urlencoded } from 'express'
const app=express()
import auth from './routes/auth.routes'
import cookieParser from 'cookie-parser'

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',auth)
app.listen(4000)