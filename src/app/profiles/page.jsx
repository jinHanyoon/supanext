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
    <section className="text-gray-600 body-font h-full">
       {loading &&<Loading />}
        <div className='w-full h-auto m-auto max-w-screen-2xl mx-auto p-4 md:py-8'>

    <div className={`w-1/3 min-w-72 max-w-64 h-96 bg-transparent  backdrop-blur-sm border rounded-3xl flex-col flex items-center justify-center mx-auto ${newName ? 'border-cyan-500':'border-gray-500'}`}>

        <div className='w-full  h-1/3  mt-3'>
     <div className='translate-y-28 w-1/5 mx-auto opacity-0'>
      <input
        type="file"
        onChange={handleProfileChange}
        className='opacity-1'
      />
      </div>
      <div className='relative pointer-events-none'>
        <Image src={NewPreview || userAvatar || '/img/img05.jpg'}  width={100} height={100} priority={true} alt="l" className={`w-28 h-28 p-1 rounded-full ring-2  mx-auto pointer-events-none ${newName ? 'ring-emerald-400 dark:ring-emerald-400':'ring-gray-500 dark:ring-gray-500'}`} />
<Image src={ImgIcon} width={30} height={30} alt="ImgIcon" className="block w-12 h-12  mx-auto text-sm text-gray-900 cursor-pointer pointer-events-none  pb-2.5 px-2 pt-1 -translate-y-10  box-border " />
      </div>
</div>


<div className='w-full h-1/3 flex flex-col justify-center items-center gap-4'>
    <p className={`text-center mt-5 font-medium ${
      newName ? 'text-gray-400 ' :  'text-cyan-500 '}`}
   >새로운 닉네임을 설정하세요.</p>
  
  <div>
  <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder={userName || newName}
        className={`text-center  inline-block bg-transparent border-b-2  text-white ${newName ? 'border-cyan-500':'border-gray-500 '}`}
      />
</div>
</div>

<div className='w-full  h-1/3 text-center mt-4'>
      <button className={`w-32 h-10 mx-auto rounded-lg border ${
      newName ? 'border-cyan-500 text-emerald-400' : 'border-gray-300 text-gray-400'}`}
 onClick={handleUpdateProfile}>Update Profile</button>
      </div>

      </div>

  </div>
  </section>
  )
}
