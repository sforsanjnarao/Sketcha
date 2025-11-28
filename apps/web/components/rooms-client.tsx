'use client';

import React, { useState } from 'react';
import { Card, CardBody } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ConfettiBurst from './ConfettiBurst';
// import DoodleBorder from './DoodleBorder'; // Uncomment if you use this
import { BACKEND_URL } from '../config';
import axios from 'axios';


export default function RoomsClient( {rooms} : {rooms: {
        id:string,
        slug:string,
        createdAt :Date   
}[]}) {

  const router = useRouter();
  console.log(rooms) 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slug, setSlug] = useState('');
  
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [confetti, setConfetti] = useState(false);

  const openCreateModal = () => {
    setSlug(''); 
    setError(''); 
    setIsModalOpen(true);
  };


  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    if (!slug.trim()) {
      setError("Room name cannot be empty");
      return;
    }

    setCreating(true);
    setError('');

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/create-room`,
        { slug }, 
        { withCredentials: true }
      );

      const json = res.data;

      setIsModalOpen(false); 
      setConfetti(true);     
      setTimeout(() => {
        setConfetti(false);
        router.push(`/room/${json.slug}`);
      }, 1000);
       router.refresh()


    } catch (e: any) {
      console.error(e);
      const msg = e.response?.data?.message || e.message || "Failed to create room";
      setError(msg);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="px-6 py-16 max-w-5xl mx-auto relative">
      <h1 className="text-4xl font-bold mb-10 text-slate-900">Your Rooms</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* === NEW ROOM CARD (Click opens modal) === */}
        <Card
          isPressable
          onPress={openCreateModal}
          className="relative bg-white/80 backdrop-blur shadow-lg border border-white/50 p-4 flex items-center justify-center h-48"
        >
          <CardBody className="text-center flex flex-col justify-center items-center overflow-visible">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-6xl font-bold text-blue-500 mb-2"
            >
              +
            </motion.div>
            <p className="font-semibold text-slate-600">Create New Room</p>
            {/* Confetti sits here to burst over the button */}
            <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
                <ConfettiBurst trigger={confetti} />
            </div>
          </CardBody>
        </Card>

        {/* === EXISTING ROOMS === */}
        {rooms.map((room) => (
          <motion.div
            key={room.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => router.push(`/room/${room.slug}`)}
            className="cursor-pointer h-48"
          >
            <Card className="h-full bg-white shadow-md hover:shadow-xl transition-shadow border border-slate-200">
              <CardBody className="flex flex-col justify-center items-center text-center p-6">
                <h3 className="text-2xl font-bold mb-2 text-slate-800 break-all">{room.slug}</h3>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  {/* ID: {room.id?.slice(0, 8)} ... */}
                </p>
                <div className="mt-4 px-3 py-1 bg-slate-100 rounded-full text-xs text-slate-500">
                  {new Date(room.createdAt).toLocaleDateString()}
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* === CUSTOM MODAL FORM === */}
      
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10"
            >
              <h2 className="text-2xl font-bold mb-6 text-slate-800">Name your room</h2>
              
              <form onSubmit={handleCreateRoom}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Room Slug / Name
                  </label>
                  <input
                    autoFocus
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. friday-night-hangout"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-800 text-lg"
                  />
                  {error && (
                    <p className="mt-2 text-red-500 text-sm font-medium animate-pulse">
                      {error}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creating || !slug}
                    className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
                  >
                    {creating ? (
                      <span className="flex items-center gap-2">
                         <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                         </svg>
                         Creating...
                      </span>
                    ) : (
                      "Create Room"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
       
      </AnimatePresence>
    </div>
  );
}