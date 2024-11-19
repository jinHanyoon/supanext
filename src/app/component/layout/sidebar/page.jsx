'use client'
import React from 'react'
import { useSession } from '@/app/providers/SessionProvider';

import Link from 'next/link';

export default function SideContents() {
  // 로그인 버튼
  const session = useSession();

const { loggedIn } = session;
// 로그인 창 호출 및 제거





  return (
    <>


{loggedIn &&(
  <>

<div 
      className='fixed z-40 md:right-32  right-0 bottom-20 bg-emerald-400 text-white font-medium rounded-full shadow-lg hover:bg-emerald-500 transition-colors duration-300 cursor-pointer'
    >
 <Link href="/writing"> 
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      </Link>
    </div>

      </>
)}





</>

  )
}
