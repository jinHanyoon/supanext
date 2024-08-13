'use client';
import Image from "next/image";
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import LoginForm from "../../login/loginForm";
import supabase from '../../api/supabaseaApi';
import useUserSession from '../../hooks/authdata';



export default function Writing({writing_hidden}) {
  const { userName } = useUserSession();
  const { userUUID } = useUserSession();
  const { userAvatar } = useUserSession();

    const [pro, setData] = useState([]);
    const [message, setMessage] = useState('');
    const [titleValue, setTitleValue] = useState('');
    const [bodyValue, setBodyValue] = useState('');
    const [image, setImage] = useState(null); // 이미지 파일을 저장할 state

    const handleFileChange = (e) => {
      setImage(e.target.files[0]); // 선택한 파일을 state에 저장
    };

    const writingSubmit = async () => {
      try {
        let imgUrl = null;

        // 이미지가 선택된 경우 업로드 처리
        if (image) {
          const fileExt = image.name.split('.').pop();
          const fileName = `${userUUID}-${Date.now()}.${fileExt}`;
          const filePath = `test_img/${userUUID}/${fileName}`
          // 버킷 이름을 포함
          const { data: imgData, error: imgError } = await supabase.storage
            .from('test_img') // 버킷 이름이 정확한지 확인
            .upload(filePath, image);
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
      } catch (error) {
        // 그 외의 예상치 못한 에러를 처리한다.
        console.error("Unexpected error:", error.message);
        alert('예상치 못한 오류가 발생했습니다. 다시 시도해주세요.');
      }
    };






    return (
    <>
  
     

        <div className='bg-neutral-500/50 w-full h-screen fixed z-50 top-0' >
          <div className='w-9/12 max-w-md h-full m-auto relative flex flex-col items-end'  >
      <div className='absolute top-14 right-2 w-8 h-1/10 bg-rose-400 hover:bg-rose-500 rounded-full text-center font-bold text-white leading-loose' onClick={writing_hidden}>X</div>

          <input
            className="block  p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-12 "
            placeholder="제목"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
          <textarea
            className="block p-2.5 h-96 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
            placeholder="내용"
            value={bodyValue} 
            onChange={(e) => setBodyValue(e.target.value)}
          />

<input
  type="file"
  onChange={handleFileChange}
  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300"
/>

          <div onClick={writingSubmit} className='text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20 mt-3'>저장</div>
          </div>
        </div>

    </>


  );
}
