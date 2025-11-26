'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function DoodleBorder({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <motion.div
      className="relative p-4 rounded-xl bg-white/80 backdrop-blur border-2"
      style={{ borderStyle: 'dashed', borderColor: '#373737' }}
      whileHover={{
        rotate: [0, -1.5, 1.5, 0],
        transition: { duration: 0.4 },
      }}
    >
      {/* Wiggly border effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{ border: '2px dashed #373737' }}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}