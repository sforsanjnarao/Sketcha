import {email, z} from 'zod'

export const signupSchema= z.object({
    name: z.string().min(3).max(20),
    email: z.email(),
    password: z.string()
})

export const signinSchema= z.object({
    email: z.email(),
    password: z.string()
})

export const createRoom= z.object({
    slug: z.string().min(3).max(20)
})