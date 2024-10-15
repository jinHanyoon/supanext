'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import supabase from '@/app/api/supabaseaApi';
import Image from "next/image";
import { useEffect, useState } from 'react';


export default function EditPage() {
const [EditTitle, setEditTitle] = useState('')
const [EditBody, setEditBody] = useState('')
const [EditImg, setEditImg] = useState('')

const { id } = useParams();
const defaultAvatar = '/img/img04.jpg';
const UndefineText = "";
const router = useRouter()

useEffect(() => {
    if (id) {
        const fetchEditData = async () => {
            const { data, error } = await supabase
                .from('pro')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                console.error(error);
            } else {
                setEditTitle(data.title);
                setEditBody(data.body);
                setEditImg(data.imgUrl);
            }
        };
        fetchEditData();
    }
}, [id]);

const EditSubmit  =async () =>{
    const {error} = await supabase.from('pro').update({title:EditTitle, body:EditBody, }).eq('id',id).select('*')
    if(error){
        alert('수정에 실패하였습니다. 잠시 후 다시 시도해주세요. ')
        console.log(error)
    }else{
        alert("수정이 완료되었습니다.")
        router.push(`/details/${id}`);
    }
}


return (
<div className="container px-4 pt-24 pb-16 mx-auto max-w-4xl relative z-10">
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
                <div>
                    <Image
                        alt="DataImg"
                        src={EditImg || defaultAvatar}
                        className="w-full h-auto rounded-lg shadow-md"
                        width={600}
                        height={400}
                    />
                </div>
                <textarea
                  className='text-gray-700 text-lg leading-relaxed whitespace-pre-wrap bg-gray-100 focus:outline-none rounded resize-none overflow-hidden p-2 h-32'
                    value={EditBody || UndefineText}
                    onChange={(e) => setEditBody(e.target.value)}
                ></textarea>
                {/* 버튼을 텍스트 영역 아래로 이동 */}
                <div className="flex justify-end">
                    <button 
                        onClick={EditSubmit} 
                        className="mt-4 px-6 py-2 bg-gray-200 text-gray-900 font-semibold rounded"
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
