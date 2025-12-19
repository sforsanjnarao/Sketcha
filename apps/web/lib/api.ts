import axios from "axios";
import { getBaseUrl} from '../config'

export async function signup({ name, email, password }: { name: string; email: string; password: string }) {
    console.log(`${getBaseUrl()}`)
const res= await axios.post(`${getBaseUrl()}/api/auth/signup`,
    {name, email, password},
    {withCredentials: true}
)
const json = res.data
return json
}


export async function signin({ email, password }: { email: string; password: string }) {
    console.log(`${getBaseUrl()}`)
const res= await axios.post(`${getBaseUrl()}/api/auth/signin`,
    { email, password},
     {withCredentials: true}
)
const json =  res.data
return json
}