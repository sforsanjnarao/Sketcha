'use client'

import React from 'react'
import { Card, CardBody } from '@heroui/react'
import { motion } from 'framer-motion'

export default function DemoCanvas() {
  return (
    <Card
      radius="lg"
      shadow="lg"
      className="bg-white/90 backdrop-blur border border-white/60"
    >
      <CardBody>
        <div className="h-80 w-full rounded-lg border-2 border-dashed border-slate-300 bg-linear-to-br from-white to-blue-50 relative overflow-hidden">
          {/* Floating rectangle */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-6 top-6"
          >
            <svg width="160" height="120" viewBox="0 0 160 120">
              <rect
                x="8"
                y="8"
                width="64"
                height="40"
                rx="6"
                fill="#FFD6E8"
                stroke="#EAA2C9"
              />
            </svg>
          </motion.div>

          {/* Wobbling circle */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 6, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-32 top-20"
          >
            <svg width="160" height="120" viewBox="0 0 160 120">
              <circle
                cx="120"
                cy="40"
                r="22"
                fill="#C6FFD9"
                stroke="#AEEBC1"
              />
            </svg>
          </motion.div>

          {/* Floating line */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-6 bottom-8"
          >
            <svg width="160" height="40" viewBox="0 0 160 40">
              <path
                d="M20 20 L140 20"
                stroke="#A78BFA"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </div>
      </CardBody>
    </Card>
  )
}