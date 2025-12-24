'use server'
import RoomsClient from '../../components/rooms-client';
import { getBaseUrl } from '../../config';

import { cookies } from "next/headers";

async function getAllRooms() {
  try {
    const cookieStore = await cookies(); 
    const tokenCookie = cookieStore.get('sketcha_token');
    const cookieHeader = tokenCookie 
      ? `sketcha_token=${tokenCookie.value}` 
      : "";
    console.log(`${getBaseUrl()}/api/v1/room`);

    const res = await fetch(`${getBaseUrl()}/api/v1/room`, {
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