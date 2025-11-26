'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function Blob({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ scale: 1, rotate: 0 }}
      animate={{
        scale: [1, 1.05, 1],
        rotate: [0, 3, -3, 0],
      }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg
        width="520"
        height="320"
        viewBox="0 0 520 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#FFD6E8" />
            <stop offset="50%" stopColor="#D6EFFF" />
            <stop offset="100%" stopColor="#FFECC7" />
          </linearGradient>
        </defs>

        <path
          d="M80 10C140 -20 260 -10 360 20C460 50 500 140 420 210C340 280 160 300 60 240C-40 180 20 40 80 10Z"
          fill="url(#g)"
          opacity="0.9"
        />
      </svg>
    </motion.div>
  )
}