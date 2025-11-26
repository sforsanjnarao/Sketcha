'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function ConfettiBurst({
  trigger,
}: {
  trigger: boolean
}) {
  if (!trigger) return null

  const colors = ['#FFD6E8', '#D6EFFF', '#FFECC7', '#C6FFD9']

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full absolute"
          style={{
            backgroundColor: colors[i % colors.length],
            left: '50%',
            top: '50%',
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200,
            opacity: 0,
            scale: 0.4,
          }}
          transition={{
            duration: 1.2,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}