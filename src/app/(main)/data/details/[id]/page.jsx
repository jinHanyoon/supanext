'use client'
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import supabase from '@/app/api/supabaseaApi';
import Image from "next/image";
import DetailSkeleton from '@/app/component/ui/detailSkleton/page';
import Comment from '../../commnet/page';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import styles from '@/app/styles.module.css';
import { useSession } from '@/app/providers/SessionProvider';

export default function AdetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const session = useSession();
    const { userUUID } = session;
    const [Post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [skeOut, setSkeOut] = useState(false);
    const [Modal, setModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const defaultAvatar = '/img/img04.jpg';

    // 마크다운에서 이미지 URL이 있는지 확인하는 함수
    const hasMarkdownImage = (markdownText) => {
        if (!markdownText) return false;
        return markdownText.match(/!\[.*?\]\((.*?)\)/) !== null;
    };

    // 이미지 존재 여부 체크 함수
    const hasImage = (post) => {
        if (!post) return false;
        return post.imgUrl || hasMarkdownImage(post.body);
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModal(true);
    };
    
    const closeModal = () => {
        setModal(false);
        setSelectedImage('');
    };

    useEffect(() => {
        let mounted = true;
        
        if (id) {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const { data, error } = await supabase
                        .from('pro')
                        .select('*')
                        .eq('id', id)
                        .single();
    
                    if (error) throw error;
    
                    if (mounted) {
                        setSkeOut(true);
                        setTimeout(() => {
                            if (mounted) {
                                setPost(data);
                                setLoading(false);
                                setSkeOut(false);
                            }
                        }, 300);
                    }
                } catch (error) {
                    console.error('데이터 로딩 중 에러:', error);
                    if (mounted) {
                        setLoading(false);
                    }
                }
            };
            fetchData();
            
            return () => {
                mounted = false;
            }
        }
    }, [id]);

    const handleDelete = async () => {
        if (userUUID !== Post?.user_id) {
            alert("작성자만 삭제할 수 있습니다.");
            return;
        }

        if (!window.confirm("삭제하시겠습니까?")) return;

        try {
            const imageUrls = (Post.body.match(/!\[.*?\]\((.*?)\)/g) || [])
                .map(img => img.match(/\((.*?)\)/)[1]);

            for (const url of imageUrls) {
                const filePath = url.split('/public/')[1];
                if (filePath) {
                    await supabase.storage
                        .from('test_img')
                        .remove([filePath]);
                }
            }

            const { error } = await supabase
                .from('pro')
                .delete()
                .eq('id', Post.id);

            if (error) throw error;

            alert("삭제완료!");
            router.push('/data');
        } catch (error) {
            console.error('삭제 중 오류 발생:', error);
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    return (
        <>
            <div className="container px-4 pt-24 pb-16 mx-auto max-w-4xl relative z-10">
                {loading ? (
                    <div className={`transition-opacity duration-300 ${
                        skeOut ? 'opacity-0' : 'opacity-100'
                    }`}>
                        <DetailSkeleton />
                    </div>
                ) : (
                    <div className="animate-detail_opacity">
                        <div className="p-6 md:p-8">
                            <div className='flex justify-between items-center border-b border-gray-200 pb-4 mb-6'>
                                <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>
                                    {Post?.title || '제목없음'}
                                </h1>
                                {userUUID === Post?.user_id && (
                                    <div className="flex space-x-4">
                                        <button 
                                            onClick={() => router.push(`/data/details/${id}/Edit`)}
                                            className="px-4 py-2 bg-gray-200 text-gray-900 font-semibold rounded hover:bg-gray-300 transition-colors duration-200"
                                        >
                                            수정
                                        </button>
                                        <button 
                                            onClick={handleDelete} 
                                            className="text-red-500 hover:text-red-600 transition-colors duration-200"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className='space-y-6'>
                                {!hasImage(Post) && (
                                    <div className="relative aspect-[3/2] w-full">
                                        <Image
                                            alt="DataImg"
                                            src={defaultAvatar}
                                            className="w-full h-auto rounded-lg shadow-md"
                                            loading="eager"
                                            priority
                                            fill
                                            sizes="(max-width: 1200px) 100vw, 1200px"
                                            onClick={() => handleImageClick(defaultAvatar)}
                                        />
                                    </div>
                                )}

                                {Post?.imgUrl && (
                                    <div className="relative aspect-[3/2] w-full">
                                        <Image
                                            alt="DataImg"
                                            src={Post.imgUrl}
                                            className="w-full h-auto rounded-lg shadow-md"
                                            loading="eager"
                                            priority
                                            fill
                                            sizes="(max-width: 1200px) 100vw, 1200px"
                                            onClick={() => handleImageClick(Post.imgUrl)}
                                        />
                                    </div>
                                )}
                                
                                                   <div className={`${styles.markdownContent} text-gray-700 text-lg leading-relaxed`}>

                                    <ReactMarkdown 
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        components={{
                                            img: ({node, ...props}) => (
                                                <div className="my-6">
                                                    <Image 
                                                        {...props} 
                                                        width={800}
                                                        height={600}
                                                        className="w-full h-auto rounded-lg shadow-md cursor-pointer"
                                                        alt={props.alt || "게시글 이미지"}
                                                        onClick={() => handleImageClick(props.src)}
                                                    />
                                                </div>
                                            )
                                        }}
                                    >
                                        {Post?.body || ''}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Comment/>
            
            {Modal && selectedImage && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50"
                    onClick={closeModal}
                >
                    <div className="relative w-[95vw] h-[95vh] flex items-center justify-center">
                        <Image
                            src={selectedImage}
                            alt="Enlarged Image"
                            className="object-contain w-full h-full rounded-lg shadow-2xl"
                            layout="fill"
                            quality={100}
                        />
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                closeModal();
                            }}
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 transition-colors duration-200 bg-black bg-opacity-50 rounded-full p-2 sm:p-3 z-10"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}