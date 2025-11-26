'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function Connector({
  className,
}: {
  className?: string
}) {
  return (
    <motion.svg
      className={`absolute ${className}`}
      width="200"
      height="60"
      viewBox="0 0 200 60"
      initial={{ strokeDashoffset: 100 }}
      animate={{ strokeDashoffset: 0 }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <path
        d="M10 30 Q100 0 190 30"
        stroke="#A78BFA"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="10 10"
      />
    </motion.svg>
  )
}