
'use client'
import Image from "next/image";
import { useData } from '../hooks/page';
import Loading from "../loading";

export default function About() {
    const  { pro, page02 } = useData();

    console.log(page02, pro)

    if (!pro || pro.length === 0) {
        return <Loading/>
      }

  return (
    <>
    {/* <h1>{pro[2].title}</h1> */}
    {/* <Writing/> */}
    <section className="text-gray-600 body-font h-100vh w-full">
    <div className="container px-5 py-24 mx-auto w-full" >
    <div className=" w-full flex flex-wrap gap-2 justify-center">
        <div className="lg:w-5/12 md:w-1/2 block">
            <Image className="object-cover object-center w-full h-full block rounded-lg hover:opacity-60" src="/img/img_03.jpg" alt="우주" width={300} height={300}></Image>
        </div>
        <div className="lg:w-5/12 md:w-1/2 block">
            <Image className="object-cover object-center w-full h-full block rounded-lg hover:opacity-60" src="/img/img_05.jpg" alt="우주"  width={300} height={300}></Image>
        </div>
        <div className="lg:w-5/12 md:w-1/2 block">
            <Image className="object-cover object-center w-full h-full block rounded-lg hover:opacity-60" src="/img/img04.jpg" alt="우주"  width={300} height={300}></Image>
        </div>
        <div className="lg:w-5/12 md:w-1/2 block">
            <Image className="object-cover object-center w-full h-full block rounded-lg hover:opacity-60" src="/img/img_06.jpg" alt="우주"  width={300} height={300}></Image>
        </div>
    </div>
 
        
          
           </div>

</section>

    </>
  );
}
