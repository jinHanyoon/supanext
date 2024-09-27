'use client';
import React from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import supabase from '../api/supabaseaApi';
import useUserSession from '../hooks/authdata'
import Loading from '../loading';

export default function Profiles() {
 const router = useRouter()
 const {userUUID, loggedIn, userName, userAvatar} = useUserSession();
 
 const [newName, setNewName] = useState(userName);
 const [newAvatarUrl, setNewAvatarUrl] = useState(userAvatar)
  const [NewPreview, setNewPreview] =useState('')
  const [loading, setLoading] = useState(false);


 
 useEffect(() => {
    if (!loggedIn) {
      router.push('/'); // 로그인되지 않았으면 홈 페이지로 리다이렉트
      return;
    } 


  },[loggedIn, router,userName, userAvatar]);

  const handleProfileChange = (e) => {
    const Profiles_file = e.target.files[0];
    if (Profiles_file) {
        setNewAvatarUrl(Profiles_file);
      const Profiles_fileURL = URL.createObjectURL(Profiles_file);
      setNewPreview(Profiles_fileURL); // 파일 URL을 상태에 저장
    }
  };
  const ImgIcon = '/img/img_icon.png'; 
  
  const handleUpdateProfile = async () => {
    
  // 사용자에게 확인을 요청
  const userConfirmed = window.confirm( 
   `닉네임이 ${newName || userName} ㅋㅋ`
  );

  if (!userConfirmed) {
    // 사용자가 "아니오"를 선택하면 아무 작업도 하지 않음
    return;
  }
  setLoading(true)
    let imgUrl = null;

    // 이미지가 선택된 경우 업로드 처리
    if (newAvatarUrl) {
      const fileExt = newAvatarUrl.name.split('.').pop();
      const fileName = `${userUUID}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${userUUID}/${fileName}`
      // 버킷 이름을 포함
      const { data: imgData, error: imgError } = await supabase.storage
        .from('avatars') // 버킷 이름이 정확한지 확인
        .upload(filePath, newAvatarUrl);
      if (imgError) {
        console.error("Error uploading image:", imgError);
        alert('이미지 업로드에 실패했습니다.');
        return; // 에러 발생 시 더 진행하지 않음
      }

      imgUrl = supabase.storage.from('avatars').getPublicUrl(filePath).data.publicUrl;
    }
      // 프로필 정보 업데이트
      const { error } = await supabase.from('profiles').update({ username:  newName || userName, avatar_url: imgUrl || userAvatar }).eq('id', userUUID);
      if (error) {
        alert('프로필 업데이트에 실패했습니다.', error);
        console.error('Error updating profile:', error);
        return
      }
      setNewPreview(imgUrl || userAvatar);
      setNewAvatarUrl(imgUrl || userAvatar);
      setNewName(newName);
      setLoading(false);
      alert(`${newName} 어서와 `);
    } 






    

  return (
<section className="bg-white min-h-screen py-12">
  {loading && <Loading />}
  <div className='container mx-auto px-4 sm:px-6 lg:px-8 mt-16'>
    <div className="max-w-md mx-auto bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="mb-8">
          <input
            type="file"
            onChange={handleProfileChange}
            className="hidden"
            id="profile-upload"
          />
          <label htmlFor="profile-upload" className="cursor-pointer block relative w-32 h-32 mx-auto">
            <Image 
              src={NewPreview || userAvatar || '/img/img05.jpg'}  
              width={128} 
              height={128} 
              priority={true} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover border-2 border-gray-200" 
            />
            <div className="absolute bottom-0 right-0 bg-emerald-400 rounded-full p-2 shadow-sm">
              <Image src={ImgIcon} width={16} height={16} alt="Upload" className="text-white" />
            </div>
          </label>
        </div>
        <p className={`text-center text-lg font-medium mb-4 ${
          newName ? 'text-gray-700' : 'text-emerald-600'
        }`}>
          새로운 닉네임을 설정하세요.
        </p>
        <div className="mb-6">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={userName || newName}
            className={`w-full text-center py-2 px-3 border-b bg-transparent text-gray-700 focus:outline-none focus:border-emerald-400 transition-all duration-300 ${
              newName ? 'border-emerald-400' : 'border-gray-300'
            }`}
          />
        </div>
        <button 
          className={`w-full py-2 px-4 rounded-md font-medium transition-all duration-300 ${
            newName 
              ? 'bg-emerald-400 text-white hover:bg-emerald-500' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          onClick={handleUpdateProfile}
          disabled={!newName}
        >
          Update Profile
        </button>
      </div>
    </div>
  </div>
</section>
  )
}
