'use client';
import { useEffect, useState } from 'react';
import Image from "next/image";
import supabase from '@/app/api/supabaseaApi';
import SkeletonCard from '../../component/ui/Skeleton/page';
import Link from 'next/link';
import '../../globals.css'; // CSS 파일을 임포트합니다.
/**
 * Data 컴포넌트: 프로젝트 데이터를 표시하는 메인 페이지

 * @returns {JSX.Element} 렌더링된 Data 컴포넌트
 */
export default function Data() {
    // 상태 변수들
    const [pro, setData] = useState(null); // 프로젝트 데이터를 저장하는 상태
    const [Load, setLoad] = useState(true); // 로딩 상태를 나타내는 상태
    const [isGridView, setIsGridView] = useState(true); // 그리드 뷰 여부를 결정하는 상태
    const [fadeOut, setFadeOut] = useState(false); // 페이드 아웃 애니메이션 상태
    const defaultAvatar = '/img/img04.jpg'; // 기본 아바타 이미지 경로
    useEffect(() => {
      let mounted = true;
      let channel = null;
  
      // 이미 존재하는 채널 확인
      const existingChannel = supabase.getChannels().find(ch => ch.topic === 'realtime:pro');
      
      async function dbCome() {
          if (!mounted) return;
        // 컴포넌트 생명주기 X 일 경우 함수 중단
        // if (!mounted) return; 밑에 코드 실행 X

          try {
              const { data, error } = await supabase
                  .from('pro')
                  .select('*')
                  .order('create_at', { ascending: false });
  
              if (error) throw error;
              if (mounted) {
                  setData(data.map(item => ({ ...item, fadeIn: true })));
                  setLoad(false);
              }
          } catch (error) {
              console.error('데이터 로딩 실패:', error);
              if (mounted) setLoad(false);
          }
      }
  
      dbCome();
  
      // 채널이 없을 때만 새로 생성
      if (!existingChannel) {
          console.log('새로운 채널 생성...');
          channel = supabase.channel('pro')
              .on('postgres_changes', { event: '*', schema: 'public', table: 'pro' }, payload => {
                  if (!mounted) return;
                  
                  switch (payload.eventType) {
                      case 'INSERT':
                          setData(prevData => prevData ? [{ ...payload.new, animate: true }, ...prevData] : [{ ...payload.new, animate: true }]);
                          break;
                      case 'UPDATE':
                          setData(prevData => prevData ? prevData.map(item => item.id === payload.new.id ? payload.new : item) : []);
                          break;
                      case 'DELETE':
                          setData(prevData => prevData ? prevData.filter(item => item.id !== payload.old.id) : []);
                          break;
                  }
              })
              .subscribe((status) => {
                  console.log('새 채널 상태:', status);
              });
      } else {
          console.log('기존 채널 사용 중...');
          channel = existingChannel;
      }
  

      // 클린업 함수 
      // 페이지 이동하면 mounted false 로 변환 
      // ==> 위에 함수 실행 X
      return () => {
          mounted = false;
          // 다른 컴포넌트에서도 채널을 사용중일 수 있으므로, 
          // 완전히 새로 만든 채널일 때만 정리
          if (channel && !existingChannel) {
              console.log('새로 만든 채널 정리...');
              supabase.removeChannel(channel);
          }
      };
  }, []);



  return (
    <>
      <div className="container px-4 py-12 mx-auto pt-24">
        {/* 그리드/리스트 뷰 토글 버튼 */}
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
          // 로딩 중 스켈레톤 UI 표시
          <div className={`grid ${
            isGridView 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          } gap-4 sm:gap-6 md:gap-8 ${fadeOut ? 'fade-out' : ''}`}>
            {[...Array(8)].map((_, index) => (
              <SkeletonCard key={index} isGridView={isGridView} />
            ))}
          </div>
        ) : (
          // 데이터 로드 완료 후 프로젝트 카드 표시
          <div className={`grid ${
            isGridView 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          } gap-4 sm:gap-6 md:gap-8`}>
            {pro.map(pro => (
<div key={pro.id} className={`bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
  isGridView ? 'flex flex-col' : 'flex flex-row h-full'
} ${pro.fadeIn ? 'load' : ''} ${pro.animate ? 'insert-in' : ''}`}>
                <Link href={`/data/details/${pro.id}`} className={isGridView ? 'block w-full relative' : 'flex-shrink-0 w-1/3 sm:w-1/4'}>
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
                        {new Date(pro.create_at).toLocaleString('ko-KR', {timeZone: 'Asia/Seoul',})}
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
