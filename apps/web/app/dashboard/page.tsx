'use server'
import RoomsClient from '../../components/rooms-client';
import { BACKEND_SERVER_URL } from '../../config';

import { cookies } from "next/headers";

async function getAllRooms() {
  try {
    const cookieStore = await cookies(); 
    const tokenCookie = cookieStore.get('sketcha_token');
    const cookieHeader = tokenCookie 
      ? `sketcha_token=${tokenCookie.value}` 
      : "";
    console.log(`${BACKEND_SERVER_URL}/api/room`);

    const res = await fetch(`${BACKEND_SERVER_URL}/api/room`, {
      method: 'GET',
      headers: {
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