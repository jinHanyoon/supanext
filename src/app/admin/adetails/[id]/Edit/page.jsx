'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import supabase from '@/app/api/supabaseaApi';
import Image from "next/image";
import { useEffect, useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import 'react-markdown-editor-lite/lib/index.css';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import styles from '@/app/styles.module.css';

export default function EditPage() {
    const [EditTitle, setEditTitle] = useState('')
    const [EditBody, setEditBody] = useState('')
    const [EditImg, setEditImg] = useState('')

    const { id } = useParams();
    const defaultAvatar = '/img/img04.jpg';
    const UndefineText = "";
    const router = useRouter()

    // 마크다운에서 이미지 URL이 있는지 확인하는 함수
    const hasMarkdownImage = (markdownText) => {
        if (!markdownText) return false;
        return markdownText.match(/!\[.*?\]\((.*?)\)/) !== null;
    };

    
    useEffect(() => {
        if (id) {
            const fetchEditData = async () => {
                const { data, error } = await supabase
                    .from('mypost')
                    .select('*')
                    .eq('id', id)
                    .single();
                if (error) {
                    console.error(error);
                } else {
                    setEditTitle(data.title);
                    // 기존 텍스트를 그대로 사용 (변환 없이)
                    setEditBody(data.body);
                    setEditImg(data.imgUrl);
                }
            };
            fetchEditData();
        }
    }, [id]);

    const handleEditorChange = ({ text }) => {
        // 마크다운 형식 그대로 저장
        setEditBody(text);
    };

    const EditSubmit = async () => {
        // 유효성 검사 추가
        if (!EditTitle.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }
        if (!EditBody.trim()) {
            alert('내용을 입력하세요.');
            return;
        }
    
        try {
            // MdEditor가 이미 마크다운 형식으로 제공하므로 추가 변환 없이 직접 저장
            const { error } = await supabase
                .from('mypost')
                .update({ 
                    title: EditTitle.trim(),
                    body: EditBody  // 마크다운 형식 그대로 저장
                })
                .eq('id', id);
    
            if (error) throw error;
    
            alert("수정이 완료되었습니다.");
            router.push(`/admin/adetails/${id}`);
        } catch (error) {
            console.error('수정 중 오류 발생:', error);
            alert('수정에 실패하였습니다. 잠시 후 다시 시도해주세요.');
        }
    };
    return (
        <div className={`container px-4 pt-24 pb-16 mx-auto max-w-4xl relative z-30 ${styles.editorWrapper}`}>
            <div className="rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="p-6 md:p-8">
                    <div className='flex justify-between items-center border-b border-gray-200 pb-4 mb-6'>
                        <textarea
                            className='text-2xl md:text-3xl font-bold text-gray-900 bg-gray-100 focus:outline-none rounded resize-none overflow-hidden h-9'
                            value={EditTitle || UndefineText}
                            onChange={(e) => setEditTitle(e.target.value)}
                        ></textarea>
                    </div>
                    <div className='space-y-6'>
                        {/* 마크다운에 이미지가 없을 때만 기본 이미지 표시 */}
                        {!hasMarkdownImage(EditBody) && (
                            <div>
                                <Image
                                    alt="DataImg"
                                    src={defaultAvatar}
                                    className="w-full h-auto rounded-lg shadow-md"
                                    width={600}
                                    height={400}
                                />
                            </div>
                        )}
                        <MdEditor
                            style={{  height: '400px',
                                minHeight: '200px',
                                width: '100%',
                                maxWidth: '100%'}}
                            renderHTML={text => (
                                <ReactMarkdown 
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                >
                                    {text}
                                </ReactMarkdown>
                            )}
                            onChange={handleEditorChange}
                            value={EditBody || UndefineText}
                            placeholder="내용을 입력하세요 (마크다운 지원)"
                        />
        
                        <div className="flex justify-end gap-2">
                        <button 
                        onClick={()=>{router.back()}}
                                className="mt-4 px-6 py-2 bg-red-500 text-white font-semibold rounded"
                            >
                            취소
                            </button>
                            <button 
                                onClick={EditSubmit} 
                                className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-gray-300"
                            >
                                수정완료
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}