'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import { logout as logoutAction } from "../../../(auth)/login/actions"
import LoginPage from '../../../(auth)/login/page'
import Image from 'next/image';
import { useSession } from '../../../providers/SessionProvider';  

export default memo(function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginShow, setLoginShow] = useState(false);
  const session = useSession();

  // 세션 값 추출
  const loggedIn = session?.loggedIn || false;
  const userName = session?.userName || '';
  const userAvatar = session?.userAvatar || '/img/img04.jpg';

  // 핸들러 함수들
  const handleLogout = async () => {
    await logoutAction();
    setIsMenuOpen(false);
  };

  const handleMyPageClick = (e) => {
    if (!loggedIn) {
      e.preventDefault();
      alert('로그인 후 이용해 주세요.\n\n임시 아이디:\nID: admin@123.com\nPW: 123');
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed z-50 w-full top-0 bg-white/90 backdrop-blur-xl shadow-md">
        <div className="container max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 로고 */}
          <div className="flex items-center justify-between h-16">
            <Link href="/data" className="flex-shrink-0">
              <span className="text-2xl font-extrabold text-gray-800">SPACE</span>
            </Link>

            {/* 데스크톱 메뉴 */}
            <div className="hidden md:flex items-center justify-center flex-grow">
              <div className="flex space-x-4 lg:space-x-8 lg:gap-16">
                <Link href="/data" className="text-gray-800 font-semibold text-sm uppercase">Main</Link>
                <Link href="/profiles" onClick={handleMyPageClick} className="text-gray-800 font-semibold text-sm uppercase">MY Page</Link>
                <Link href="/about" className="text-gray-800 font-semibold text-sm uppercase">Weather</Link>
                <Link href="/admin" className="text-gray-800 font-semibold text-sm uppercase">Study</Link>
              </div>
            </div>

            {/* 로그인/유저 섹션 */}
            <div className="hidden md:block">
              {!loggedIn ? (
                <button onClick={() => setLoginShow(true)} className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  로그인
                </button>
              ) : (
                <div className="flex items-center space-x-6">
                  <Link href="/profiles" className="flex items-center space-x-3 group hover:bg-gray-100 rounded-full py-1 px-3">
                    <Image 
                      alt="avatar" 
                      src={userAvatar}
                      width={40} 
                      height={40} 
                      className="w-10 h-10 rounded-full ring-2 ring-blue-400"
                    />
                    <span className="text-sm font-semibold text-gray-800">{userName}</span>
                  </Link>
                  <button onClick={handleLogout} className="text-gray-600 hover:text-red-600 text-sm px-4 py-2">
                    로그아웃
                  </button>
                </div>
              )}
            </div>

            {/* 모바일 메뉴 버튼 */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl">
            <div className="px-2 pt-2 pb-3 space-y-4">
              <Link href="/data" onClick={() => setIsMenuOpen(false)} className="block text-gray-800 text-sm">Main</Link>
              <Link href="/profiles" onClick={handleMyPageClick} className="block text-gray-800 text-sm">MY Page</Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)} className="block text-gray-800 text-sm">Weather</Link>
              <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="block text-gray-800 text-sm">Study</Link>
              {loggedIn ? (
                <button onClick={handleLogout} className="block w-full text-left text-red-600 text-sm">로그아웃</button>
              ) : (
                <button onClick={() => setLoginShow(true)} className="block w-full text-left text-blue-600 text-sm">로그인</button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* 로그인 모달 & 오버레이 */}
      {loginShow && <LoginPage sideHidden={() => setLoginShow(false)} />}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-40" onClick={() => setIsMenuOpen(false)} />
      )}
    </>
  );
});