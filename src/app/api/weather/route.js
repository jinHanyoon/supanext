import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    const apiKey = process.env.WEATHER_API_KEY;
    const apiUrl = process.env.WEATHER_API_URL;

    if (!apiKey || !apiUrl) {
        throw new Error('API 설정 오류');
    }

    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 10).replace(/-/g, '');
    const formattedTime = `${String(now.getHours()).padStart(2, '0')}00`;

    const coordinates = {
        부산: { nx: 98, ny: 76 },
        서울: { nx: 60, ny: 127 }
    };

    const { nx, ny } = coordinates[city] || coordinates['부산'];

    const url = `${apiUrl}/getUltraSrtNcst?serviceKey=${encodeURIComponent(apiKey)}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${formattedDate}&base_time=${formattedTime}&nx=${nx}&ny=${ny}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('API 요청 실패');

        const { response: { body: { items: { item } } } } = await response.json();

        const weatherData = {
            온도: item.find(i => i.category === 'T1H')?.obsrValue,
            습도: item.find(i => i.category === 'REH')?.obsrValue,
            강수량: item.find(i => i.category === 'RN1')?.obsrValue,
            풍속: item.find(i => i.category === 'WSD')?.obsrValue,
            풍향: item.find(i => i.category === 'VEC')?.obsrValue,
            동서바람성분: item.find(i => i.category === 'UUU')?.obsrValue,
            남북바람성분: item.find(i => i.category === 'VVV')?.obsrValue,
            강수형태: item.find(i => i.category === 'PTY')?.obsrValue
        };

        return NextResponse.json(weatherData);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}