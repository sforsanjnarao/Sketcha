import { cookies } from "next/headers"

export async function getTheToken() {
    const cookieStore= await cookies()
    const token= cookieStore.get('sketcha_token')?.value
    return token
}