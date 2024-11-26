'use client';
import { useEffect, useState } from 'react';
import Image from "next/image";
import supabase from '@/app/api/supabaseaApi';
import SkeletonCard from '../../component/ui/Skeleton/page';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import 'react-markdown-editor-lite/lib/index.css';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
export default function Data() {
    const [pro, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isGridView, setIsGridView] = useState(true);
    const [skeOut, setSkeOut] = useState(false);
    const defaultAvatar = '/img/img04.jpg';

    useEffect(() => {
        let mounted = true;
        let channel = null;

        async function dbCome() {
            if (!mounted) return;

            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('pro')
                    .select('*')
                    .order('create_at', { ascending: false });

                if (error) throw error;
                if (mounted) {
                    setSkeOut(true);
                    setTimeout(() => {
                        setData(data);
                        setLoading(false);
                        setSkeOut(false);
                    }, 300);
                }
            } catch (error) {
                console.error('Error:', error);
                if (mounted) {
                    setLoading(false);
                    setTimeout(() => mounted && dbCome(), 3000);
                }
            }
        }

        dbCome();

        channel = supabase.channel('realtime-pro')
            .on('postgres_changes', 
                { event: '*', schema: 'public', table: 'pro' }, 
                payload => {
                    if (!mounted) return;
                    
                    switch (payload.eventType) {
                        case 'INSERT':
                            setData(prevData => [{ ...payload.new, animate: true }, ...prevData]);
                            break;
                        case 'UPDATE':
                            setData(prevData => prevData.map(item => 
                                item.id === payload.new.id ? { ...payload.new, animate: true } : item
                            ));
                            break;
                        case 'DELETE':
                            setData(prevData => prevData.filter(item => item.id !== payload.old.id));
                            break;
                    }
                }
            )
            .subscribe();

        return () => {
            mounted = false;
            if (channel) supabase.removeChannel(channel);
        };
    }, []);


    const extractFirstImageUrl = (markdown) => {
        const imgRegex = /!\[.*?\]\((.*?)\)/;
        const match = markdown.match(imgRegex);
        return match ? match[1] : null;
    };
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

                {loading ? (
    <div className={`grid ${
      isGridView 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      } gap-4 sm:gap-6 md:gap-8 transition-opacity duration-300 ${
          skeOut ? 'opacity-0' : 'opacity-100'
      } min-h-[500px]`}>  {/* min-h-[500px] 추가 */}
      {[...Array(8)].map((_, index) => (
          <SkeletonCard key={index} isGridView={isGridView} />
      ))}
  </div>
) : (
  <div className={`grid ${
      isGridView 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      } gap-4 sm:gap-6 md:gap-8 min-h-[500px]`}>
                        {pro.map((item, index) => (
                            <div 
                                key={item.id} 
                                className={`bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 animate-admin_posX ${
                                    isGridView ? 'flex flex-col' : 'flex flex-row h-full'
                                }`}
                                style={{ 
                                    animationDelay: `${index * 0.1}s`,
                                    opacity: 0
                                }}
                            >
                                <Link  prefetch={true} 
                                   onClick={(e) => {
                                    e.stopPropagation();  // 이벤트 전파 중단
                                }}
                                href={`/data/details/${item.id}`} className={isGridView ? 'block w-full relative' : 'flex-shrink-0 w-1/3 sm:w-1/4'}>
                                    <div className={`relative ${
                                        isGridView 
                                            ? 'aspect-[4/3]' 
                                            : 'w-full pt-[100%]'
                                    }`}>
                                      <Image 
                alt="DataImg" 
                src={item.imgUrl || extractFirstImageUrl(item.body) || defaultAvatar}
                fill
                priority={index === 0}  // 첫 번째 이미지에만 priority 적용
                loading={index === 0 ? "eager" : "lazy"}
                sizes={isGridView 
                    ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    : "100vw"
                }
                className={`object-cover ${isGridView ? 'rounded-t-lg sm:rounded-t-xl' : 'rounded-l-lg sm:rounded-l-xl'}`}
            />
                                    </div>
                                </Link>
                                <div className={`p-4 sm:p-5 ${isGridView ? 'flex-grow' : 'flex-grow w-2/3 sm:w-3/4 flex flex-col justify-between'}`}>
                                    {isGridView ? (
                                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2">{item.title}</h3>
                                    ) : (
                                        <>
                                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 hover:text-emerald-600 transition-colors duration-300">{item.title}</h3>
                                           
                                            <ReactMarkdown 
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                     className="text-gray-600 mb-2 line-clamp-2"
                                >
                                            {item.body}
                                      </ReactMarkdown>
                                        </>
                                    )}
                                    <div className={`flex items-center ${isGridView ? 'mt-2' : 'mt-auto'}`}>
                                        <div className="w-11 h-11 relative mr-3">
                                            <Image 
                                                alt="avatar" 
                                                src={item.avatar || defaultAvatar}
                                                fill
                                                loading="eager"
                                                sizes="100%"
                                                className="rounded-full object-cover border-2 border-emerald-400"
                                            />
                                        </div>
                                        <div>
                                            <span className="text-gray-700 text-sm font-black">{item.username}</span>
                                            <p className="text-gray-500 text-sm ">
                                            {new Date(item.create_at).toLocaleDateString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
})}
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