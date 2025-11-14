import {z} from 'zod'
export const signupSchema=z.object({
    username:z.string().min(3).max(20),
    email: z.email(),
    password:z.string()
})

export const signinSchema=z.object({
     email: z.email(),
    password:z.string()
})

export const createRoom=z.object({
    roomName:z.string().min(3).max(20)
})
