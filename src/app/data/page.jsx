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
    const [isGridView, setIsGridView] = useState(true);

    const defaultAvatar = '/img/img04.jpg'; 

    useEffect(() => {
      async function dbCome() { 
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
    },[pro]);

  return (
    <>
      <div className="container px-4 py-12 mx-auto pt-24">
        <div className="flex justify-end mb-6">
          <div className="bg-white rounded-full p-1 shadow-md">
            <button
              onClick={() => setIsGridView(true)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                isGridView ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Grid View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                !isGridView ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="List View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        {Load ? (
  <div className={`grid ${
    isGridView 
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
      : 'grid-cols-1'
  } gap-4 sm:gap-6 md:gap-8`}>
    {[...Array(8)].map((_, index) => (
      <SkeletonCard key={index} isGridView={isGridView} />
    ))}
  </div>
        ) : (
<div className={`grid ${
  isGridView 
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
    : 'grid-cols-1'
} gap-4 sm:gap-6 md:gap-8`}>
  {pro.map(pro => (
    <div key={pro.id} className={`bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
      isGridView ? 'flex flex-col' : 'flex flex-row h-full'
    }`}>
      <Link href={`/details/${pro.id}`} className={isGridView ? 'block w-full relative' : 'flex-shrink-0 w-1/3 sm:w-1/4'}>
        <div className={`relative ${
          isGridView 
            ? 'aspect-[4/3]' 
            : 'w-full pt-[100%]'
        }`}>
          <Image 
            alt="DataImg" 
            src={pro.imgUrl || defaultAvatar}
            fill
            sizes={isGridView 
              ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              : "100vw"
            }
            className={`object-cover ${isGridView ? 'rounded-t-lg sm:rounded-t-xl' : 'rounded-l-lg sm:rounded-l-xl '}`}
          />
        </div>
      </Link>
      <div className={`p-4 sm:p-5 ${isGridView ? 'flex-grow' : 'flex-grow w-2/3 sm:w-3/4 flex flex-col justify-between'}`}>
        {isGridView ? (
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2">{pro.title}</h3>
        ) : (
          <>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 hover:text-emerald-600 transition-colors duration-300">{pro.title}</h3>
            <p className="text-gray-600 mb-2 line-clamp-2">{pro.body}</p>
          </>
        )}
        <div className={`flex items-center ${isGridView ? 'mt-2' : 'mt-auto'}`}>
          <div className="w-8 h-8 relative mr-3">
            <Image 
              alt="avatar" 
              src={pro.avatar || defaultAvatar}  
              fill
              sizes="150px"
              className="rounded-full object-cover border-2 border-emerald-400"
            />
          </div>
          <div>
            <span className="text-gray-800 text-sm font-medium">{pro.username}</span>
            <p className="text-gray-500 text-sm mt-1">
            {pro.create_at.split(' ').slice(0, 3).join(' ').replace(/\./g, '')
    .replace(/(\d{4}) (\d{1,2}) (\d{1,2})/, (match, year, month, day) => 
      `${year} ${month.padStart(2, '0')}.${day.padStart(2, '0')}`
    )}
            </p>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
        )}
      </div>
    </>
  );
}