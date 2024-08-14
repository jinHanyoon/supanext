import { Inter } from "next/font/google";
import Image from "next/image";
import Header from "./component/header/header";
import Footer from "./component/footer/footer";
import Sidebar from "./component/sidebar/page";


import css from "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {

};

export default function RootLayout({ children }) {
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
        <video autoPlay loop muted className="fixed top-0 left-0 w-full h-full object-cover -z-10">
    <source src="/img/bg.webm" type="video/mp4" />
    </video>    
      <Header/>


      <Sidebar/>         

  {children}
      
      <Footer/>

      </body>
    </html>
  );
}
