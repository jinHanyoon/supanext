'use client'
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import supabase from '../../api/supabaseaApi';
// import useUserSession from '../../hooks/authdata'


export default function MyList({userUUID}) {
    const [MyWrite, setMyWrite] =useState([])
    const [MyComment, setComment] =useState([])
    const [isDataLoaded, setIsDataLoaded] =useState(false)
// const {userUUID} = useUserSession();

    useEffect(() => {
        if(userUUID && !isDataLoaded){
        const MyData = async() =>{
          const {data,error} =await supabase.from('pro').select('*').eq('user_id',userUUID)
          setMyWrite(data||[])
          }
          MyData()
    
          const MyCommentAdd = async() =>{
            const {data,error} =await supabase.from('comment').select('body,page_num, id').eq('user_id',userUUID)
            setComment(data||[])
            }
            MyCommentAdd()

            setIsDataLoaded(true);
          }
    
    
      },[userUUID, isDataLoaded]);



  return (
    <>
    {isDataLoaded &&(
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
      <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">내가 쓴 글</h3>
        <div className="h-[300px] sm:h-[400px] overflow-y-auto space-y-3 sm:space-y-4">
          {MyWrite.map(Write => (
            <div key={Write.id} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <Link href={`/details/${Write.id}`} className="text-base sm:text-lg text-emerald-600 hover:underline">
                {Write.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">내가 쓴 댓글</h3>
        <div className="h-[300px] sm:h-[400px] overflow-y-auto space-y-3 sm:space-y-4">
          {MyComment.map(Comment => (
            <div key={Comment.id} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <Link href={`/details/${Comment.page_num}`} className="text-base sm:text-lg text-emerald-600 hover:underline">
                {Comment.body}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
    )}
   </>
  )
}
