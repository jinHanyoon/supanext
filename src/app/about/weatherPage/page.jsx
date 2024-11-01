'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import useUserSession from '../../hooks/authdata';

export default function WeatherPage() {
    const [city, setCity] = useState('부산');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { userUUID } = useUserSession();
    const [cachedWeatherData, setCachedWeatherData] = useState({});
    const [vip] = useState('87136bc1-763b-4aae-b250-10f214d3c885');

    useEffect(() => {
        let isMounted = true; // 컴포넌트 마운트 상태 추적

        const fetchWeather = async (selectedCity) => {
            // 캐시된 데이터가 있는지 확인하고, 유효한 경우 상태 업데이트
            if (
                cachedWeatherData[selectedCity] && Date.now() - cachedWeatherData[selectedCity].timestamp < 600000 // 10분 이내의 데이터
            ) {
                if (isMounted) {
                    setWeatherData(cachedWeatherData[selectedCity].data);
                }
                return; // 캐시된 데이터가 유효하면 함수 종료
            }

            if (isMounted) {
                setLoading(true);
                setError(null);
            }

            try {
                // API 호출하여 날씨 데이터 가져오기
                const response = await axios.get(`/api/weather?city=${encodeURIComponent(selectedCity)}`);
                if (isMounted) {
                    // 응답 데이터 상태 업데이트
                    setWeatherData(response.data);
                    // 캐시 업데이트
                    setCachedWeatherData((prev) => ({
                        ...prev,
                        [selectedCity]: { data: response.data, timestamp: Date.now() },
                    }));
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || '서버 응답 오류');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchWeather(city);

        return () => {
            isMounted = false; // 클린업 시 마운트 상태 업데이트
        };
    }, [city, cachedWeatherData]);

    useEffect(() => {
        // 추가적인 로직이 필요하다면 여기에 작성
    }, [userUUID, vip]);

    const formatDateTime = (baseDate, baseTime) => {
        if (!baseDate || !baseTime) return '';

        const year = baseDate.slice(0, 4);
        const month = baseDate.slice(4, 6);
        const day = baseDate.slice(6, 8);
        const hour = baseTime.slice(0, 2);
        const minute = baseTime.slice(2, 4);

        const date = new Date(year, month - 1, day, hour, minute);
        const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

        return `${month}.${day}.(${weekdays[date.getDay()]}) ${hour}:${minute} 기준`;
    };

    const getTemperatureMessage = (temperature) => {
        if (temperature > 23) return '쪄죽을수도있는 날씨야...';
        if (temperature > 22) return '더워... 더워...';
        if (temperature > 21) return '특별히 쪼금 시원하게 입는걸 허용하겠다!';
        if (temperature > 20) return '슈잉 쪼금 더울수도있어..(삐질..)';
        if (temperature > 17) return '슈잉!날씨 너무 좋다 우리 산책하자!!';
        if (temperature > 15) return '슈잉!  날씨 좋다 안아주기 좋은 날씨야 히히';
        if (temperature > 14) return '슈잉! 날씨 좋다 안아주기 좋은 날씨야 히히';
        if (temperature > 13) return '슈잉! 날씨 좋다 안아주기 좋은 날씨야 히히';
        if (temperature > 12) return '어..조금 쌀쌀해진거같은데?';
        if (temperature > 11) return '어어.. 추워진다... 추워져...!';
        if (temperature > 10) return '슈잉..! 이제부터 시작이야... 안에 두어겹 입어';
        if (temperature > 5) return '슈잉.. 추워... 너 따시게입어야혀';
        if (temperature > 0) return '슈잉.. 꽁꽁 얼어 붙어 단단히 입어!';

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl w-full max-w-md transition-all duration-1000">
                {userUUID !== vip && (
                    <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">기상청 날씨 데이터</h1>
                )}
                {weatherData && (
                    <>
                        {userUUID === vip && (
                            <p className="text-m font-black text-indigo-700 bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-2xl border border-gray-100 mb-6 text-center transition-all duration-1000">
                                {getTemperatureMessage(weatherData.temperature)}
                            </p>
                        )}
                        {userUUID !== vip && (
                            <p className="text-s font-semibold text-indigo-700 bg-slate-100 p-4 rounded-lg shadow-md mb-6 text-center transition-all duration-1000">
                                {getTemperatureMessage02(weatherData.temperature)}
                            </p>
                        )}
                    </>
                )}
                <div className="grid grid-cols-2 gap-2 mb-6">
                    {['부산', '창원', '연산', '서면', '명지', '남포', '서울', '강원도'].map((cityName) => (
                        <button
                            key={cityName}
                            onClick={() => setCity(cityName)}
                            className={`px-4 py-2 rounded-lg transition duration-300 text-sm font-medium ${
                                city === cityName
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg transform scale-105'
                                    : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'
                            }`}
                        >
                            {cityName}
                        </button>
                    ))}
                </div>
                <div className="bg-gray-50 rounded-xl p-4 min-h-[200px] flex items-center justify-center transition-all duration-1000">
                    {error ? (
                        <p className="text-red-500 text-center font-medium">잠시 후 다시 시도해주세요!</p>
                    ) : loading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
                        </div>
                    ) : weatherData ? (
                        <div className="w-full space-y-4">
                            <p className="text-right font-extrabold text-neutral-800">
                                {formatDateTime(weatherData.baseDate, weatherData.baseTime)}
                            </p>
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
