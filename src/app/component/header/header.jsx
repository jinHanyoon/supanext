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
  <nav className="fixed z-50 w-full top-0 bg-white/80 backdrop-blur-md shadow-sm">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl font-bold text-gray-900">SPACE</span>
          </Link>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">Main</Link>
            <Link href="/profiles" onClick={handleMyPageClick} className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">MY Page</Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">Project</Link>
            <Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">Calendar</Link>
          </div>
        </div>
        <div className="hidden md:block">
          {!loggedIn ? (
            <button onClick={side_show} className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
              로그인
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/profiles" className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">{userName}</span>
                <Image alt="avatar" src={userAvatar || defaultAvatar} width={32} height={32} className='w-8 h-8 rounded-full ring-2 ring-gray-300'/>
              </Link>
              <button onClick={handleLogout} className="text-red-600 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">로그아웃</button>
            </div>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">메뉴 열기</span>
            {!isMenuOpen ? (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>

    {isMenuOpen && (
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <Link href="/" onClick={closeMenu} className="block text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium">Main</Link>
          <Link href="/profiles" onClick={handleMyPageClick} className="block text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium">MY Page</Link>
          <Link href="/about" onClick={closeMenu} className="block text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium">Project</Link>
          <Link href="/" onClick={closeMenu} className="block text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium">Calendar</Link>
          {loggedIn ? (
            <button onClick={handleLogout} className="block w-full text-left text-red-600 hover:text-red-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium">로그아웃</button>
          ) : (
            <button onClick={side_show} className="block w-full text-left text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium">로그인</button>
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
