'use client';
import { useState } from 'react';
import Link from "next/link";
import {login, logout} from "./actions"
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import { signInWithkakao } from './actions';
import { signInWithGoogle } from './actions';

export default function LoginForm({sideHidden}) {
  const router = useRouter()


  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [email, setEmail] =useState('')

  const isFormComplete = email && password;
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      sideHidden()
    } catch (error) {
      alert('뭐가 틀렸는데?')
    }
  };
  





  return (
<div className="fixed inset-0 backdrop-blur-xl flex items-center justify-center p-4 z-50">
  <div className="w-full max-w-md bg-gray-300/80 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden">
    <div className="p-8">
      <div className="flex justify-end">
        <button onClick={sideHidden} className="text-gray-600 hover:text-gray-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">로그인</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">이메일</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="admin@123.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">비밀번호</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}

<button
          type="submit"
          className={`w-full py-3 px-4 rounded-lg text-sm font-semibold text-center text-white transition duration-200 ease-in-out ${
            isFormComplete 
              ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!isFormComplete}
        >
          로그인
        </button>
      </form>
      
      <div className="mt-8 space-y-3">
        <div className="flex gap-3 justify-center">
          <button 
            onClick={signInWithkakao} 
            className="flex items-center justify-center p-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition duration-200 w-[120px]"
          >
            <Image 
              alt="kakao" 
              src="/img/kakao.png" 
              width={20} 
              height={20} 
              className="mr-1"
            />
            <span className="text-xs font-semibold text-gray-900">카카오</span>
          </button>

          <button 
            onClick={signInWithGoogle} 
            className="flex items-center justify-center p-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-300 transition duration-200 w-[120px]"
          >
            <Image 
              alt="google" 
              src="/img/google.svg" 
              width={20} 
              height={20} 
              className="mr-1"
            />
            <span className="text-xs font-semibold text-gray-700">Google</span>
          </button>
          </div>
          </div>
      <div className="mt-6 text-center">
        <Link 
          href="/signUp" 
          onClick={sideHidden} 
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          계정이 없으신가요? 회원가입
        </Link>
      </div>
    </div>
  </div>
</div>
  );
}

