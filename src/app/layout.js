import { Inter } from "next/font/google";
import Image from "next/image";
import Header from "./component/header";
import Footer from "./component/footer";
import Writing from "./component/writing";
import Singup from'./pages/signup'
import Login from'./pages/login'

import css from "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "project",
  description: "jinHan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body>
      
        {/* <Singup/> */}
        {/* <Login/> */}
      <Header/>
      <Writing/>

  {children}
      
      <Footer/>
      </body>
    </html>
  );
}
