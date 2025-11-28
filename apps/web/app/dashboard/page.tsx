'use server'
import RoomsClient from '../../components/rooms-client';
import { BACKEND_URL } from '../../config';

// Import cookies from next/headers
import { cookies } from "next/headers";

async function getAllRooms() {
  try {
    // 1. Get the cookie store (Note: await cookies() if using Next.js 15, just cookies() for 13/14)
    const cookieStore = await cookies(); 
    
    // 2. Get the specific token
    const tokenCookie = cookieStore.get('sketcha_token');

    // 3. Prepare the header value
    const cookieHeader = tokenCookie 
      ? `sketcha_token=${tokenCookie.value}` 
      : "";

    console.log(`${BACKEND_URL}/api/room`);

    const res = await fetch(`${BACKEND_URL}/api/room`, {
      method: 'GET',
      headers: {
        // 4. Manually pass the Cookie header
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
      cache: 'no-store'
    });

    console.log("Response headers:", res.headers);
    
    if (!res.ok) {
      console.error("Fetch failed with status:", res.status);
      return [];
    }

    const data = await res.json();
    return data.allRooms;

  } catch (e) {
    console.error('ROOM FETCH ERROR', e);
    return [];
  }
}
export default async function DashboardPage() {
  

  const rooms = await getAllRooms();

  

  return <RoomsClient rooms={rooms} />;
}