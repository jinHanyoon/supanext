'use client';
import { useState } from 'react';
import Link from "next/link";


export default function LoginForm({ onLogin, onClose  }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);




  const handleLogin = async (e) => {
    e.preventDefault();
    const loginResult = await onLogin(username, password);
    if (loginResult?.error) {  // Optional chaining to avoid runtime error if loginResult is undefined
      setError(loginResult.error);
    }
  };



  return (
     
    <div className="bg-neutral-500/50 w-full h-screen fixed z-50 top-0">
   

      <form onSubmit={handleLogin} className='w-1/6 min-w-max m-auto mt-48  bg-white p-5 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg'>
      <div className='ml-64 w-8 h-1/10 bg-rose-400 hover:bg-rose-500 rounded-full text-center font-bold text-white leading-loose' onClick={onClose}>X</div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">이메일</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className=" mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        {error && (
            <p
              className="mt-2 text-sm text-red-600 text-center"
              dangerouslySetInnerHTML={{ __html: error }}
            />
          )}
        </div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">입장</button>
        <Link href="/signUp" onClick={onClose} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-2">아이디가 없어요</Link>
        

      </form>
    </div>
  );
}

