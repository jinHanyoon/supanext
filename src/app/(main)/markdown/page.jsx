'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MdEditor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import 'react-markdown-editor-lite/lib/index.css';
import supabase from '@/app/api/supabaseaApi';
import { useSession } from '@/app/providers/SessionProvider';
import Loading from '../../loading';

export default function MarkdownWriting() {
  const router = useRouter();
  const session = useSession();
  const { userName, userUUID, userAvatar } = session || {};

  const [titleValue, setTitleValue] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdminPost, setIsAdminPost] = useState(false);

  useEffect(() => {
    if (!session) {
    }
  }, [session]);

  const handleImageUpload = async (file) => {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${userUUID}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const storageBucket = isAdminPost ? 'admin_storage' : 'test_img';
        const filePath = `${storageBucket}/${userUUID}/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from(storageBucket)
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
            .from(storageBucket)
            .getPublicUrl(filePath);

        return data.publicUrl;  // 수정: data.publicUrl 반환
    } catch (error) {
        console.error("이미지 업로드 실패:", error);
        alert('이미지 업로드 실패');
        return '';
    }
};

  const handleEditorChange = ({ text }) => {
    setContent(text);
  };

  const writingSubmit = async () => {
    if (!window.confirm("게시물을 업로드 하시겠습니까?")) return;
    setLoading(true);

    try {
      const tableName = isAdminPost ? 'mypost' : 'pro';
      const { error } = await supabase.from(tableName).insert({
        title: titleValue,
        body: content,
        username: userName,
        avatar: userAvatar,
      });

      if (error) throw error;

      setTitleValue('');
      setContent('');
      alert('생성완료');
      router.push('/data');

    } catch (error) {
      console.error("에러:", error.message);
      alert('잠시 후 다시 시도해주세요');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      
      <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full z-40'>
        <div className='container max-w-4xl mx-auto px-4 py-16 pt-36'> {/* max-w-4xl로 더 넓게 */}
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden'>
            <div className='p-8'>
              <h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-6'>
                에디터로 글쓰기
              </h3>
              
              <div className="flex items-center mb-4">
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
              </div>
              
              <input
                className="w-full px-4 py-3 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                placeholder="제목"
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
              />

              {/* 마크다운 에디터 */}
              <div className="mb-6">
                <MdEditor
                  style={{ height: '500px' }}
                  renderHTML={text => <ReactMarkdown>{text}</ReactMarkdown>}
                  onChange={handleEditorChange}
                  value={content}
                  onImageUpload={handleImageUpload}
                  imageAccept=".jpg,.jpeg,.png,.gif"
                  placeholder="내용을 작성해주세요. 드래그를 이용해 이미지를 추가 할 수 있어요!"
                  className="dark:bg-gray-700" // 다크모드용
                />
              </div>

              <div className='flex justify-end space-x-4'>
                <button
                  onClick={() => router.back()}
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