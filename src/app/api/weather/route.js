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

// function getCurrentTime() {
//     // 한국 시간으로 변환
//     const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" });
//     const koreaTime = new Date(now);
    
//     // 시간, 분 계산
//     const hours = koreaTime.getHours();
//     const minutes = koreaTime.getMinutes() < 45 ? "00" : "45";
    
//     return {
//         baseDate: koreaTime.toISOString().slice(0, 10).replace(/-/g, ''),
//         baseTime: `${String(hours).padStart(2, '0')}${minutes}`
//     };
// }

function getCurrentTime() {
    // 한국 시간으로 변환
    const now = new Date();
    // 테스트용 날짜 대신 실제 현재 날짜 사용
    const koreaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
    
    let hours = koreaTime.getHours();
    let baseDate = koreaTime.toISOString().slice(0, 10).replace(/-/g, '');
    
    // 40분 이전이면 한 시간 전 데이터를 요청
    if (koreaTime.getMinutes() < 40) {
        hours = hours - 1;
        // 자정 이전이면 이전 날짜의 마지막 데이터를 요청
        if (hours < 0) {
            hours = 23;
            const yesterday = new Date(koreaTime);
            yesterday.setDate(yesterday.getDate() - 1);
            baseDate = yesterday.toISOString().slice(0, 10).replace(/-/g, '');
        }
    }
    
    return {
        baseDate: baseDate,
        baseTime: `${String(hours).padStart(2, '0')}00`
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
// async function fetchAllWeatherData() {
//     const weatherPromises = Object.entries(CITY_COORDINATES).map(async ([city, coords]) => {
//         const { baseDate, baseTime } = getCurrentTime();
//         const url = `${process.env.WEATHER_API_URL}/getUltraSrtNcst?` + 
//             `serviceKey=${encodeURIComponent(process.env.WEATHER_API_KEY)}&` +
//             `pageNo=1&numOfRows=1000&dataType=JSON&` +
//             `base_date=${baseDate}&base_time=${baseTime}&` +
//             `nx=${coords.nx}&ny=${coords.ny}`;
            
//         const data = await fetchWeatherData(url);
//         return {
//             city,
//             data: {
//                 temperature: data.response.body.items.item.find(i => i.category === 'T1H')?.obsrValue,
//                 humidity: data.response.body.items.item.find(i => i.category === 'REH')?.obsrValue,
//                 precipitation: data.response.body.items.item.find(i => i.category === 'RN1')?.obsrValue,
//                 windSpeed: data.response.body.items.item.find(i => i.category === 'WSD')?.obsrValue,
//                 baseDate,
//                 baseTime
//             }
//         };
//     });

//     return Promise.all(weatherPromises);
// }

async function fetchAllWeatherData() {
    const weatherPromises = Object.entries(CITY_COORDINATES).map(async ([city, coords]) => {
        try {
            const { baseDate, baseTime } = getCurrentTime();
            const url = `${process.env.WEATHER_API_URL}/getUltraSrtNcst?` + 
                `serviceKey=${encodeURIComponent(process.env.WEATHER_API_KEY)}&` +
                `pageNo=1&numOfRows=1000&dataType=JSON&` +
                `base_date=${baseDate}&base_time=${baseTime}&` +
                `nx=${coords.nx}&ny=${coords.ny}`;
                
            console.log('요청 URL:', url); // URL 확인
            const data = await fetchWeatherData(url);
            console.log(`${city} 날씨 데이터:`, data); // 응답 데이터 확인
            
            if (!data?.response?.body?.items?.item) {
                console.error(`API 응답 오류 (${city}):`, data);
                return {
                    city,
                    data: {
                        temperature: null,
                        humidity: null,
                        precipitation: null,
                        windSpeed: null,
                        baseDate,
                        baseTime,
                        error: '데이터를 가져올 수 없습니다'
                    }
                };
            }

            const items = data.response.body.items.item;
            const weatherData = {
                city,
                data: {
                    temperature: items.find(i => i.category === 'T1H')?.obsrValue || null,
                    humidity: items.find(i => i.category === 'REH')?.obsrValue || null,
                    precipitation: items.find(i => i.category === 'RN1')?.obsrValue || null,
                    windSpeed: items.find(i => i.category === 'WSD')?.obsrValue || null,
                    baseDate,
                    baseTime
                }
            };
            console.log(`${city} 가공된 데이터:`, weatherData); // 가공된 데이터 확인
            return weatherData;
        } catch (error) {
            console.error(`${city} 날씨 데이터 처리 오류:`, error);
            return {
                city,
                data: {
                    temperature: null,
                    humidity: null,
                    precipitation: null,
                    windSpeed: null,
                    baseDate: null,
                    baseTime: null,
                    error: '데이터 처리 중 오류가 발생했습니다'
                }
            };
        }
    });

    const results = await Promise.all(weatherPromises);
    console.log('최종 결과:', results); // 최종 결과 확인
    return results;
}


// 캐시 저장소
let weatherCache = {
    data: null,
    timestamp: 0,
    city:null,
};

// const CACHE_DURATION = 40 * 60 * 1000;

// // 캐시된 데이터 확인
// function getCachedData(city) {
//     const now = Date.now();
    
//     // 캐시가 있고, 50분 안지났으면 캐시 데이터 사용
//     if (weatherCache.data && 
//         weatherCache.city === city && 
//         now - weatherCache.timestamp < CACHE_DURATION) {
//         console.log('캐시된 데이터 사용 ! 🚀');
//         return weatherCache.data;
//     }
    
//     return null;
// }

// 캐시 저장 시간을 30분으로 수정
const CACHE_DURATION = 30 * 60 * 1000;

// 캐시된 데이터 확인 함수 수정
function getCachedData(city) {
    const now = Date.now();
    const currentMinutes = new Date().getMinutes();
    
    // 현재 시각이 40~45분 사이라면 캐시를 무시하고 새로운 데이터를 가져오도록 설정
    if (currentMinutes >= 40 && currentMinutes < 45) {
        return null;
    }
    
    // 캐시가 있고, 30분 안지났으면 캐시 데이터 사용
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