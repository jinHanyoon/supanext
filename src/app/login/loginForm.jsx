'use client';
import { useState } from 'react';
import Link from "next/link";
import {login, logout} from "./actions"
import { useRouter } from 'next/navigation'


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
      router.push('/')
      sideHidden()
    } catch (error) {
      alert('뭐가 틀렸는데?')
    }
  };
  





  return (
     
    <div className="bg-black/80 w-full h-screen fixed z-50 top-0">
   

      <form onSubmit={handleSubmit} className={`w-1/6 min-w-max m-auto mt-48  bg-transparent p-5 rounded-xl backdrop-filter border backdrop-blur-lg duration-300 ${password ? 'border-cyan-800': 'border-gray-500'}`}>
      <div className='ml-64 w-8 h-1/10 border border-rose-800  rounded-full text-center font-bold text-white leading-loose' onClick={sideHidden}>X</div>
        <div className="mb-4">
          <label htmlFor="username" className='block text-sm font-medium  text-cyan-500'>이메일</label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='mt-1 block w-full px-3 py-2 border-b border-cyan-500  text-emerald-400 bg-transparent outline-none shadow-sm  sm:text-sm '
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-cyan-500">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='mt-1 block w-full px-3 py-2 text-emerald-400 border-b shadow-sm outline-none sm:text-sm bg-transparent border-cyan-500'
          />
        {error && (
            <p
              className="mt-2 text-sm text-red-600 text-center"
              dangerouslySetInnerHTML={{ __html: error }}
            />
          )}
        </div>
      
        <button type="submit" className={`w-full flex justify-center bg-transparent py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white border-cyan-300  border mt-8 duration-1000  ${isFormComplete ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-transparent text-white border-cyan-300'}`} >입장</button>

        {/* <button type="submit" className="w-full flex justify-center bg-transparent py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white border-cyan-300  border mt-8" >입장</button> */}
        <Link href="/signUp" onClick={sideHidden} className="w-full flex justify-center py-2 px-4 border border-rose-800 rounded-md shadow-sm text-sm font-medium text-white  mt-4">아이디가 없어요</Link>
        

      </form>
    </div>
  );
}

