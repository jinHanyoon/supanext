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
const {userName, userUUID} =  useUserSession();

const params = useParams()
const postId = params.id;

useEffect(()=> {
  async function CommentGet() {
    const { data, error } = await supabase
      .from('comment')
      .select('*')
      .eq('page_num', postId)
      setComment(data)

      if (error) {
        console.error('댓글 가져오기 오류:', error)
        return
      }
    }
    CommentGet()
 
      const channel = supabase.channel('comment-db')
      .on('postgres_changes',{event: 'INSERT', schema: 'public', table: 'comment'},payload =>{
        setComment(prevComment=>[ ...prevComment, payload.new  ])
      })
      .on('postgres_changes', {event:'UPDATE',schema:'public',table:'comment'},payload=>{
        setComment(prevComment => prevComment.map(item => item.id ===payload.new.id ? payload.new : item))
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'comment' }, payload => {
        setComment(prevComment => prevComment.filter(item => item.id !== payload.old.id));
    })
    .subscribe()
    return () => {
      supabase.removeChannel(channel);
    };

 
}, [postId,userName,userUUID])

const CommentHandle = async (e) =>{
  e.preventDefault();
  if (!userName) {
    alert('로그인 후 이용해 주세요.');
    return;
  }
try{
  const {data, error} = await supabase.from('comment').insert({body:bodyValue, page_num:postId, user_name:userName}).select();
  // const newComment = {...data[0]};
  // 구독 안할시 새로추가 된 데이터는 기존 데이터 보다 아래쪽에 배치 
  // setComment([...Comment, ...newComment])
  setBody('');
  setComment([...Comment]) 
  alert('댓글 작성 완료')
}
catch(error){
  alert(error)
}
}

const CommentDelete = async(id) =>{
  try{
    const { data } = await supabase.from('comment').delete().eq('id', id);
    setComment(Comment.filter(comment => comment.id !== id));
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
      <div key={commentValue.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-4 relative">
        <div className="absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-red-500 transition-colors duration-200">
        
      {commentValue.user_id == userUUID &&(
          <span className="text-xl font-bold" onClick={() => CommentDelete(commentValue.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
          )}
        </div>
        <div className="flex flex-col justify-between h-full">
          <div>
            
            <h2 className="text-gray-700 text-sm font-semibold tracking-wider mb-2 flex items-center gap-1 border-b border-gray-200 pb-2">
              {commentValue.user_name}
            </h2>
            <h3 className="text-gray-800 text-base font-medium break-words whitespace-pre-wrap">{commentValue.body}</h3>
          </div>
          <p className="mt-3 text-gray-500 text-xs">
          {new Date(commentValue.create_at).toLocaleString('ko-KR', {
                  timeZone: 'Asia/Seoul',
                })}
          </p>
        </div>
      </div>
    ))}
  </div>

  <form onSubmit={CommentHandle} className="mt-8">
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-4 relative">
      <textarea 
        value={bodyValue}
        onChange={(e) => setBody(e.target.value)}
        className="  w-full p-3 mb-16 bg-gray-50 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none  "
        rows="3"
        placeholder="댓글을 입력하세요..."
      ></textarea>
      <button 
        type="submit" 
        className={`absolute bottom-4 right-4 py-2 px-4 rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-300 ${
          bodyValue.trim() 
            ? 'bg-cyan-600 hover:bg-cyan-700' 
            : 'bg-gray-400 cursor-not-allowed'
        }`}
        disabled={!bodyValue.trim()}
      >
        작성
      </button>
    </div>
  </form>
</div>
)

};