'use client'

import React from 'react'
import Link from 'next/link'
import {  Button } from '@heroui/react'
import DemoCanvas from '../components/DemoCanvas'
import Blob from '../components/Blob'
import Doodles from '../components/Doodles'
import Connector from '../components/Connector'
import DoodleBorder from '../components/DoodleBorder'

export default function HomePage() {
  return (
    <main className="relative overflow-hidden px-6 py-24 max-w-6xl mx-auto">
      <Doodles />
      <Connector className="left-32 top-72" />
      <Connector className="right-32 top-48 rotate-180" />
      {/* Floating blobs */}
      <Blob className="-left-32 -top-24 opacity-70 z-10" />
      <Blob className="right-0 top-20 opacity-80" />

      <section className="flex flex-col md:flex-row gap-16 items-center">
        {/* Left Content */}
        <div className="flex-1">
          <h1 className="text-6xl font-bold text-slate-900 mb-4">
            Sketch your ideas.
            <br /> Bring them to life.
          </h1>

          <p className="text-lg text-slate-700 mb-6">
            A playful infinite canvas built for messy creativity.
          </p>

          <div className="flex gap-4 mb-10">
            {/* if authinticated set it strate to the dashboard */}
            <Button
              radius="lg"
              as={Link}
              href="/signin"
              variant="solid"
              color="default"
              className="bg-white shadow hover:scale-105 transition-all"
            >
              Start Drawing
            </Button>

            <Button
              radius="lg"
              as={Link}
              href="/signup"
              variant="flat"
              className="backdrop-blur bg-white/40 border border-white/50"
            >
              Sign Up Free
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            <Feature title="Infinite Canvas" desc="Draw without limits" />
            <Feature title="Real-time Collab" desc="Invite friends instantly" />
            <Feature title="Simple Tools" desc="Shapes, pen, text" />
            <Feature title="Cloud Saves" desc="Your ideas stay safe" />
          </div>
        </div>

        {/* Right Demo Canvas */}
        <div className="flex-1">
          <DemoCanvas />
        </div>
      </section>
    </main>
  )
}

function Feature({
  title,
  desc,
}: {
  title: string
  desc: string
}) {
  return (
    <DoodleBorder>
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm text-slate-600">{desc}</p>
    </DoodleBorder>
  )
}