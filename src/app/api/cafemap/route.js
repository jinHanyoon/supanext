import { NextResponse } from 'next/server';


export async function GET() {
    try {
        // API 호출
        const response = await fetch('http://api.kcisa.kr/openapi/API_CIA_090/request?serviceKey=' + process.env.CAFEMAP_API_KEY  );
        const textData = await response.text();
        
        // 받아온 데이터를 콘솔에 출력
        // console.log('API 응답 데이터:', textData);
        
        return NextResponse.json({data:textData});
        
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: error.message });
    }

}
