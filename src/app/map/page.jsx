'use client';
import { useEffect, useState } from 'react';

export default function TestPage() {
    const [cafeList, setCafeList] = useState([]);
    const [ModalOpen, setModal] = useState(false)
    useEffect(() => {
        async function getData() {
            try {
                // '/api/cafemap' API로부터 데이터 가져오기
                const response = await fetch('/api/cafemap');
                // 응답을 JSON 형식으로 변환
                const result = await response.json();

                // XML 문자열을 XML 문서로 파싱
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(result.data, "text/xml");

                // 'item' 태그를 가진 모든 요소 가져오기
                const items = xmlDoc.getElementsByTagName('item');
                console.log(xmlDoc)
                // 부산 카페 데이터를 저장할 배열 초기화
                const busanData = [];

                // 모든 'item' 요소를 반복
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    const address = item.getElementsByTagName('ADDRESS')[0].textContent;

                    // 주소가 존재하고 '부산'이 포함되어 있는지 확인
                    if (address.includes('부산')) {
                        const title = item.getElementsByTagName('TITLE')[0].textContent;
                        const sub_description	=item.getElementsByTagName('SUB_DESCRIPTION')[0].textContent;

                        const description  =item.getElementsByTagName('DESCRIPTION')[0].textContent;// 제목과 주소를 객체로 추가

                        busanData.push({ title, address,sub_description,description });
                    }
                }

                // 부산 카페 목록 상태 업데이트
                setCafeList(busanData);

            } catch (error) {
                // 에러 발생 시 콘솔에 에러 메시지 출력
                console.log('에러 발생:', error);
            }
        }

        // getData 함수 호출
        getData();
    }, []);

    const modal = (e) => {
        e.stopPropagation();
        setModal(true);
    }

    return (
        <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
        <h1 className="text-5xl font-extrabold text-center text-indigo-700 mb-12 pt-24">도서관 카페</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {cafeList.map((cafe, index) => (
                <div className="cafe-card bg-white shadow-md rounded-2xl p-6 border border-gray-100" key={index} onClick={(e) => modal(e)}>
                    <h2 className="text-2xl font-semibold text-indigo-600">{cafe.title}</h2>
                    <p className="text-gray-700 mt-3">주소: <span className="font-medium text-gray-900">{cafe.address}</span></p>
                    <p className="text-gray-600 mt-1">{cafe.sub_description}</p>
                 
               <div className='flex flex-col gap-5'>  
                    <p className="text-gray-600 mt-2">{cafe.description}</p>
                </div>
                </div>
            ))}
        </div>
    </div>
    );
} 