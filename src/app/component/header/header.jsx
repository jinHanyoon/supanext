'use client';
import { useState } from 'react';
import Link from 'next/link';
import useUserSession from '../../hooks/authdata'
import {logout as logoutAction} from "../../login/actions"
import LoginPage from '../../login/page'
import Image from 'next/image';


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loggedIn,userName,userAvatar } = useUserSession();
const [loginShow, setLoginShow] = useState(false)
const closeMenu = () => {
  setIsMenuOpen(false);
};
const defaultAvatar = '/img/img04.jpg'; 

  const side_show  = () => {
    setLoginShow(true)
}

const sideHidden  = () => {
    setLoginShow(false)
}

const handleLogout = async () => {
  await logoutAction();
  setIsMenuOpen(false); // 로그아웃 시 모바일 메뉴 닫기
}
const handleMyPageClick = (e) => {
  if (!loggedIn) {
    e.preventDefault();
    alert('로그인 후 이용해 주세요.\n\n임시 아이디:\nID: admin@123.com\nPW: 123');
  } else {
    closeMenu(); // 로그인한 경우에만 메뉴를 닫습니다.
};
}
  return (
<>
  <nav className="fixed z-50 w-full top-0 bg-white/90 backdrop-blur-xl shadow-md">
    <div className="container max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <Link href="/" className="flex-shrink-0">
          <span className="text-2xl font-extrabold text-gray-800">SPACE</span>
        </Link>
        
        <div className="hidden md:flex items-center justify-center flex-grow">
  <div className="flex space-x-8 gap-16">
    <Link href="/" className="text-gray-800 font-semibold text-sm uppercase tracking-wide transition-colors duration-300 ease-in-out border-b-2 border-transparent focus:border-blue-600">
      Main
    </Link>
    <Link href="/profiles" onClick={handleMyPageClick} className="text-gray-800 font-semibold text-sm uppercase tracking-wide transition-colors duration-300 ease-in-out border-b-2 border-transparent focus:border-blue-600">
      MY Page
    </Link>
    <Link href="/about" className="text-gray-800 font-semibold text-sm uppercase tracking-wide transition-colors duration-300 ease-in-out border-b-2 border-transparent focus:border-blue-600">
      Project
    </Link>
    <Link href="/" className="text-gray-800 font-semibold text-sm uppercase tracking-wide transition-colors duration-300 ease-in-out border-b-2 border-transparent focus:border-blue-600">
      Calendar
    </Link>
  </div>
</div>
        
        <div className="hidden md:block">
          {!loggedIn ? (
            <button onClick={side_show} className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-200">
              로그인
            </button>
          ) : (
            <div className="flex items-center space-x-6">
            <Link href="/profiles" className="flex items-center space-x-3 group transition-all duration-300 ease-in-out hover:bg-gray-100 rounded-full py-1 px-3">
              <div className="relative">
                <Image 
                  alt="avatar" 
                  src={userAvatar || defaultAvatar} 
                  width={40} 
                  height={40} 
                  className='w-10 h-10 rounded-full ring-2 ring-blue-400 transition-all duration-300 ease-in-out group-hover:ring-blue-500'
                />
                <div className="absolute inset-0 rounded-full shadow-inner"></div>
              </div>
              <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{userName}</span>
            </Link>
            <button 
              onClick={handleLogout} 
              className="text-gray-600 hover:text-red-600 font-medium text-sm bg-transparent hover:bg-red-50 rounded-full px-4 py-2 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              로그아웃
            </button>
          </div>
          )}
        </div>
        
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>
    </div>

    {isMenuOpen && (
      <div className="md:hidden bg-white/95 backdrop-blur-xl">
  <div className="px-2 pt-2 pb-3 space-y-4">
    {loggedIn && (
      <Link href="/profiles" onClick={handleMyPageClick}>
      <div className="flex items-center py-2 border-b border-gray-200 mb-2">
        <Image alt="avatar" src={userAvatar || defaultAvatar} width={32} height={32} className='w-8 h-8 rounded-full ring-2 ring-gray-300 mr-2'/>
        <span className="text-sm font-semibold text-gray-800">{userName}</span>
      </div>
      </Link>
    )}
    <Link href="/" onClick={closeMenu} className="block text-gray-800 font-semibold text-sm uppercase tracking-wide transition-colors duration-300 ease-in-out border-b border-transparent focus:border-blue-600 py-2">
      Main
    </Link>
    <Link href="/profiles" onClick={handleMyPageClick} className="block text-gray-800 font-semibold text-sm uppercase tracking-wide transition-colors duration-300 ease-in-out border-b border-transparent focus:border-blue-600 py-2">
      MY Page
    </Link>
    <Link href="/about" onClick={closeMenu} className="block text-gray-800 font-semibold text-sm uppercase tracking-wide transition-colors duration-300 ease-in-out border-b border-transparent focus:border-blue-600 py-2">
      Project
    </Link>
    <Link href="/" onClick={closeMenu} className="block text-gray-800 font-semibold text-sm uppercase tracking-wide transition-colors duration-300 ease-in-out border-b border-transparent focus:border-blue-600 py-2">
      Calendar
    </Link>
    {loggedIn ? (
      <button onClick={handleLogout} className="block w-full text-left text-red-600 font-semibold text-sm uppercase tracking-wide transition-colors duration-300 ease-in-out py-2">
        로그아웃
      </button>
    ) : (
      <button onClick={side_show} className="block w-full text-left text-blue-600 font-semibold text-sm uppercase tracking-wide transition-colors duration-300 ease-in-out py-2">
        로그인
      </button>
    )}
  </div>
</div>
    )}
  </nav>

  {loginShow && <LoginPage sideHidden={sideHidden}/>}

  {isMenuOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-40" onClick={() => setIsMenuOpen(false)}></div>
  )}
</>
  );
}
