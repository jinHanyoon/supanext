import { NextResponse } from 'next/server';


export async function GET() {
    try {
        // API 호출
        const response = await fetch('http://api.kcisa.kr/openapi/API_CIA_090/request?serviceKey=' + process.env.CAFEMAP_API_KEY  );
        const textData = await response.text();
        

        // 받아온 데이터를 콘솔에 출력
        // console.log('API 응답 데이터:', textData);
            // CORS 헤더 추가
    const res = NextResponse.json({ data: textData });
    res.headers.append('Access-Control-Allow-Origin', '*'); // 모든 도메인 허용
    res.headers.append('Access-Control-Allow-Methods', 'GET, OPTIONS'); // 허용할 HTTP 메서드
    
    return res;


        // return NextResponse.json({data:textData});
        
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: error.message });
    }

}


