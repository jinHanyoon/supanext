'use client'
import { useState, useEffect } from 'react';

export default function About() {
    const [city, setCity] = useState('부산');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWeather(city);
    }, [city]);

    const fetchWeather = (selectedCity) => {
        setLoading(true);
        setError(null);
        fetch(`/api/weather?city=${selectedCity}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('서버 응답 오류');
                }
                return res.json();
            })
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                setWeatherData(data);
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full h-4/5 h max-h-4/5 ">
            <div className="p-8  max-w-md w-full min-h-max h max-h-96">

                <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">기상청 날씨 데이터</h1>
                <div className="flex justify-center space-x-4 mb-6">
                    <button 
                        onClick={() => setCity('부산')}
                        className={`px-4 py-2 rounded-full ${city === '부산' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} focus:outline-none transition duration-300`}
                    >
                        부산
                    </button>
                    <button 
                        onClick={() => setCity('서울')}
                        className={`px-4 py-2 rounded-full ${city === '서울' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} focus:outline-none transition duration-300`}
                    >
                        서울
                    </button>
                </div>
                <div className="space-y-4 min-h-[16rem]">
                    {error ? (
                        <p className="text-red-500 text-center">{error}</p>
                    ) : loading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
                        </div>
                    ) : weatherData ? (
                        <>
                            <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
                                <span className="text-lg font-semibold text-gray-700">온도</span>
                                <span className="text-2xl font-bold text-gray-900">{weatherData.온도}°C</span>
                            </div>
                            <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
                                <span className="text-lg font-semibold text-gray-700">습도</span>
                                <span className="text-2xl font-bold text-gray-900">{weatherData.습도}%</span>
                            </div>
                            <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
                                <span className="text-lg font-semibold text-gray-700">강수량</span>
                                <span className="text-2xl font-bold text-gray-900">{weatherData.강수량}mm</span>
                            </div>
                            <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
                                <span className="text-lg font-semibold text-gray-700">풍속</span>
                                <span className="text-2xl font-bold text-gray-900">{weatherData.풍속}m/s</span>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
            </div>
        </div>
    );
}