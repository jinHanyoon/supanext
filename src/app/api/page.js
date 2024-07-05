'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from "next/image";
import About from '../about/page';
import Writing from '../component/writing'
import Loading from '../loading';
const supabaseUrl = 'https://vwaofeoshpnacnpicind.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
    // let { data: first_data } = await supabase.from(page02').select('*')

export default function Data() {
    const [pro, setData] = useState([]);
    const [titleValue, setTitleValue] = useState('');
    const [bodyValue, setBodyValue] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [dataShow, ShowData] = useState(false)

    
    // useEffect(() => {
    //   async function render() {
    //   //  전체를 불러오기
    //   // data pro == >pro 에 data 를 할당 
    //     const { data: pro } = await supabase.from('pro').select('*');
    //     setData(pro);

    //   }
    //   render();
    // },
    // [pro]);
    // useEffect 데이터를 새로 불러와야 하는데 현재 상태는 로딩 때 한번만 불러오는 상태 
    // 다시 불러오기 위해 종속값 pro을 넣어줘야함

    // const handleSubmit = async () => {
    //   try {
    //     const { data: error } =await supabase.from('pro').insert([{ title:titleValue, body:bodyValue },]);
    //     setData([...pro]);
    //   // 새로운 데이터가 추가된 후에 페이지 데이터에 반영
    //     // 입력 필드 초기화
    //     setTitleValue('');
    //     setBodyValue('');
    //     setShowForm(false)
    //   } 
    //   catch (error){
    //     console.log('데이터 추가 중 오류 발생',error)
    //   } 
    // };

//     const handleDelete = async (title, body) => {
//       try {

//         if (pro.length === 1) {
//          alert("삭제불가")
//           return;
//         }

//         const {error} = await supabase.from('pro').delete().eq('title', title).eq('body', body);
//       } catch (error) {
//         console.log(error, '삭제 중 오류 발생')
//       }

//       setData(pro => pro.filter(item => item.title !== title || item.body !== body));
//     };


//     const toggleForm = () => {
//       setShowForm(true);
//   };

//   const CloseForm = () => {
//     setShowForm(false);
// };

return(
    <>
       <About pro={pro} />
       <Writing pro={pro} />
    </>
)
}
