'use client'
import React from 'react'
import { useState } from 'react'
import LoginPage from '../../login/page'
import WritingView from '../writing/page'
import useUserSession from '../../hooks/authdata'

export default function SideContents() {
  // 로그인 버튼
const { loggedIn, } = useUserSession();
// 로그인 창 호출 및 제거
const [loginShow, setLoginShow] = useState(false)
const [WritingShow, setWritingShow] = useState(false)


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
    <div onClick={side_show} className='fixed z-40 right-40 bottom-10 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
    로그인
  </div>
)}
{loginShow &&(
    <LoginPage sideHidden={sideHidden}/>
)}


{loggedIn &&(
  <div onClick={writing_show} className=' fixed z-40 right-10 bottom-10 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' >글쓰기</div> 

)}


{WritingShow &&(
  <WritingView writing_hidden={writing_hidden}/>

)}



</>

  )
}
