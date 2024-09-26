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
  <nav className="fixed z-50 w-full top-0 shadow-md">
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <div className="flex items-center">
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">메인 메뉴 열기</span>
              {!isMenuOpen ? (
                <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
          <div className="flex-shrink-0 md:hidden absolute left-1/2 transform -translate-x-1/2">
            {/* 모바일 버전 로고 */}
            <Link href="/">
              <span className="text-3xl font-extrabold text-gray-900">SPACE</span>
            </Link>
          </div>
        </div>
        <div className="hidden md:flex md:justify-between md:w-full items-center">
          <div className="flex-shrink-0">
            {/* PC 버전 로고 */}
            <Link href="/">
              <span className="text-4xl font-extrabold text-gray-900">SPACE</span>
            </Link>
          </div>
          <div className="flex space-x-6 items-center">
            <Link href="/" className="text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-semibold">Main</Link>
            <Link href="/profiles" onClick={handleMyPageClick} className="text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-semibold">MY Page</Link>
            <Link href="/about" className="text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-semibold">Project</Link>
            <Link href="/" className="text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-semibold">Calendar</Link>
          </div>
          <div className="flex items-center">
            {!loggedIn && (   
              <div onClick={side_show} className='text-gray-800 hover:text-gray-900 px-4 py-2 rounded-md text-lg font-semibold cursor-pointer'>
                로그인
              </div>
            )}
            {loggedIn && (
              <div className="flex items-center space-x-4">
                <Link href="/profiles" className="flex items-center space-x-3">
                  <div className="text-lg font-semibold text-gray-800">{userName}</div>
                  <Image alt="avatar" src={userAvatar || defaultAvatar} width={40} height={40} className='w-10 h-10 rounded-full ring-2 ring-gray-300'/>
                </Link>
                <button onClick={handleLogout} className="text-red-600 hover:text-red-700 px-4 py-2 rounded-md text-lg font-semibold">로그아웃</button>
              </div>
            )}
          </div>
        </div>
        {/* 모바일 버전 로그인 버튼 또는 사용자 이름 */}
        <div className="md:hidden flex items-center">
          {!loggedIn && (   
            <div onClick={side_show} className='text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-semibold cursor-pointer'>
              로그인
            </div>
          )}
          {loggedIn && (
            <Link href="/profiles" className="flex items-center space-x-3">
              <div className="text-lg font-semibold text-gray-800">{userName}</div>
              <Image alt="avatar" src={userAvatar || defaultAvatar} width={40} height={40} className='w-10 h-10 rounded-full ring-2 ring-gray-300'/>
            </Link>
          )}
        </div>
      </div>
    </div>
    {loginShow && (
      <LoginPage sideHidden={sideHidden}/>
    )} 
    {isMenuOpen && (
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
          <Link href="/" onClick={closeMenu} className="block text-gray-800 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-xl font-semibold">Main</Link>
          <Link href="/profiles" onClick={handleMyPageClick} className="block text-gray-800 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-xl font-semibold">MY Page</Link>
          <Link href="/about" onClick={closeMenu} className="block text-gray-800 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-xl font-semibold">Project</Link>
          <Link href="/" onClick={closeMenu} className="block text-gray-800 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-xl font-semibold">Calendar</Link>
          {loggedIn && (
            <button onClick={handleLogout} className="block w-full text-left text-red-600 hover:text-red-700 hover:bg-gray-100 px-3 py-2 rounded-md text-xl font-semibold">로그아웃</button>
          )}
        </div>
      </div>
    )}
  </nav>

  {isMenuOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" onClick={() => setIsMenuOpen(false)}></div>
  )}
</>
  );
}
