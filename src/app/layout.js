import { Inter } from "next/font/google";
import Image from "next/image";

import css from "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "project",
  description: "jinHan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
