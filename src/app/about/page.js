'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
export default function About() {
    const [city, setCity] = useState('부산');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWeather(city);
    }, [city]);
    //    매개변수 city ->selectedCity
    //     city 의 값을 selectedCity 에 넣음
    //     api 에 호출 city 이름이 selectedCity 를 가진 데이터를 호출
    //     예)city 서울 => selectedCity == (서울), weather 에서 서울 이름을 가진 데이터를 가져옴
    //     호출하는 코드
    const fetchWeather = async (selectedCity) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/api/weather?city=${selectedCity}`);
            setWeatherData(response.data); // 응답 데이터에서 날씨 데이터 설정
        } catch (err) {
            setError(err.message, "서버 응답오류"); // 에러 메시지 설정
        } finally {
            setLoading(false); // 로딩 상태 종료
        }
    };




   

    return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl w-full max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">기상청 날씨 데이터</h1>
        <div className="grid grid-cols-2 gap-2 mb-6">
            {['부산', '창원', '연산동', '서면', '명지', '남포동'].map((cityName) => (
                <button
                    key={cityName}
                    onClick={() => setCity(cityName)}
                    className={`px-3 py-2 rounded-lg ${
                        city === cityName ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-700'
                    } focus:outline-none transition duration-300 text-sm font-medium`}
                >
                    {cityName}
                </button>
            ))}
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
                        <span className="text-base font-semibold text-gray-700">온도</span>
                        <span className="text-lg font-bold text-indigo-600">{weatherData.temperature}°C</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-gray-700">습도</span>
                        <span className="text-lg font-bold text-indigo-600">{weatherData.humidity}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-gray-700">강수량</span>
                        <span className="text-lg font-bold text-indigo-600">{weatherData.precipitation}mm</span>
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