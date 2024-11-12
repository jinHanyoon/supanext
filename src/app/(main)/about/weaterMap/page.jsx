'use client'
import Script from "next/script";
import { useEffect, useState } from "react";
import Map from "./NaverMap/page";

// 위치 데이터를 상수로 분리
const PRESET_LOCATIONS = [
  [129.0756, 35.1796, '부산'],
  [128.6811, 35.2271, '창원'],
  [128.9634, 35.1068, '명지'],
  [129.0879, 35.1870, '연산'],
  [129.0595, 35.1576, '서면'],
  [129.0359, 35.0975, '남포'],
  [126.9780, 37.5665, '서울'],
  [127.7300, 37.8853, '강원도 (춘천)'],
];

export default function NaverMap({onLocationSelect}) {
  const [loc, setLoc] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const initLocation = async () => {
    try {
      setIsLoading(true);
      if (!navigator.geolocation) {
        throw new Error("이 브라우저는 위치 정보를 지원하지 않습니다.");
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const currentLoc = [position.coords.longitude, position.coords.latitude];
      setLoc([currentLoc, ...PRESET_LOCATIONS.map(([long, lat]) => [long, lat])]);
    } catch (err) {
      setError(err.message);
      // 현재 위치를 가져올 수 없는 경우 기본 위치만 설정
      setLoc(PRESET_LOCATIONS.map(([long, lat]) => [long, lat]));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initLocation();
  }, []);

  if (error) {
    console.warn(`위치 정보 오류: ${error}`);
  }

  return (
    <div className="w-full">
      <Script
        strategy="afterInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_ID}`}
      />
      {isLoading ? (
        <div>지도를 불러오는 중...</div>
      ) : (
        loc.length > 0 && <Map loc={loc} onLocationSelect={onLocationSelect} />
      )}
    </div>
  );
}
