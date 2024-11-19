'use client'
import supabase from '@/app/api/supabaseaApi'
import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from '@/app/providers/SessionProvider';

import '../../../globals.css'; // CSS 파일을 임포트합니다.

// 게시물 url 불러오기 
// 게시물 url id값으로 사용 
// 게시물 url num && id 값으로 댓글추가 
// 댓글 닉네임 제목 내용


export default function Comment() {
  const session = useSession();
const [bodyValue, setBody]=useState('')
const [Comment, setComment] =useState([])
const { userName, userUUID, loggedIn } = session;


const params = useParams()
const postId = params.id;


  
  useEffect(() => {
    let mounted = true;
    
    async function CommentGet() {
      try {
        const { data, error } = await supabase
          .from('comment')
          .select('*')
          .eq('page_num', postId);
        
        if (error) throw error;
        if (mounted) setComment(data);
      } catch (error) {
      }
    }
  
    // // 실시간 구독 한번만 하게 수정
    const channel = supabase.channel('comment-db')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'comment', filter: `page_num=eq.${postId}` },
        payload => {
          if (!mounted) return;
          
          switch(payload.eventType) {
            case 'INSERT':
              setComment(prev => [...prev, { ...payload.new, animate: true }]);
              break;
            case 'UPDATE':
              setComment(prev => prev.map(item => 
                item.id === payload.new.id ? payload.new : item
              ));
              break;
            case 'DELETE':
              setComment(prev => prev.filter(item => item.id !== payload.old.id));
              break;
          }
      })
      .subscribe();
  
    CommentGet();
  
    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, [postId]); // userName, userUUID 의존성 제거

const CommentHandle = async (e) => {
  e.preventDefault();
  if (!userName) {
    alert('로그인 후 이용해 주세요.');
    return;
  }
  if (!bodyValue.trim()) {
    alert('댓글 내용을 입력해주세요.');
    return;
  }

  try {
    const { error } = await supabase
      .from('comment')
      .insert({
        body: bodyValue,
        page_num: postId,
        user_name: userName
      });

    if (error) throw error;
    
    setBody('');
    // setComment는 실시간 구독에서 처리할거라 여기선 제거
    alert('댓글 작성 완료');
  } catch (error) {
    alert('댓글 작성 실패했습니다. 다시 시도해주세요.');
  }
};

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
            <div key={commentValue.id} className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-4 relative ${commentValue.animate ? 'fade-in' : ''}`}>
      {/* <div key={commentValue.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-4 relative"> */}
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