'use client'
import React from 'react'
import { useState } from 'react';

export default function BackVideo() {
 
    const [videoPlaying, setVideoPlaying] = useState(false);

    const handleConfirm = () => {
      setVideoPlaying(true);}
  
    return (
        <div>
    {!videoPlaying && (
        <div className="fixed top-0 left-0 inset-0 flex items-center justify-center bg-black bg-opacity-95 z-50 w-full h-full">
<button onClick={handleConfirm} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-transparent">
<span className="opacity-80 relative px-5 py-2.5 transition-all ease-in duration-75  rounded-md  text-white font-bold text-5xl hover:text-red-500	">
Start Web
</span>
</button>
        </div>
      )} 


{videoPlaying && (
        <video autoPlay loop muted playsInline className="fixed inset-0 object-cover -z-10 top-0 left-0 w-full h-full pointer-events-none">
          <source src="/img/bg02.mp4" type="video/mp4" />
        </video>
      )}
  </div>

  )
}
