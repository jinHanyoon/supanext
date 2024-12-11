import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('http://api.kcisa.kr/openapi/API_CIA_090/request?serviceKey=' + process.env.CAFEMAP_API_KEY);
        const textData = await response.text();
        
        return new NextResponse(JSON.stringify({ data: textData }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
        
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
    }
}


