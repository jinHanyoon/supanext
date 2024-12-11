'use client'
import { useEffect } from 'react';

export default function Map({ loc, onLocationSelect,selectedCity }) {
  useEffect(() => {
    // naver 스크립트 로드 완료 체크
    if (typeof window.naver !== 'undefined') {
      const map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(loc[0][1], loc[0][0]),
        zoom: 16,
      });


      if(selectedCity){
        const cityIndex =["현재 위치", "부산", "창원", "명지", "연산","서면", "남포", "서울","강원도"].indexOf(selectedCity);
          if(cityIndex !== -1){
            const position =new naver.maps.LatLng(loc[cityIndex][1],loc[cityIndex][0]);
            map.setCenter(position)

          }
      }

      
      loc.forEach(([lng, lat], index) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(lat, lng),
          map: map,
          icon: index === 0 ? {
            url: '/img/nooicon.png',
            size: new naver.maps.Size(60, 60),
            anchor: new naver.maps.Point(12.5, 25),
            scaledSize: new naver.maps.Size(60, 60)
          } : undefined
        });

        naver.maps.Event.addListener(marker, 'click', () => {
          map.setCenter(new naver.maps.LatLng(lat, lng));
          handleMarkerClick(index);
        });
      });
    }
  }, [loc,selectedCity]);

  const handleMarkerClick = (index) => {
    const locationNames = [
      "현재 위치",
      "부산",
      "창원", 
      "명지",
      "연산",
      "서면",
      "남포",
      "서울",
      "강원도"
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