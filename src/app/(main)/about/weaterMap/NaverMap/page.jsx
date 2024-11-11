'use client'
import { useEffect } from 'react';

export default function Map({ loc,onLocationSelect }) {
  useEffect(() => {
    const map = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(loc[0][1], loc[0][0]),
      zoom: 16,
    });

    loc.forEach(([lng, lat], index) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        map: map,
        icon: index === 0 ? {
          url: '/img/nooicon.png', // 현재 위치 아이콘
          size: new naver.maps.Size(60, 60), // 크기를 25x25로 키움
          anchor: new naver.maps.Point(12.5, 25),
          scaledSize: new naver.maps.Size(60, 60) // 이미지 크기도 동일하게 조정
        } : undefined // 기본 아이
      });

      naver.maps.Event.addListener(marker, 'click', () => {
        handleMarkerClick(index);
      });
    });
  }, [loc]);

  const handleMarkerClick = (index) => {
    const locationNames = [
      "현재 위치", // loc[0]
      "부산",      // loc[1]
      "창원",      // loc[2]
      "명지",      // loc[3]
      "연산",      // loc[4]
      "서면",      // loc[5]
      "남포",      // loc[6]
      "서울",      // loc[7]
      "강원도"     // loc[8]
    ];

    const locationName = locationNames[index];
    onLocationSelect(locationName);
  };

  return (
    <div>
      <div id="map" className='w-full h-screen'></div>
    </div>
  );
}