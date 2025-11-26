'use client'

import React from 'react'
import { Button } from '@heroui/react'
import { motion } from 'framer-motion'

type WobbleButtonProps = React.ComponentProps<typeof Button> & {
  customProp?: string;
};

export default function WobbleButton(props: WobbleButtonProps) {
  return (
    <motion.div
      whileHover={{ rotate: [-2, 2, -2, 0], scale: 1.05 }}
      transition={{ duration: 0.4 }}
    >
      <Button
        {...props}
        radius="lg"
        className={`shadow-md ${props.className || ''}`}
      >
        {props.children}
      </Button>
    </motion.div>
  )
}