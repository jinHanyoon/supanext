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
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <button
              onClick={handleConfirm}
              className="bg-white text-black p-2 rounded"
            >
              확인
            </button>
          </div>
        )}


{videoPlaying && (
          <video autoPlay loop muted className="fixed inset-0 object-cover -z-10 top-0 left-0 w-full h-full">
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
