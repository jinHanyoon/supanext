'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import LoginPage from '../../login/page'
import WritingView from '../writing/page'
import useUserSession from '../../hooks/authdata'

export default function SideContents() {
  // 로그인 버튼
const { loggedIn,userName } = useUserSession();
// 로그인 창 호출 및 제거
const [loginShow, setLoginShow] = useState(false)
const [WritingShow, setWritingShow] = useState(false)


useEffect(() => {
}, [userName]);



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

  <div onClick={writing_show} className=' fixed z-40 right-10 bottom-10 text-emerald-400 bg-transparent border border-cyan-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' >글쓰기</div> 

      </>
)}


{WritingShow &&(
  <WritingView writing_hidden={writing_hidden}/>

)}



</>

  )
}
