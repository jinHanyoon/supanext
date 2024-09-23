'use client'
import supabase from '@/app/api/supabaseaApi'
import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'next/navigation'
import useUserSession from '../../hooks/authdata';

// 게시물 url 불러오기 
// 게시물 url id값으로 사용 
// 게시물 url num && id 값으로 댓글추가 
// 댓글 닉네임 제목 내용


export default function Comment() {
const [bodyValue, setBody]=useState('')
const [Comment, setComment] =useState([])
const {userName} =  useUserSession();

const params = useParams()
const postId = params.id;

useEffect(()=> {
  async function CommentGet() {
      const {data,error}  = await supabase.from('comment').select('*').eq('page_num', postId)
      const proWithKoreanTime = data.map(item => ({
        ...item,
        create_at: new Date(item.create_at).toLocaleString('ko-KR', {
          timeZone: 'Asia/Seoul',
        }),
      }));
     
      setComment(proWithKoreanTime)
    }

  CommentGet() 
})

const CommentHandle = async (e) =>{
  e.preventDefault();
try{
  const {data, error} = await supabase.from('comment').insert({body:bodyValue, page_num:postId, user_name:userName})
  setBody('')
  setComment([...Comment]) 
  alert('댓글 작성 완료')
}
catch(error){
  alert(error)
}
}

const CommentDelete = async(id) =>{
  try{
    const { error } = await supabase.from('comment').delete().eq('id', id);
  }catch(error){
    alert('삭제실패')
  }finally{
    alert('삭제완료')
  }

} 



return (
  <div className="container px-5 py-24 mx-auto">
 <div className="w-full md:w-9/12 mx-auto">
    {Comment.map((commentValue) => (
        <div key={commentValue.id} className="backdrop-blur-sm rounded-lg p-3 mb-4 relative border-2 border-gray-500 duration-500 hover:border-cyan-600 min-h-[80px]">
          <div className="absolute top-0 right-2 cursor-pointer text-gray-500 hover:text-gray-700">
            <span className="text-xl font-bold" onClick={() => CommentDelete(commentValue.id)}>X</span>
          </div>
          <div className="flex flex-col justify-between h-full">
            <div>
              <h2 className="text-gray-100 text-xs tracking-widest title-font mb-2 flex items-center gap-1 border-b pb-1">
                <p>{commentValue.user_name}</p>
              </h2>
              <h3 className="text-gray-200 title-font text-sm md:text-base font-semibold break-words">{commentValue.body}</h3>
            </div>
            <p className="mt-2 text-gray-400 text-xs">{commentValue.create_at}</p>
          </div>
        </div>
      ))}
    </div>

    <form onSubmit={CommentHandle} className="mt-6 w-full md:w-9/12 mx-auto">
      <div className="p-3 backdrop-blur-sm rounded-lg border-2 border-gray-500 duration-500 hover:border-cyan-600 relative">
        <textarea 
          value={bodyValue}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 mb-10 bg-transparent text-gray-200 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600 resize-none"
          rows="3"
          placeholder="댓글을 입력하세요..."
        ></textarea>
           <button type="submit" className={`absolute bottom-3 right-3 flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white border-cyan-300 border duration-1000 ${bodyValue.trim() ? 'bg-emerald-600 text-white border-emerald-600 ' : 'bg-transparent text-white border-cyan-300'}`}>작성</button>
      </div>
    </form>
  </div>
)

};