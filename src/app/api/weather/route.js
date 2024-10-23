import { NextResponse } from 'next/server';
// GET 요청을 처리하는 함수
export async function GET(request) {
    // 요청 URL에서 쿼리 파라미터를 가져옴
    const { searchParams } = new URL(request.url);
    // 'city' 파라미터를 가져오고, 없으면 기본값으로 '부산'을 사용
    const city = searchParams.get('city') || '부산';
    // 환경 변수에서 API 키와 URL을 가져옴
    const apiKey = process.env.WEATHER_API_KEY;
    const apiUrl = process.env.WEATHER_API_URL;
    // API 키나 URL이 없으면 오류 발생
    if (!apiKey || !apiUrl) {
        throw new Error('API 설정 오류');
    }
    // 현재 날짜와 시간을 가져옴
    const now = new Date();
    // 날짜를 'YYYYMMDD' 형식으로 포맷
    const formattedDate = now.toISOString().slice(0, 10).replace(/-/g, '');
    // 시간을 'HH00' 형식으로 포맷
    const formattedTime = `${String(now.getHours()).padStart(2, '0')}00`;

    
    // 도시별 좌표를 설정
    const coordinates = {
        부산: { nx: 98, ny: 76 },
        창원: { nx: 90, ny: 77 },
        명지: { nx: 97, ny: 74 },
        연산동: { nx: 99, ny: 75 }, // 부산 연산동의 정확한 좌표
        서면: { nx: 97, ny: 75 },
        남포동: { nx: 97, ny: 74 }
    };
    // 선택한 도시의 좌표를 가져오고, 없으면 기본값으로 부산의 좌표 사용
    const { nx, ny } = coordinates[city] || coordinates['부산'];

    // API 요청 URL을 생성
    const url = `${apiUrl}/getUltraSrtNcst?serviceKey=${encodeURIComponent(apiKey)}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${formattedDate}&base_time=${formattedTime}&nx=${nx}&ny=${ny}`;

    try {
        // API에 요청을 보냄
        const response = await fetch(url);
       
         // JSON 형식으로 응답을 파싱
         const jsonResponse = await response.json();
    console.log('API 응답:', jsonResponse);
       
         // 응답이 성공적이지 않으면 오류 발생
        if (!response.ok) throw new Error('API 요청 실패');

  
        // 필요한 날씨 데이터를 추출
        const weatherData = {
        //    온도
            temperature: jsonResponse.response.body.items.item.find(i => i.category === 'T1H')?.obsrValue,
        //   습도
            humidity: jsonResponse.response.body.items.item.find(i => i.category === 'REH')?.obsrValue,
        //    강수량
            precipitation: jsonResponse.response.body.items.item.find(i => i.category === 'RN1')?.obsrValue
        };
        // 날씨 데이터를 JSON 형식으로 반환
        return NextResponse.json(weatherData);
    } catch (error) {
        // 오류가 발생하면 오류 메시지를 JSON 형식으로 반환
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}