import { Inter } from "next/font/google";
import Image from "next/image";
import Header from "./component/header/header";
import Footer from "./component/footer/footer";
import Sidebar from "./component/sidebar/page";
import BackVideo from "./bg/bg";


import css from "./globals.css";
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {


  
  return (
    <html lang="en" >
    <head>
    <title>Dev JinHan</title>
        <meta name="description" content="Yoon Jin Han" />
        <meta property="og:title" content="Space world" />
        <meta property="og:description" content="Start" />
        <meta property="og:image" content="/main_img.jpg" />
        <meta property="og:url" content="https://ext005552.vercel.app/" />

        <link rel="icon" href="/favicon.ico" />
      </head>


        <body className={inter.className}>
  {/* <BackVideo/>       */}
      <Header/>
      <Sidebar/>         

  {children}
      
      {/* <Footer/> */}

      </body>
    </html>
  );
}
