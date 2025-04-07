'use client'
import Image from "next/image";
import Data from "./(main)/data/page"
import Admin from "./admin/page";


export default function Home() {

  
  return (
    <section className="text-gray-600 body-font h-100vh">
           <Admin/>

    </section>

  );
}
