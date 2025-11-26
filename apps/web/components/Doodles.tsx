'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'

const doodleVariants:Variants = {
  float: (delay: number) => ({
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    },
  }),
}

export default function Doodles() {
  return (
    <>
      {/* Star */}
      {/* <motion.div
        custom={0}
        animate="float"
        variants={doodleVariants}
        className="absolute left-12 top-40 opacity-80 z-10"
      >
        <svg width="40" height="40" viewBox="0 0 40 40">
          <path
            d="M20 2 L24 14 L36 14 L26 22 L30 34 L20 26 L10 34 L14 22 L4 14 L16 14 Z"
            fill="#FFD6E8"
            stroke="#EAA2C9"
            strokeWidth="2"
          />
        </svg>
      </motion.div> */}

      {/* Diamond */}
      <motion.div
        custom={1}
        animate="float"
        variants={doodleVariants}
        className="absolute right-20 top-52 opacity-80 z-10"
      >
        <svg width="36" height="36" viewBox="0 0 36 36">
          <rect
            x="6"
            y="6"
            width="24"
            height="24"
            transform="rotate(45 18 18)"
            fill="#C6FFD9"
            stroke="#AEEBC1"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* Wiggly Line */}
      <motion.div
        custom={2}
        animate="float"
        variants={doodleVariants}
        className="absolute left-1/2 top-20 opacity-70"
      >
        <svg width="120" height="40" viewBox="0 0 120 40">
          <path
            d="M5 20 Q20 5 35 20 T65 20 T95 20 T115 20"
            stroke="#A78BFA"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Scribble Circle */}
      <motion.div
        custom={0.8}
        animate="float"
        variants={doodleVariants}
        className="absolute right-10 top-96 opacity-100 z-10"
      >
        <svg width="50" height="50" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="18"
            stroke="#FFECC7"
            strokeWidth="6"
            fill="none"
          />
        </svg>
      </motion.div>
    </>
  )
}