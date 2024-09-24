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
  <nav className="fixed z-50 w-full top-3">
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">메인 메뉴 열기</span>
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
          <div className="flex-shrink-0 ml-4 md:ml-0">
            {/* 로고나 사이트 제목을 여기에 추가할 수 있습니다 */}
          </div>
        </div>
        <div className="hidden md:flex md:justify-left md:w-full">
          <div className="flex space-x-4 items-center justify-between w-full">
            <div className="flex space-x-4">
              <Link href="/" className="rounded-md px-3 py-2 text-base font-semibold text-gray-200 hover:text-white hover:bg-gray-700 transition duration-300">Main</Link>
              <Link href="/profiles" onClick={handleMyPageClick} className="rounded-md px-3 py-2 text-base font-semibold text-gray-200 hover:text-white hover:bg-gray-700 transition duration-300">MY Page</Link>
              <Link href="/about" className="rounded-md px-3 py-2 text-base font-semibold text-gray-200 hover:text-white hover:bg-gray-700 transition duration-300">Project</Link>
              <Link href="/" className="rounded-md px-3 py-2 text-base font-semibold text-gray-200 hover:text-white hover:bg-gray-700 transition duration-300">Calendar</Link>
            </div>
            {!loggedIn && (   
              <div onClick={side_show} className='rounded-md px-3 py-2 text-base font-semibold text-gray-200 hover:text-white hover:bg-gray-700 transition duration-300 cursor-pointer'>
                로그인
              </div>
            )}
            {loggedIn && (
              <div className="flex items-center space-x-4">
                <Link href="/profiles" className="flex items-center space-x-3">
                  <div className="text-base font-semibold text-gray-200">{userName}</div>
                  <Image alt="avatar" src={userAvatar || defaultAvatar} width={32} height={32} className='w-8 h-8 rounded-full ring-2 ring-emerald-500 dark:ring-gray-500'/>
                </Link>
                <button onClick={handleLogout} className="rounded-md px-3 py-2 text-base font-semibold text-red-500 hover:text-white hover:bg-red-700 transition duration-300">로그아웃</button>
              </div>
            )}
          </div>
        </div>
        {/* 모바일 버전 로그인 버튼 또는 사용자 이름 */}
        <div className="md:hidden flex items-center">
          {!loggedIn && (   
            <div onClick={side_show} className='rounded-md px-3 py-2 text-base font-semibold text-gray-200 hover:text-white hover:bg-gray-700 transition duration-300 cursor-pointer'>
              로그인
            </div>
          )}
          {loggedIn && (
            <Link href="/profiles" className="flex items-center space-x-3">
              <div className="text-base font-semibold text-gray-200">{userName}</div>
              <Image alt="avatar" src={userAvatar || defaultAvatar} width={32} height={32} className='w-8 h-8 rounded-full ring-2 ring-emerald-500 dark:ring-gray-500'/>
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
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <Link href="/" onClick={closeMenu} className="block rounded-md px-3 py-2 text-base font-semibold text-gray-200 hover:text-white hover:bg-gray-700 transition duration-300">Main</Link>
          <Link href="/profiles" onClick={handleMyPageClick} className="block rounded-md px-3 py-2 text-base font-semibold text-gray-200 hover:text-white hover:bg-gray-700 transition duration-300">MY Page</Link>
          <Link href="/about" onClick={closeMenu} className="block rounded-md px-3 py-2 text-base font-semibold text-gray-200 hover:text-white hover:bg-gray-700 transition duration-300">Project</Link>
          <Link href="/" onClick={closeMenu} className="block rounded-md px-3 py-2 text-base font-semibold text-gray-200 hover:text-white hover:bg-gray-700 transition duration-300">Calendar</Link>
          {loggedIn && (
            <button onClick={handleLogout} className="block w-full text-left rounded-md px-3 py-2 text-base font-semibold text-red-500 hover:text-white hover:bg-red-700 transition duration-300">로그아웃</button>
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
