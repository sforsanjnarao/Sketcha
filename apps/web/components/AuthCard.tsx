'use client'
import React from 'react'


export default function AuthCard({ title, children }: { title: string; children: React.ReactNode }) {
return (
<div className="w-full max-w-md bg-white/90 rounded-2xl p-6 shadow-lg border border-white/50">
    <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-linear-to-br from-pink-200 via-blue-200 to-yellow-200 flex items-center justify-center font-bold">S</div>
            <div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-sm text-slate-600">Start creating beautiful sketches.</p>
            </div>
    </div>
    <div>{children}</div>
</div>
)
}