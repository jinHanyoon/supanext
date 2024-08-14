'use client'
import { useState } from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import Header from "./component/header/header";
import Footer from "./component/footer/footer";
import Sidebar from "./component/sidebar/page";


import css from "./globals.css";
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {

  const [videoPlaying, setVideoPlaying] = useState(false);

  const handleConfirm = () => {
    setVideoPlaying(true);}

  
  return (
    <html lang="en">
    <head>
    <title>Dev JinHan</title>
        <meta name="description" content="Yoon Jin Han" />
        <meta property="og:title" content="Space world" />
        <meta property="og:description" content="Start" />
        <meta property="og:image" content="/main_img.jpg" />
        <meta property="og:url" content="https://ext005552.vercel.app/" />

        <link rel="icon" href="/favicon.ico" />
      </head>


        <body>
        {!videoPlaying && (
          <div className="fixed top-0 left-0 inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50 w-full h-full">
<button onClick={handleConfirm} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
<span className="opacity-80 relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-100 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-black font-bold text-xl	">
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

 

      <Header/>


      <Sidebar/>         

  {children}
      
      <Footer/>

      </body>
    </html>
  );
}
