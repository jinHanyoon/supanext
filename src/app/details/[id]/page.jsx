
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
    {loading && <Loading/>}

    <div className="container px-5 py-24 mx-auto">
      <div className="w-9/12 mx-auto">
      <div className='flex justify-between mx-auto w-full max-w-5xl   border-b-gray-400  border-b-4 border-double '>
      <h1 className='h-11 text-4xl  text-white'>{TargetData.title ||UndefineText }</h1>
    {fixComplete &&(
      <div onClick={() => handleDelete(TargetData.title, TargetData.body)} className="text-white text-3xl font-bold ">x</div>
    )}
      </div>
      <div className='w-full max-w-5xl mt-16 text-center  mx-auto' >
      <Image 
      alt="DataImg" 
      src={TargetData.imgUrl || defaultAvatar}
      className="object-center w-full h-full block"
      width={700} 
      height={600}
      onClick={handleImageClick}
    />
    <div className='text-white mt-10'>
      {TargetData.body}
    </div>
    </div>

    </div>

<Comment/>
  

    </div>

    {Modal && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
          onClick={closeModal}
        >
          <div className="relative">
            <Image 
              src={TargetData.imgUrl || defaultAvatar} 
              alt="Enlarged Image" 
              className="max-w-full max-h-full"
              width={1600} 
              height={700}
            />
          </div>
        </div>
      )}


    </>
  );
}