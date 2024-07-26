'use client';
import { useState, useEffect } from 'react';
import supabase from '../api/supabaseaApi';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import {signInWithkakao} from '../login/actions'


export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();


  const handleSignUp = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      // Supabase로 사용자 등록
      const { error: signUpError } = await supabase.auth.signUp({
email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        setSuccess('회원가입 성공! 이메일을 확인하여 인증을 완료하세요.');
      }
    } catch (error) {
      setError('서버 요청 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };






  return (
    <div className="w-1/6 min-w-max m-auto mt-28">
      <h1 className="text-2xl font-bold mb-4">가입할래?</h1>
      <form onSubmit={handleSignUp}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호 (두번 안 물어 봄)</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {isSubmitting ? '회원가입 중...' : '어서와'}
        </button>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        {success && <p className="mt-2 text-sm text-green-600">{success}</p>}

        <div onClick={signInWithkakao} className=' w-16 h-16  mt-4 '>
        <Image alt="ecommerce"
  className="w-16 h-16 object-cover object-center block hover:opacity-50"
  src="/img/kakao.png"
   width={300} height={300}/>
   <p className='text-center text-gray-500 font-700'>KaKao</p>
        </div>

      </form>
    </div>
  );
}

