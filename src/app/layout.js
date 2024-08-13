import { Inter } from "next/font/google";
import Image from "next/image";
import Header from "./component/header/header";
import Footer from "./component/footer/footer";
import Sidebar from "./component/sidebar/page"

import css from "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dev JinHan",
  description: "jinHan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body>
      <Header/>
      <Sidebar/>         

  {children}
      
      <Footer/>
      </body>
    </html>
  );
}
