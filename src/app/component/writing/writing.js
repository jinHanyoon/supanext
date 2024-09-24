'use client';
import Image from "next/image";
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import LoginForm from "../../login/loginForm";
import supabase from '../../api/supabaseaApi';
import useUserSession from '../../hooks/authdata';
import Loading from '../../loading';



export default function Writing({writing_hidden}) {
  const { userName } = useUserSession();
  const { userUUID } = useUserSession();
  const { userAvatar } = useUserSession();

    const [pro, setData] = useState([]);
    const [message, setMessage] = useState('');
    const [titleValue, setTitleValue] = useState('');
    const [bodyValue, setBodyValue] = useState('');

    const [newImg, setNewImg] = useState(null); // 이미지 파일을 저장할 state
      const [imgPreview, setImgPreview] = useState(''); // 이미지 미리보기를 위한 state
      const [loading, setLoading] = useState(false);



    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setNewImg(file);
        const fileURL = URL.createObjectURL(file);
        setImgPreview(fileURL); // 파일 URL을 상태에 저장
      }
    };

    const ImgIcon = '/img/img_icon.png'; 


    const writingSubmit = async () => {
    
      const userConfirmed = window.confirm("올린다?");

  if (!userConfirmed) {
    // 사용자가 "아니오"를 선택하면 아무 작업도 하지 않음
    return;
  }
  setLoading(true)
      try {
        let imgUrl = null;

        // 이미지가 선택된 경우 업로드 처리
        if (newImg) {
          const fileExt = newImg.name.split('.').pop();
          const fileName = `${userUUID}-${Date.now()}.${fileExt}`;
          const filePath = `test_img/${userUUID}/${fileName}`
          // 버킷 이름을 포함
          const { data: imgData, error: imgError } = await supabase.storage
            .from('test_img') // 버킷 이름이 정확한지 확인
            .upload(filePath, newImg);
          if (imgError) {
            console.error("Error uploading image:", imgError);
            alert('이미지 업로드에 실패했습니다.');
            return; // 에러 발생 시 더 진행하지 않음
          }
          imgUrl = supabase.storage.from('test_img').getPublicUrl(filePath).data.publicUrl;
        }
        // Supabase로부터 응답을 받을 때, data와 error를 구분해서 받는다.
        const { data, error } = await supabase.from('pro').insert([{ title: titleValue, body: bodyValue, username:userName, avatar:userAvatar, imgUrl: imgUrl, }]);
        // 에러가 발생한 경우 바로 콘솔에 출력하고 함수를 종료한다.
        if (error) {
          console.error("Error inserting data:", error.message);
          alert('오류가 발생했습니다. 다시 시도해주세요.');
          return;  // 더 이상 진행하지 않고 함수를 종료한다.
        }
        // 데이터가 성공적으로 삽입된 경우, 새로운 데이터를 state에 반영한다.
        setData((prevData) => [...prevData, ...data]);
        // 입력 필드 초기화
        setTitleValue('');
        setBodyValue('');
        writing_hidden();
        alert('생성완료');
  setLoading(false)

      } catch (error) {
        // 그 외의 예상치 못한 에러를 처리한다.
        console.error("Unexpected error:", error.message);
        alert('예상치 못한 오류가 발생했습니다. 다시 시도해주세요.');
      }
    };
    return (
    <>
  {loading &&<Loading />}
     

        <div className='bg-slate-900/80 w-full h-screen fixed z-40 top-32 ' >
          <div className='w-9/12 max-w-md h-full m-auto relative flex flex-col items-end '  >
      <div className='absolute top-14 right-2 w-8 h-1/10 border-rose-700 border rounded-full text-center font-bold text-white leading-loose z-10' onClick={writing_hidden}>X</div>

          <input
            className="block  p-2.5 w-full text-sm text-white  dark:placeholder-gray-900 dark:text-white  mt-12 bg-blue-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 focus:outline-none focus:ring-2  focus:ring-gray-400"
            placeholder="제목"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />




        <div className=" relative  h-96 w-full  text-sm text-white focus:outline-none focus:ring focus:ring-gray-400 dark:placeholder-gray-400 dark:text-white  mt-1  bg-blue-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 overflow-scroll overflow-x-hidden overflow-y-hidden">
        <input  onChange={handleFileChange} className="block w-14 text-sm text-gray-900 cursor-pointer pb-2.5 px-2 pt-1  h-8 box-border opacity-0 " type="file"/>
<Image src={ImgIcon} width={30} height={30} alt="ImgIcon" className="block w-10 h-10  text-sm text-gray-900 cursor-pointer pointer-events-none  pb-2.5 px-2 pt-1  box-border absolute top-0 -z-10" />
       
{imgPreview && (
              <Image
                src={imgPreview}
                alt="Selected File"
                className="mt-2 w-10/12 h-auto object-contain m-auto rounded-xl  max-h-48"
                width={100} height={50}
              />
            )}

          <textarea className="w-full h-5/6 p-2.5  text-sm text-white focus:outline-none  dark:placeholder-gray-400 dark:text-white  mt-1  bg-transparent rounded-md"
            placeholder="내용"
            value={bodyValue} 
            onChange={(e) => setBodyValue(e.target.value)}
          />



  </div>

          <div onClick={writingSubmit} className='text-emerald-400 text-center border border-cyan-500  w-20 mt-3 rounded-md h-10 py-2'>저장</div>
          </div>
        </div>

    </>


  );
}
