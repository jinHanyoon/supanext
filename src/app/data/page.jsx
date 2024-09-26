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
          supabase.from('pro').select('*').order('create_at',{ascending:false});
          const proWithKoreanTime = pro.map(item => ({
            ...item,
            create_at: new Date(item.create_at).toLocaleString('ko-KR', {
              timeZone: 'Asia/Seoul',
            }),
          }));
          setData(proWithKoreanTime);
          setTimeout(() => {
            setLoad(false);
        }, 2000); // 2000ms = 2초
        }
        dbCome();
    },[pro]
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

{!Load && (
        <div className="container px-5 py-24 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {pro.map(pro => (
              <div key={pro.id} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <Link href={`/details/${pro.id}`}>
                  <div className="relative w-full h-48">
                    <Image 
                      alt="DataImg" 
                      src={pro.imgUrl || defaultAvatar}
                      fill
                      className="object-cover p-2"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pro.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{pro.body}</p>
                  <div className="flex items-center">
                    <div className="w-6 h-6 relative mr-2">
                      <Image 
                        alt="avatar" 
                        src={pro.avatar || defaultAvatar}  
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <span className="text-gray-700 text-sm">{pro.username}</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">{pro.create_at}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </>

  );
}
