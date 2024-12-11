'use client';
import { useState, useEffect } from 'react';
import supabase from '../../api/supabaseaApi';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import {signInWithkakao} from '../login/actions'
import {signInWithGoogle} from '../login/actions'

import Loading from '../../loading';


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
      const { error: signUpError } = await supabase.auth.signUp({email,password,
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        alert('인증메일이 성공적으로 전송되었습니다. ');
    router.push('/');
      
      }
    } catch (error) {
      alert('서버가 아프다.. 곧 수리해줄게');
      console.log(error)
    } finally {
      setIsSubmitting(false);
    }
  };

 const handleClose = ()=>{
    router.push('/')
 }






  return (
<>
  {isSubmitting && <Loading />}
  <div className="fixed inset-0 backdrop-blur-xl flex items-center justify-center p-4 z-50">
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="p-8">
        <div  className='flex justify-center '>
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center w-11/12">회원가입</h1>
        <p className='text-right font-bold text-2xl' onClick={handleClose}>X</p>
        </div>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호 (6자리 이상)</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className={`w-full flex justify-center py-3 px-4 rounded-lg text-sm font-semibold text-white transition duration-200 ease-in-out ${
              password.length >= 6 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? '회원가입 중...' : '가입하기'}
          </button>
        </form>
        
        <div className="mt-8">
          <p className="text-center text-sm text-gray-600 mb-4">또는</p>
          <button 
            onClick={signInWithkakao} 
            className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition duration-200"
          >
            <Image 
              alt="kakao" 
              src="/img/kakao.png" 
              width={24} 
              height={24} 
              className="mr-2"
            />
            <span className="text-sm font-semibold text-gray-900">카카오로 시작하기</span>
          </button>

          <button 
            onClick={signInWithGoogle} 
            className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-white hover:bg-gray-50 border border-gray-300 transition duration-200 mt-2"
          >
            <Image 
              alt="google" 
              src="/img/google.svg" 
              width={24} 
              height={24} 
              className="mr-2"
            />
            <span className="text-sm font-semibold text-gray-700">Google로 시작하기</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</>
  );
}

