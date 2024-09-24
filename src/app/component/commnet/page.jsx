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
<div className="w-full mx-auto max-w-4xl">
  <div className="space-y-6">
    {Comment.map((commentValue) => (
      <div key={commentValue.id} className="backdrop-filter backdrop-blur-lg bg-opacity-30 bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-600 p-4 relative">
        <div className="absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-red-400 transition-colors duration-200">
          <span className="text-xl font-bold" onClick={() => CommentDelete(commentValue.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="text-gray-300 text-sm tracking-wider mb-2 flex items-center gap-1 border-b border-gray-600 pb-2">
              {commentValue.user_name}
            </h2>
            <h3 className="text-gray-200 text-base font-medium break-words">{commentValue.body}</h3>
          </div>
          <p className="mt-3 text-gray-400 text-xs">{commentValue.create_at}</p>
        </div>
      </div>
    ))}
  </div>

  <form onSubmit={CommentHandle} className="mt-8">
    <div className="backdrop-filter backdrop-blur-lg bg-opacity-30 bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-600 p-4 relative">
      <textarea 
        value={bodyValue}
        onChange={(e) => setBody(e.target.value)}
        className="w-full p-3 mb-16 bg-transparent text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent resize-none"
        rows="3"
        placeholder="댓글을 입력하세요..."
      ></textarea>
      <button 
        type="submit" 
        className={`absolute bottom-4 right-4 py-2 px-4 rounded-lg shadow-sm text-sm font-medium text-white border transition-all duration-300 ${
          bodyValue.trim() 
            ? 'bg-cyan-600 border-cyan-600 hover:bg-cyan-700' 
            : 'bg-transparent border-gray-600 hover:border-cyan-600'
        }`}
      >
        작성
      </button>
    </div>
  </form>
</div>
)

};