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
    <div className="w-1/5 min-w-max m-auto mt-28  rounded-xl   ">
      <h1 className="text-2xl font-medium mb-4 text-cyan-500">가입할래?</h1>
      <form onSubmit={handleSignUp}>
        <div className="my-10">
          <label htmlFor="email" className="block text-sm font-medium text-cyan-500">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border-b bg-transparent border-cyan-500 text-emerald-400 shadow-sm focus:outline-none sm:text-sm"
          />
        </div>
        <div className="mt-14">
          <label htmlFor="password" className="block text-sm font-medium text-cyan-500">비밀번호 (두번 안 물어 봄)</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border-b bg-transparent border-cyan-500 text-emerald-400 focus:outline-none shadow-sm  sm:text-sm"
          />
        </div>
        <button type="submit" disabled={isSubmitting} className={`w-full flex  justify-center mt-9 py-2 px-4 border border-emerald-400 bg-transparent rounded-md shadow-sm text-sm font-medium text-white  duration-1000 ${password ? 'bg-emerald-400' : 'bg-transparent'}`}>
          {isSubmitting ? '회원가입 중...' : '어서와'}
        </button>
    

        <div onClick={signInWithkakao} className=' w-16 h-16  mt-10 '>
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

