'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import useUserSession from '../hooks/authdata';
export default function About() {
    const [city, setCity] = useState('부산');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const {userUUID} =  useUserSession()
  const [cachedWeatherData, setCachedWeatherData] = useState({});
    const [vip] =useState('87136bc1-763b-4aae-b250-10f214d3c885')

    useEffect(() => {
        fetchWeather(city);
    }, [city, userUUID,vip]);
    //    매개변수 city ->selectedCity
    //     city 의 값을 selectedCity 에 넣음
    //     api 에 호출 city 이름이 selectedCity 를 가진 데이터를 호출
    //     예)city 서울 => selectedCity == (서울), weather 에서 서울 이름을 가진 데이터를 가져옴
    //     호출하는 코드


    const fetchWeather = async (selectedCity) => {
        if (cachedWeatherData[selectedCity] && Date.now() - cachedWeatherData[selectedCity].timestamp < 600000) { // 10분 이내의 데이터
            setWeatherData(cachedWeatherData[selectedCity].data);
            return;
        }
    
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/api/weather?city=${selectedCity}`);
            setWeatherData(response.data);
            setCachedWeatherData(prev => ({
                ...prev,
                [selectedCity]: { data: response.data, timestamp: Date.now() }
            }));
        } catch (err) {
            setError(err.message, "서버 응답오류");
        } finally {
            setLoading(false);
        }
    };
    


// 온도에 따른 메시지를 반환하는 함수
const getTemperatureMessage = (temperature) => {
    if (temperature > 23) return '쪄죽을수도있는 날씨야...';
    if (temperature > 22) return '더워... 더워...';
    if (temperature > 21) return '특별히 쪼금 시원하게 입는걸 허용하겠다!';
    if (temperature > 20) return '슈잉 쪼금 더울수도있어..';
    if (temperature > 17) return '가을날씨 너무 좋다 우리 산책하자!';
    if (temperature > 15) return '슈잉 날씨 좋다 우리 같이 걷기 좋은 날씨야';
    if (temperature > 10) return '슈잉.. 이제부터 시작이야 안에 두어겹 입어';
    if (temperature > 5) return '슈잉 추워... 너 따시게입어야혀';
    if (temperature > 0) return '슈잉 꽁꽁 얼어 붙어 단단히 입어';

    return '슈잉... 난 얼었셔';
};

const getTemperatureMessage02 = (temperature) => {
    if (temperature > 23) return '매우 더운 날씨입니다. 열사병에 주의하세요.';
    if (temperature > 22) return '더운 날씨입니다. 시원하게 지내세요.';
    if (temperature > 21) return '따뜻한 날씨입니다. 적당한 옷차림을 하세요.';
    if (temperature > 20) return '쾌적한 날씨입니다. 외출하기 좋습니다.';
    if (temperature > 17) return '선선한 날씨입니다. 가벼운 겉옷을 준비하세요.';
    if (temperature > 15) return '약간 쌀쌀합니다. 얇은 겉옷을 챙기세요.';
    if (temperature > 10) return '쌀쌀한 날씨입니다. 따뜻하게 입으세요.';
    if (temperature > 5) return '추운 날씨입니다. 두꺼운 옷을 입으세요.';
    if (temperature > 0) return '매우 추운 날씨입니다. 동상에 주의하세요.';

    return '극도로 추운 날씨입니다. 외출을 자제하세요.';
};


// 87136bc1-763b-4aae-b250-10f214d3c885
   

    return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl w-full max-w-md">
    {userUUID !== vip &&(
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">기상청 날씨 데이터</h1>
    )}       
        {weatherData && (
            <>
            {/* 지정 된 사람만 나오는 메시지 */}
            {userUUID == vip &&(
                <p className="text-m font-semibold text-indigo-700 bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-2xl shadow-md border border-gray-100 mb-6 text-center transition-all duration-300 hover:shadow-lg hover:scale-105">
    {getTemperatureMessage(weatherData.temperature)}
</p>
   )}
            {/* 지정 되지 않는 사람만 나오는 메시지 */}
            {userUUID !== vip &&(
            <p className="text-s font-semibold text-indigo-700 bg-slate-100 p-4 rounded-lg shadow-md mb-6 text-center">
    {getTemperatureMessage02(weatherData.temperature)}
</p>
            )}
       </>
   
    )}
      <div className="grid grid-cols-2 gap-2 mb-6">
    <button
        onClick={() => setCity('부산')}
        className={`px-3 py-2 rounded-lg ${
            city === '부산' ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-700'
        } focus:outline-none transition duration-300 text-sm font-medium`}
    >
        부산
    </button>
    <button
        onClick={() => setCity('창원')}
        className={`px-3 py-2 rounded-lg ${
            city === '창원' ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-700'
        } focus:outline-none transition duration-300 text-sm font-medium`}
    >
        창원
    </button>
    <button
        onClick={() => setCity('연산동')}
        className={`px-3 py-2 rounded-lg ${
            city === '연산동' ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-700'
        } focus:outline-none transition duration-300 text-sm font-medium`}
    >
        연산동
    </button>
    <button
        onClick={() => setCity('서면')}
        className={`px-3 py-2 rounded-lg ${
            city === '서면' ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-700'
        } focus:outline-none transition duration-300 text-sm font-medium`}
    >
        서면
    </button>
    <button
        onClick={() => setCity('명지')}
        className={`px-3 py-2 rounded-lg ${
            city === '명지' ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-700'
        } focus:outline-none transition duration-300 text-sm font-medium`}
    >
        명지
    </button>
    <button
        onClick={() => setCity('남포동')}
        className={`px-3 py-2 rounded-lg ${
            city === '남포동' ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-700'
        } focus:outline-none transition duration-300 text-sm font-medium`}
    >
        남포동
    </button>
</div>
        <div className="bg-gray-50 rounded-xl p-4 min-h-[200px] flex items-center justify-center">
            {error ? (
                <p className="text-red-500 text-center font-medium">{error}</p>
            ) : loading ? (
                <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
            ) : weatherData ? (
                <div className="w-full space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-700 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                        </svg>
                        온도
                    </span>
                    <span className="text-lg font-bold text-indigo-600">{weatherData.temperature}°C</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-700 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        습도
                    </span>
                    <span className="text-lg font-bold text-indigo-600">{weatherData.humidity}%</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-700 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        강수량
                    </span>
                    <span className="text-lg font-bold text-indigo-600">{weatherData.precipitation}mm</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-700 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                        </svg>
                        풍속
                    </span>
                    <span className="text-lg font-bold text-indigo-600">{weatherData.windSpeed}m/s</span>
                </div>
            </div>
            ) : (
                <p className="text-gray-600">날씨 정보를 선택하세요</p>
            )}
        </div>
    </div>
</div>
    );
}


 

// const fetchWeather = (selectedCity) => {
//     setLoading(true);
//     setError(null);
//     // 경로를 찾아서 호출
//     fetch(`/api/weather?city=${selectedCity}`)
//         .then(res => {
//             if (!res.ok) {
//                 throw new Error('서버 응답 오류');
//             }
//             return res.json();
//         })
//         .then(data => {
//             if (data.error) {
//                 throw new Error(data.error);
//             }
//             setWeatherData(data.weatherData);

//         })
//         .catch(err => {
//             setError(err.message);
//         })
//         .finally(() => {
//             setLoading(false);
//         });

// };