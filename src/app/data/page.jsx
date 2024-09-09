'use client';
import { useEffect, useState } from 'react';
import Image from "next/image";
import useUserSession from '../hooks/authdata'
import supabase from '../api/supabaseaApi';
import SkeletonCard from '../component/Skeleton/page';
import Link from 'next/link';

export default function Data() {
    const [pro, setData] = useState([]);
    const [dataShow, ShowData] = useState(false)
    const { userName } = useUserSession();
    const [Load, setLoad] = useState(true)

    const defaultAvatar = '/img/img04.jpg'; 
    useEffect(() => {
      async function dbCome() { 
        //  전체를 불러오기
        // data pro == >pro 에 data 를 할당 
          const { data: pro } = await 
          supabase.from('pro').select('*');
          setData(pro);
          setTimeout(() => {
            setLoad(false);
        }, 2000); // 2000ms = 2초
        }
        dbCome();
    },
   );

  //  async function dbCome() { 
  //   //  전체를 불러오기
  //   // data pro == >pro 에 data 를 할당 
  //     const { data: pro } = await 
  //     supabase.from('pro').select('*');
  //     setData(pro);
  //     setLoad(false)
  //   }
  //   dbCome();

    // const handleDelete = async (title, body) => {
    //   try {
    //     const {error} = await supabase.from('pro').delete().eq('title', title).eq('body', body);
    //   } catch (error) {
    //     console.log(error, '삭제 중 오류 발생')
    //   }

    //   setData(pro => pro.filter(item => item.title !== title || item.body !== body));
    // };


    // if (Load) {
    //   return (
        
    //   );
    // }
    

  return (
    <>
    {Load && 
    <>
    <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap gap-10">
      {[...Array(pro.length)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  </div>
  </>
    }    

{!Load && 
<div className="container px-5 py-24 mx-auto" >
        <div className="flex flex-wrap gap-10">
 {pro.map(pro => (
  <div key={pro.id} className="lg:w-1/4 md:w-1/2 p-4 w-full h-96  backdrop-blur-sm  rounded-2xl border-2 border-gray-500 duration-500 hover:border-cyan-600 ">
<Link href={`/details/${pro.id}`}>
  <div className="block relative h-48 rounded overflow-hidden">
    <Image 
      alt="DataImg" 
      src={pro.imgUrl || defaultAvatar}
      className="object-center w-full h-full block hover:opacity-50"
      width={300} 
      height={300}
    />

  </div>
</Link>
          <div className="mt-4">
            <h2 className="text-gray-100  text-xs tracking-widest title-font mb-1 flex items-center gap-4 h-14 border-b">
          <Image alt="avatar" src={pro.avatar || defaultAvatar}  width={40} height={30}  className='w-10 h-10 p-1 rounded-full ring-2 ring-gray-500 dark:ring-gray-500"'/>
             <p className='mt-6'>  {pro.username}
             </p>               
               </h2>
            <h3 className="text-gray-200 title-font text-lg font-extrabold">{pro.title}</h3>
            <p  className="mt-1 text-gray-400  ">{pro.body}</p>
          </div>
        </div>
))}
  

</div>
</div>
}

    </>

  );
}
