'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from "next/image";

const supabaseUrl = 'https://geoateqvsqtelzushdpi.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
    // let { data: first_data } = await supabase.from('page01').select('*')

export default function Data() {
    const [page01, setData] = useState([]);

    
    useEffect(() => {
      async function render() {
       
      //  전체를 불러오기
        const { data: page01 } = await supabase.from('page01').select('*');
        setData(page01);
      }
      render();
    }, []);


    // use stage 비어져있음 --> 데이터 호출전 표시 
    // 데이터 가져 온 후 setData 호출 --> page01 할당 
    // 데이터 가져오기 이전까지 비어있는 시간 --> 오류 
    // 비어있는 시간을 채워주기 위한 코드

    if (!page01.length) {
        return <div>Loading...</div>;
      }
  return (
    <>

<section className="text-gray-600 body-font h-100vh">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">

    {/* page01 title 불러오는 코드 */}

    {/* 클릭이후 한번 더 불러와줘야 함 */}
 {page01.map(page01 => (
  <div key={page01[0]} className="lg:w-1/4 md:w-1/2 p-4 w-full">
          <a className="block relative h-48 rounded overflow-hidden">
            <Image alt="ecommerce"
  className="object-cover object-center w-full h-full block"
  src="/img/img04.jpg"
   width={300} height={300}/>
          </a>
          <div className="mt-4">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{page01.title}</h3>
            <h2 className="text-gray-900 title-font text-lg font-medium">The 400 Blows</h2>
            <p className="mt-1">{page01.body}</p>
          </div>
        </div>
 ))}
    {/* <h1 key={page01[1]}>{page01.body}</h1> */} 
    {/* <h1 key={page01[1]}>{page01.body}</h1>  */}

    {/* <h1 key={title_data[1].id}>{title_data[1].title}</h1> */}
 </div>
    </div>
    </section>


    </>
  );
}
