import React from 'react'

function page() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
  <div className="max-w-6xl mx-auto px-6 flex items-center gap-8">
    <div className="w-1/2">
      <h1 className="text-6xl font-extrabold">Sketcha</h1>
      <p className="mt-3 text-gray-600">Sketch, brainstorm, collaborate — fast.</p>
      <div className="mt-6">
        <a className="px-6 py-3 rounded-full bg-[#FFCF86]">Get started</a>
      </div>
    </div>
    <div className="w-1/2">
      {/* SVG doodle (large) with subtle hover animations */}
      <img src="/assets/modern-doodle-1.svg" alt="doodle" />
    </div>
  </div>
</section>






  )
}

export default page