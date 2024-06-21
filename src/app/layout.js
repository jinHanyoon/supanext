import { Inter } from "next/font/google";
import Image from "next/image";
import Header from "./component/header";
import Footer from "./component/footer";

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
      
      <Header/>

  {children}
      
      <Footer/>
      </body>
    </html>
  );
}
