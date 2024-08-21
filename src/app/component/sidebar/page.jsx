'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import LoginPage from '../../login/page'
import WritingView from '../writing/page'
import useUserSession from '../../hooks/authdata'
import {logout} from "../../login/actions"

export default function SideContents() {
  // 로그인 버튼
const { loggedIn,userName } = useUserSession();
// 로그인 창 호출 및 제거
const [loginShow, setLoginShow] = useState(false)
const [WritingShow, setWritingShow] = useState(false)


useEffect(() => {
}, [userName]);


const side_show  = () => {
    setLoginShow(true)
}

const sideHidden  = () => {
    setLoginShow(false)
    console.log('click_compolete')
}

const writing_show = () => {
  setWritingShow(true)
}

const writing_hidden = () => {
  setWritingShow(false)
  
}





  return (
    <>
{!loggedIn && (   
    <div onClick={side_show} className='fixed z-40 right-40 bottom-10 text-emerald-400 bg-transparent border border-cyan-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
    로그인
  </div>
)}
{loginShow &&(
    <LoginPage sideHidden={sideHidden}/>
)}


{loggedIn &&(
  <>

  <div onClick={writing_show} className=' fixed z-40 right-10 bottom-10 text-emerald-400 bg-transparent border border-cyan-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' >글쓰기</div> 
  <div className='fixed bottom-10 right-40 z-50  text-emerald-400 bg-transparent border border-cyan-500  text-sm  px-7 py-2.5 rounded text-center w-26 me-2 mb-2'>{userName}</div>
      <div onClick={logout} className="border border-red-600  text-white font-bold py-2 px-4 rounded absolute left-2/3 z-40 top-10 min-w-14">
        로그아웃
      </div>
      </>
)}


{WritingShow &&(
  <WritingView writing_hidden={writing_hidden}/>

)}



</>

  )
}
