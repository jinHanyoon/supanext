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
        <meta property="og:title" content="Space world" />
        <meta property="og:description" content="Start" />
        <meta property="og:image" content="/main_img.jpg" />
        <meta property="og:url" content="https://ext005552.vercel.app/" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className="bg-stone-100 relative min-h-screen pb-[60px]">
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