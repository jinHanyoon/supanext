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
export default function Data() {
    const [pro, setData] = useState([]);
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


    if (pro === null || pro.length === 0) {
      return <Loading />;
    }

    

  return (
    <>


<div className="container px-5 py-24 mx-auto" >
        <div className="flex flex-wrap -m-4">

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
  

</div>
</div>
    </>

  );
}
