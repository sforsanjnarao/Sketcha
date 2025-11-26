import axios from "axios";

export async function signup({ name, email, password }: { name: string; email: string; password: string }) {
const res= await axios.post('http://localhost:4000/api/auth/signup',
    {name, email, password},
    {withCredentials: true}
)
const json = res.data
return json
}


export async function signin({ email, password }: { email: string; password: string }) {
const res= await axios.post('http://localhost:4000/api/auth/signin',
    { email, password},
     {withCredentials: true}
)
const json =  res.data
return json
}