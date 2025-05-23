'use client';
import Image from "next/image";
import { useEffect, useState } from 'react';
import supabase from '@/app/api/supabaseaApi';
import { useSession } from '@/app/providers/SessionProvider';
import Loading from '../../loading';
import { useRouter } from 'next/navigation'

export default function Writing() {
  
  const router = useRouter()


  const session = useSession();
  const { userName, userUUID, userAvatar } = session || {};
  const [titleValue, setTitleValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');
  const [newImg, setNewImg] = useState(null);
  const [imgPreview, setImgPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdminPost, setIsAdminPost] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!session) {
      console.log('세션 없음');
    } else {
      // 관리자 UUID 확인
      setIsAdmin(userUUID === 'c48c7861-8cd0-4eae-90d4-fbd045db601d');
    }
    console.log('session 값 변경됨:', session);
  }, [session, userUUID]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) { 
      setNewImg(file);
      const fileURL = URL.createObjectURL(file);
      setImgPreview(fileURL);
    }
  };

  const ImgIcon = '/img/img_icon.png'; 

  const writingSubmit = async () => {
    if (!window.confirm("게시글을 올리겠습니까?")) return;

    // 관리자가 아닌데 관리자 게시판에 저장하려는 경우 방지
    if (isAdminPost && !isAdmin) {
      alert('관리자 권한이 필요합니다.');
      return;
    }

    setLoading(true)

    try {
      let imgUrl = null;

      if (newImg) {
        const fileExt = newImg.name.split('.').pop();
        const fileName = `${userUUID}-${Date.now()}.${fileExt}`;
        const storageBucket = isAdminPost ? 'admin_storage' : 'test_img';
        const filePath = `${storageBucket}/${userUUID}/${fileName}`;

        const { error: imgError } = await supabase.storage
          .from(storageBucket)
          .upload(filePath, newImg);

        if (imgError) {
          console.error("이미지 업로드 오류:", imgError);
          alert('이미지 업로드에 실패했습니다.');
          return;
        }

        const { publicUrl } = supabase.storage.from(storageBucket).getPublicUrl(filePath).data;
        imgUrl = publicUrl;
      }

      const tableName = isAdminPost ? 'mypost' : 'pro';
      const { data, error } = await supabase.from(tableName).insert({
        title: titleValue,
        body: bodyValue,
        username: userName,
        avatar: userAvatar,
        imgUrl,
      });

      if (error) {
        console.error("데이터 삽입 오류:", error.message);
        alert('오류가 발생했습니다. 다시 시도해주세요.');
        return;
      }

      setTitleValue('');
      setBodyValue('');
      alert('생성완료');
      router.push('/data')

    } catch (error) {
      console.error("예상치 못한 오류:", error.message);
      alert('예상치 못한 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      
      <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full z-40'>
        <div className='container max-w-2xl mx-auto px-4 py-16 pt-36'>
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden'>
            <div className='p-8'>
            <div className="flex justify-between items-center mb-6">
                <h3 className='text-2xl font-semibold text-gray-900 dark:text-white'>새 글 작성</h3>
                <button
                  onClick={() => router.push('/markdown')}
                  className='px-4 py-2 bg-purple-500 text-white text-sm font-medium rounded-lg hover:bg-purple-600 transition duration-300 flex items-center'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  에디터로 작성하기
                </button>
              </div>
            
              <div className="flex items-center mb-4">
                {isAdmin ? (
                  <>
                    <input
                      type="checkbox"
                      id="admin-post"
                      checked={isAdminPost}
                      onChange={(e) => setIsAdminPost(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="admin-post" className="text-sm text-gray-600 dark:text-gray-300">
                      관리자 게시판에 저장
                    </label>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">일반 게시판에 저장됩니다</p>
                )}
              </div>
              
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
                placeholder="여러 이미지를 업로드 할 시 오른쪽 상단 에디터로 작성해주세요!"
                rows="6"
                value={bodyValue} 
                onChange={(e) => setBodyValue(e.target.value)}
              />
  
              <div className='flex justify-end space-x-4'>
                <button onClick={() => router.back()}
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