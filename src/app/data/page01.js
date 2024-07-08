'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from "next/image";
import About from '../about/page';
import Loading from '../loading';
import Writing from "../component/writing";

const supabaseUrl = 'https://vwaofeoshpnacnpicind.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
    // let { data: first_data } = await supabase.from(page02').select('*')

export default function Data() {
    const [pro, setData] = useState([]);
    // const [titleValue, setTitleValue] = useState('');
    // const [bodyValue, setBodyValue] = useState('');
    // const [showForm, setShowForm] = useState(false);
    const [dataShow, ShowData] = useState(false)



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
    const handleDelete = async (title, body) => {
      try {

        if (pro.length === 1) {
         alert("삭제불가")
          return;
        }

        const {error} = await supabase.from('pro').delete().eq('title', title).eq('body', body);
      } catch (error) {
        console.log(error, '삭제 중 오류 발생')
      }

      setData(pro => pro.filter(item => item.title !== title || item.body !== body));
    };


//     const toggleForm = () => {
//       setShowForm(true);
//   };

//   const CloseForm = () => {
//     setShowForm(false);
// };





    // use stage 비어져있음 --> 데이터 호출전 표시 
    // 데이터 가져 온 후 setData 호출 --> pro 할당 
    // 데이터 가져오기 이전까지 비어있는 시간 --> 오류 
    // 비어있는 시간을 채워주기 위한 코드

    if (pro === null || pro.length === 0) {
      return <Loading />;
    }

    

  return (
    <>
{/* <div onClick={toggleForm} className= ' fixed z-40 right-10 bottom-10 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>글쓰기</div> 
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
      )} */}
    {/* <Writing/> */}

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
