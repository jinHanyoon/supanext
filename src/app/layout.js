import { Inter } from "next/font/google";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { AuthProvider } from './component/auth/AuthProvider.jsx';
import Header from "./component/layout/header/header.jsx";
import Footer from "./component/layout/footer/footer.jsx";
import Sidebar from "./component/layout/sidebar/page.jsx";
export const dynamic = 'force-dynamic'
import css from "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export default  async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
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
        <main className="pb-24">
        <AuthProvider initialSession={session}>
            {children}
          </AuthProvider>
        </main>
        <Footer/>
      </body>
    </html>
  );
}