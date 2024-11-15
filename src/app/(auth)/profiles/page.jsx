'use client';
import React from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import supabase from '@/app/api/supabaseaApi'
import { useUserSession } from '@/app/hooks/authdata';
import Loading from '../../loading';
import Link from 'next/link';
import MyList from './mylist/page'
import MyComment from './mycomment/page'

export default function Profiles() {
 const router = useRouter()
 const {userUUID, loggedIn, userName, userAvatar} = useUserSession();

 const [newName, setNewName] = useState(userName);
 const [newAvatarUrl, setNewAvatarUrl] = useState(userAvatar)
  const [NewPreview, setNewPreview] =useState('')
  const [loading, setLoading] = useState(false);



//  useEffect(() => {

// // userUUID 를 받고 있으니 의존성 배열에 추가
//   },[loggedIn,userUUID,userAvatar,userName]);



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
   ` ${newName || userName} 로 변경하시겠습니까?`
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
      // setNewName(newName);
      setLoading(false);
      alert(`${newName} 어서와 `);
    } 

    const handleDeleteAccount = async () => {

      if (userUUID === '258609e2-b70f-4989-9b3d-8326cb42c2bd') {
        alert('이 계정은 삭제할 수 없습니다.');
        return;
      }

      const userConfirmed = window.confirm("정말로 계정을 삭제하시겠습니까?.");
      
      if (!userConfirmed) return;
    
      setLoading(true);
      
      try {
        // Supabase RPC 호출 방식 수정
        const { data, error } = await supabase
          .from('profiles')
          .delete()
          .eq('id', userUUID);

        if (error) throw error;

        const { error: rpcError } = await supabase
          .rpc('delete_user');

        if (rpcError) throw rpcError;
        const { error: signOutError } = await supabase.auth.signOut();
        if (signOutError) throw signOutError;
        alert('계정이 성공적으로 삭제되었습니다.');
        router.push('/');
      } catch (error) {
        console.error('Error:', error);
        alert('계정 삭제 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };



  return (
<section className="bg-gray-50 min-h-screen py-8 sm:py-16">
  {loading && <Loading />}
  <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-12 md:pt-4'>
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 mb-8 sm:mb-12">
      <div className="p-6 sm:p-12 flex flex-col sm:flex-row items-center sm:items-start sm:justify-between">
        <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
          <input
            type="file"
            onChange={handleProfileChange}
            className="hidden"
            id="profile-upload"
          />
          <label htmlFor="profile-upload" className="cursor-pointer block relative w-32 h-32 sm:w-48 sm:h-48 mx-auto">
            <Image 
              src={NewPreview || userAvatar || '/img/img05.jpg'}  
              width={192} 
              height={192} 
              priority={true} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover border-4 sm:border-6 border-emerald-400" 
            />
            <div className="absolute bottom-0 right-0 bg-emerald-400 rounded-full p-2 sm:p-3 shadow-md">
              <Image src={ImgIcon} width={20} height={20} alt="Upload" className="text-white" />
            </div>
          </label>
        </div>
        <div className="w-full sm:w-2/3 sm:pl-12">
          <p className={`text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center sm:text-left ${
            newName ? 'text-gray-800' : 'text-emerald-600'
          }`}>
            새로운 닉네임을 설정하세요.
          </p>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={userName || newName}
            className={`w-full py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg rounded-lg sm:rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-emerald-400 ${
              newName ? 'border-emerald-400' : 'border-gray-300'
            }`}
          />
          <button 
            className={`w-full mt-4 sm:mt-6 py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg ${
              newName 
                ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            onClick={handleUpdateProfile}
            disabled={!newName}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">

    <MyList userUUID={userUUID}/>
    <MyComment userUUID={userUUID}/>
            </div>
  </div>
  <button 
  className="w-full mt-4 sm:mt-6 py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg bg-red-500 text-white hover:bg-red-600"
  onClick={handleDeleteAccount}
>
  회원 탈퇴
</button>

</section>
  )
}