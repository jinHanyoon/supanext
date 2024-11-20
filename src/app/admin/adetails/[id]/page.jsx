'use client'
import { useParams  } from 'next/navigation';
import { useEffect, useState } from 'react';
import supabase from '@/app/api/supabaseaApi';
import Image from "next/image";
import React from 'react'
import { useRouter } from 'next/navigation';
import DetailSkeleton from '@/app/component/ui/adDetailskeleton/page';

export default function AdetailsPage() {
  const { id } = useParams();
  const [Post, setPost]= useState([])
  const [Modal, setModal] = useState(false);
  const [skeOut, setSkeOut] = useState(false);

  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const defaultAvatar = '/img/img04.jpg'; 
  const router =useRouter()
  
  const handleImageClick = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };


  useEffect(() => {
    let mounted = true;

    if (id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const { data, error } = await supabase
              .from('mypost')
              .select('*')
              .eq('id', id)
              .single();

          if (error) throw error;

          if (mounted) {
              setSkeOut(true);
              setTimeout(() => {
                  if (mounted) {  // setTimeout 내부에서도 mounted 체크
                      setPost(data || []);
                      setLoading(false);
                      setSkeOut(false);
                  }
              }, 300);
          }
      } catch (error) {
          console.error('데이터 로딩 중 에러:', error);
          if (mounted) {
              setLoading(false);
          }
      }

    }


      fetchData();
      return () => {
        mounted = false;
    }
    }
  }, [id]);


  const handleDelete = async () => {
    const userConfirmed = window.confirm("삭제하시겠습니까?");
    if (!userConfirmed) return;

    try {
      if (Post.imgUrl) {
        const filePath = Post.imgUrl.split('/public/')[1];
        console.log('삭제할 파일 경로:', filePath);
        
        const { data, error: storageError } = await supabase
          .storage
          .from('admin_storage')
          .remove([filePath]);

        console.log('삭제 요청 결과:', data);
        if (storageError) {
          console.error('스토리지 삭제 에러:', storageError);
          throw storageError;
        }
      }

      // 게시글 삭제
      const { error } = await supabase
        .from('mypost')
        .delete()
        .eq('id', Post.id);

      if (error) throw error;

      alert("삭제완료!");
      router.push('/admin');
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <div className="container px-4 pt-24 pb-16 mx-auto max-w-4xl relative z-10">
        {loading ? (
            <div className={`transition-opacity duration-300 ${
              skeOut ? 'opacity-0' : 'opacity-100'
          }`}>
              <DetailSkeleton />
          </div>
        ) : (
          <div className="rounded-xl shadow-lg overflow-hidden border border-gray-200 animate-detail_opacity">
            {/* 기존 내용 */}
            <div className="p-6 md:p-8">
              <div className='flex justify-between items-center border-b border-gray-200 pb-4 mb-6'>
                <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>{Post.title || '제목없음'}</h1>
              </div>
              <div className='space-y-6'>
                <div className="relative aspect-[3/2] w-full">
                  <Image 
                    alt="DataImg" 
                    src={Post.imgUrl || defaultAvatar}
                    className="w-full h-auto rounded-lg shadow-md"
                    loading="eager"
                    priority
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    onClick={handleImageClick}
                  />
                </div>
                <div className='text-gray-700 text-lg leading-relaxed whitespace-pre-wrap'>
                  {Post.body}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

  {Modal && (
  <div 
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50"
    onClick={closeModal}
  >
    <div className="relative w-[95vw] h-[95vh] flex items-center justify-center">
      <Image 
        src={Post.imgUrl || defaultAvatar} 
        alt="Enlarged Image" 
        className="object-contain w-full h-full rounded-lg shadow-2xl"
        layout="fill"
        quality={100}
      />
      <button 
        onClick={(e) => {
          e.stopPropagation();
          closeModal();
        }}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 transition-colors duration-200 bg-black bg-opacity-50 rounded-full p-2 sm:p-3 z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
)}
</>
  )
}
