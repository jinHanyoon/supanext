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
    
      const userConfirmed = window.confirm("게시글을 올리겠습니까?");

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
      {loading && <Loading />}
      
      <div className='fixed  inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full z-40'>
        <div className='container max-w-2xl mx-auto px-4 py-16 pt-36'>
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden'>
            <div className='p-8'>
              <h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-6'>새 글 작성</h3>
              
              <input
                className="w-full px-4 py-3 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                placeholder="제목"
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
              />
              
              <div className="mb-6">
                <input 
                  onChange={handleFileChange} 
                  className="hidden" 
                  id="file-upload" 
                  type="file" 
                />
                <label 
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  <Image src={ImgIcon} width={20} height={20} alt="ImgIcon" className="mr-2" />
                  이미지 업로드
                </label>
              </div>
              
              {imgPreview && (
                <div className="mb-6">
                  <Image
                    src={imgPreview}
                    alt="Selected File"
                    className="w-full h-64 object-cover rounded-lg"
                    width={100} height={100}
                  />
                </div>
              )}
  
              <textarea 
                className="w-full px-4 py-3 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                placeholder="내용"
                rows="6"
                value={bodyValue} 
                onChange={(e) => setBodyValue(e.target.value)}
              />
  
              <div className='flex justify-end space-x-4'>
                <button
                  onClick={writing_hidden}
                  className='px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white text-sm font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition duration-300'
                >
                  취소
                </button>
                <button
                  onClick={writingSubmit}
                  className='px-6 py-3 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition duration-300'
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
