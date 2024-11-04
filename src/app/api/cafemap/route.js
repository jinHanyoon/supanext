import { NextResponse } from 'next/server';


export async function GET() {
    try {
        const response = await fetch('http://api.kcisa.kr/openapi/API_CIA_090/request?serviceKey=' + process.env.CAFEMAP_API_KEY);
        const xmlData = await response.text();
        
        // XML 데이터를 그대로 전달
        return new NextResponse(xmlData, {
            status: 200,
            headers: {
                'Content-Type': 'text/xml', // XML 컨텐츠 타입으로 변경
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
            },
        });
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse(JSON.stringify({ error: '데이터 가져오기 실패' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
    }
}


