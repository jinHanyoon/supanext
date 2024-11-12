'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import WritingView from '../../writing/page'
import { useUserSession } from '@/app/hooks/authdata';

export default function SideContents() {
  // 로그인 버튼
const { loggedIn } = useUserSession();
// 로그인 창 호출 및 제거
const [loginShow, setLoginShow] = useState(false)
const [WritingShow, setWritingShow] = useState(false)





const writing_show = () => {
  setWritingShow(true)
}

const writing_hidden = () => {
  setWritingShow(false)
  
}





  return (
    <>
{/* {!loggedIn && (   
    <div onClick={side_show} className='fixed z-40 right-40 bottom-10 text-emerald-400 bg-transparent border border-cyan-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
    로그인
  </div>
)}
{loginShow &&(
    <LoginPage sideHidden={sideHidden}/>
)} */}


{loggedIn &&(
  <>

<div 
      onClick={writing_show} 
      className='fixed z-40 md:right-32  right-0 bottom-20 bg-emerald-400 text-white font-medium rounded-full shadow-lg hover:bg-emerald-500 transition-colors duration-300 cursor-pointer'
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </div>

      </>
)}


{WritingShow &&(
  <WritingView writing_hidden={writing_hidden}/>

)}



</>

  )
}
