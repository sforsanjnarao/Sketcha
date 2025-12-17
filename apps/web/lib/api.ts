import axios from "axios";
import {BACKEND_URL} from '../config'

export async function signup({ name, email, password }: { name: string; email: string; password: string }) {
    console.log(`${BACKEND_URL}`)
const res= await axios.post(`${BACKEND_URL}/api/auth/signup`,
    {name, email, password},
    {withCredentials: true}
)
const json = res.data
return json
}


export async function signin({ email, password }: { email: string; password: string }) {
    console.log(`${BACKEND_URL}`)
const res= await axios.post(`${BACKEND_URL}/api/auth/signin`,
    { email, password},
     {withCredentials: true}
)
const json =  res.data
return json
}