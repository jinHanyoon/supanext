'use client'
import Script from "next/script";
import { useEffect, useState } from "react";
import Map from "./NaverMap/page";

export default function NaverMap({onLocationSelect}) {
  const [loc, setLoc] = useState([]);

  const initLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 현재 위치
          const currentLoc = [position.coords.longitude, position.coords.latitude];
          console.log("Current location obtained: ", position.coords);

          setLoc([
            // 현재위치 + 추가한 위치
            currentLoc,
            [129.0756, 35.1796], // 부산
            [128.6811, 35.2271], // 창원
            [128.9634, 35.1068], // 명지
            [129.0879, 35.1870], // 연산
            [129.0595, 35.1576], // 서면
            [129.0359, 35.0975], // 남포
            [126.9780, 37.5665], // 서울
            [127.7300, 37.8853], // 강원도 (춘천)
          ]);
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    initLocation();
  }, []);

  return (
    <div className="w-full">
      <Script
        strategy="afterInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_ID}`}
      ></Script>
      {loc.length > 0 && <Map loc={loc}  onLocationSelect={onLocationSelect}  />}
    </div>
  );
}
