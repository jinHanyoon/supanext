import { NextResponse } from 'next/server';

// 도시별 좌표 정보
const CITY_COORDINATES = {
    부산: { nx: 98, ny: 76 },
    서울: { nx: 60, ny: 127 },
    창원: { nx: 90, ny: 77 },
    명지: { nx: 97, ny: 74 },
    연산: { nx: 99, ny: 75 },
    서면: { nx: 97, ny: 75 },
    남포: { nx: 97, ny: 74 },
    강원도: { nx: 73, ny: 134 }
};

function getCurrentTime() {
    // 한국 시간으로 변환
    const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" });
    const koreaTime = new Date(now);
    
    // 시간, 분 계산
    const hours = koreaTime.getHours();
    const minutes = koreaTime.getMinutes() < 45 ? "00" : "45";
    
    return {
        baseDate: koreaTime.toISOString().slice(0, 10).replace(/-/g, ''),
        baseTime: `${String(hours).padStart(2, '0')}${minutes}`
    };
}

// 날씨 데이터 가져오기
async function fetchWeatherData(url) {
    for (let i = 0; i < 5; i++) {
        const response = await fetch(url);

        
        if (response.ok) {
            return await response.json();
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    throw new Error('날씨 데이터 가져오기 실패');
}


// 모든 도시의 날씨 데이터를 한번에 가져오는 함수
async function fetchAllWeatherData() {
    const weatherPromises = Object.entries(CITY_COORDINATES).map(async ([city, coords]) => {
        const { baseDate, baseTime } = getCurrentTime();
        const url = `${process.env.WEATHER_API_URL}/getUltraSrtNcst?` + 
            `serviceKey=${encodeURIComponent(process.env.WEATHER_API_KEY)}&` +
            `pageNo=1&numOfRows=1000&dataType=JSON&` +
            `base_date=${baseDate}&base_time=${baseTime}&` +
            `nx=${coords.nx}&ny=${coords.ny}`;
            
        const data = await fetchWeatherData(url);
        return {
            city,
            data: {
                temperature: data.response.body.items.item.find(i => i.category === 'T1H')?.obsrValue,
                humidity: data.response.body.items.item.find(i => i.category === 'REH')?.obsrValue,
                precipitation: data.response.body.items.item.find(i => i.category === 'RN1')?.obsrValue,
                windSpeed: data.response.body.items.item.find(i => i.category === 'WSD')?.obsrValue,
                baseDate,
                baseTime
            }
        };
    });

    return Promise.all(weatherPromises);
}


// 캐시 저장소
let weatherCache = {
    data: null,
    timestamp: 0,
    city:null,
};

const CACHE_DURATION = 40 * 60 * 1000;

// 캐시된 데이터 확인
function getCachedData(city) {
    const now = Date.now();
    
    // 캐시가 있고, 50분 안지났으면 캐시 데이터 사용
    if (weatherCache.data && 
        weatherCache.city === city && 
        now - weatherCache.timestamp < CACHE_DURATION) {
        console.log('캐시된 데이터 사용 ! 🚀');
        return weatherCache.data;
    }
    
    return null;
}



// 메인 핸들러
export async function GET() {
    try {
        // 캐시 확인
        const cachedData = getCachedData('ALL_CITIES');
        if (cachedData) {
        console.log('모든데이터 가져오기')
            return NextResponse.json(cachedData);
        }

        // 모든 도시 데이터 한번에 가져오기
        const allWeatherData = await fetchAllWeatherData();
        // 객체 형태로 변환
        const weatherDataMap = allWeatherData.reduce((acc, { city, data }) => {
            acc[city] = data;
            return acc;
        }, {});

        // 캐시 저장
        weatherCache = {
            data: weatherDataMap,
            city: 'ALL_CITIES',
            timestamp: Date.now()
        };

        return NextResponse.json(weatherDataMap);

    } catch (error) {
        console.error('에러:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}