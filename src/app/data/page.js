'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from "next/image";

const supabaseUrl = 'https://vwaofeoshpnacnpicind.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
    // let { data: first_data } = await supabase.from(page02').select('*')

export default function Data() {
    const [pro, setData] = useState([]);
    const [titleValue, setTitleValue] = useState('');
    const [bodyValue, setBodyValue] = useState('');
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
      async function render() {
      //  전체를 불러오기

      // data pro == >pro 에 data 를 할당 
        const { data: pro } = await supabase.from('pro').select('*');
        setData(pro);
      }
      render();
    },
    [pro]);
    // useEffect 데이터를 새로 불러와야 하는데 현재 상태는 로딩 때 한번만 불러오는 상태 
    // 다시 불러오기 위해 종속값 pro을 넣어줘야함

    const handleSubmit = async () => {
      try {
        const { data: error } =await supabase.from('pro').insert([{ title:titleValue, body:bodyValue },]);
        setData([...pro]);
      // 새로운 데이터가 추가된 후에 페이지 데이터에 반영
        // 입력 필드 초기화
        setTitleValue('');
        setBodyValue('');
        setShowForm(false)
      } 
      catch (error){
        console.log('데이터 추가 중 오류 발생',error)
      } 
    };

    const handleDelete = async (title, body) => {
      try {
        const {error} = await supabase.from('pro').delete().eq('title', title).eq('body', body);
      } catch (error) {
        console.log(error, '삭제 중 오류 발생')
      }

      setData(pro => pro.filter(item => item.title !== title || item.body !== body));
    };


    const toggleForm = () => {
      setShowForm(true);
  };

  const CloseForm = () => {
    setShowForm(false);
};



    // use stage 비어져있음 --> 데이터 호출전 표시 
    // 데이터 가져 온 후 setData 호출 --> pro 할당 
    // 데이터 가져오기 이전까지 비어있는 시간 --> 오류 
    // 비어있는 시간을 채워주기 위한 코드

    if (pro === null) {
      return (
        <div className="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
            <span className="sr-only">Loading...</span>
        </div>
    </div>
    )
  }

  return (
    <>
<div onClick={toggleForm} className= ' fixed z-50 right-10 bottom-10 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>글쓰기</div> 
{showForm  && (
        <div className='bg-neutral-500/50 w-full h-screen fixed z-50 top-0' >
          <div className='w-9/12 h-full m-auto relative flex flex-col items-end'  >
      <div className='absolute top-14 right-2 w-8 h-1/10 bg-rose-400 hover:bg-rose-500 rounded-full text-center font-bold text-white leading-loose' onClick={CloseForm}>X</div>

          <input
            className="block  p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-12 "
            placeholder="제목"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
          <textarea
            className="block p-2.5 h-96 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
            placeholder="내용"
            value={bodyValue}
            onChange={(e) => setBodyValue(e.target.value)}
          />
          <div onClick={handleSubmit} className='text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20 mt-3'>저장</div>
          </div>
        </div>
      )}

<div className="container px-5 py-24 mx-auto" >
        <div className="flex flex-wrap -m-4">
           

{/* <ClickHad/> */}

    {/* pro title 불러오는 코드 */}

    {/* 클릭이후 한번 더 불러와줘야 함 */}
 {pro.map(pro => (
  <div key={pro.id} className="lg:w-1/4 md:w-1/2 p-4 w-full ">
          <a className="block relative h-48 rounded overflow-hidden">
            <Image alt="ecommerce"
  className="object-cover object-center w-full h-full block hover:opacity-50 "
  src="/img/img04.jpg"
   width={300} height={300}/>
   <p onClick={() => handleDelete(pro.title, pro.body)} className="absolute top-2 right-2 w-1/12 h-1/6 bg-sky-300/50 rounded-full text-center font-bold text-white leading-loose hover:bg-blue-800">X</p>
          </a>
          <div className="mt-4">
            <h2 className="text-gray-500 text-xs tracking-widest title-font mb-1">SupaBase</h2>
            <h3 className="text-gray-900 title-font text-lg font-medium">{pro.title}</h3>
            <p  className="mt-1">{pro.body}</p>
          </div>
        </div>
))}
  
{/* 데이터 저장 후 Data 함수 불러와줘야 함 */}




</div>
</div>
    </>
  );
}
