import { Inter } from "next/font/google";
import { getServerSession } from './ilb/supabase/server';
import Header from "./component/layout/header/header.jsx";
import Footer from "./component/layout/footer/footer.jsx";
import Sidebar from "./component/layout/sidebar/page.jsx";
import css from "./globals.css";
import Providers from './providers/'; 
const inter = Inter({ subsets: ["latin"] });

export const dynamic = 'force-dynamic';
export default async  function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en" >
      <head>
        <title>Dev JinHan</title>
        <meta name="description" content="Yoon Jin Han" />
        <meta property="og:title" content="Yoon Jin Han" />
        <meta property="og:description" content="Start" />
        <meta property="og:image" content="/main_img.jpg" />
        <meta property="og:url" content="https://devjinhan.vercel.app/" />
        <meta name="keywords" content="개발자 윤진한, 프론트엔드, React, Next.js, supabase" />
        <meta name="author" content="Yoon Jin Han" />
        

        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className="bg-white relative min-h-screen pb-[60px]">
      <Providers session={session}>
    
        <Header/>
        <Sidebar/>         
        <main className="pb-24">
            {children}
        </main>
        <Footer/>

        </Providers>
      </body>
    </html>
  );
}