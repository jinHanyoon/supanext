
'use client'
import { useParams  } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Loading from '../../loading'
import supabase from '@/app/api/supabaseaApi';
import UserUUID from '../../hooks/authdata'
import Comment from '@/app/component/commnet/page';

export default function DetailsPage() {
  const [TargetData, setProData] = useState([])
  const [loading, setLoading] = useState(false);
  const [fixComplete, setComplete] = useState(false)
  const defaultAvatar = '/img/img04.jpg'; 
  const UndefineText = "-"
  const router = useRouter()
  const {userUUID} =UserUUID()
  const [Modal, setModal] = useState(false);

  const handleImageClick = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };


  // url 에서 게시물 id 가져올 때 사용
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const { data: proData } = await supabase
          .from('pro')
          .select('*')
          .eq('id', id)  // id에 해당하는 데이터를 가져옴
          .single();
        setProData(proData)
      };
      fetchData();
    }
  }, [id]);

  // if(userUUID == TargetData.user_id){
  //   setComplete(true)
  // }else{
  //   setComplete(false)
  // }

  useEffect(() => {
    if (TargetData && userUUID) {
      setComplete(userUUID === TargetData.user_id);
    }
  }, [TargetData, userUUID]);

  const handleDelete = async (title, body) => {
    const userConfirmed = window.confirm("삭제할꺼야?");
  if (!userConfirmed) {
    return;
  }
  setLoading(true)
    try {
      const {error} = await supabase.from('pro').delete().eq('title', title).eq('body', body);

    } catch (error) {
      console.log(error, '삭제 중 오류 발생')
    }
    finally {
      alert("삭제완료!")
      router.push('/')
      setLoading(false);
    }



  };



 
  

  return (
<>
  {loading && <Loading />}

  <div className="container px-4 pt-24 pb-16 mx-auto max-w-4xl relative z-10">
    <div className=" rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="p-6 md:p-8">
        <div className='flex justify-between items-center border-b border-gray-200 pb-4 mb-6'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>{TargetData.title || UndefineText}</h1>
          {fixComplete && (
            <button 
              onClick={() => handleDelete(TargetData.title, TargetData.body)} 
              className="text-red-500 hover:text-red-600 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className='space-y-6'>
          <div>
            <Image 
              alt="DataImg" 
              src={TargetData.imgUrl || defaultAvatar}
              className="w-full h-auto rounded-lg shadow-md"
              width={600} 
              height={400}
              onClick={handleImageClick}
            />
          </div>
          <div className='text-gray-700 text-lg leading-relaxed'>
            {TargetData.body}
          </div>
        </div>
      </div>
    </div>

    <div className="mt-10">
      <Comment />
    </div>
  </div>

  {Modal && (
  <div 
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50"
    onClick={closeModal}
  >
    <div className="relative w-[95vw] h-[95vh] flex items-center justify-center">
      <Image 
        src={TargetData.imgUrl || defaultAvatar} 
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
  );
}