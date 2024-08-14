import { Inter } from "next/font/google";
import Image from "next/image";
import Header from "./component/header/header";
import Footer from "./component/footer/footer";
import Sidebar from "./component/sidebar/page"

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
        <meta property="og:image" content="/main_img.jpg" />
        <meta property="og:url" content="https://dash-rose-two.vercel.app/" />
        <link rel="icon" href="/favicon.ico" />
      </head>


        <body>
      <Header/>
      <Sidebar/>         

  {children}
      
      <Footer/>
      </body>
    </html>
  );
}
