import { Inter } from "next/font/google";
import Image from "next/image";
import Header from "./component/layout/header/header";
import Footer from "./component/layout/footer/footer";
import Sidebar from "./component/layout/sidebar/page";


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


        <body className="bg-stone-100 relative min-h-screen pb-[60px]">
      <Header/>
      <Sidebar/>         
      <main className="pb-24"> {/* 푸터 높이만큼 패딩 추가 */}
          {children}
        </main>
<Footer/>
      </body>
    </html>
  );
}
