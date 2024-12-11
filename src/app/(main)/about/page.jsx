'use client'
import { useState } from 'react';
import React from 'react'
import WeatherPage from './weatherPage/page'
import NaverMap from './weaterMap/page'
export default function About() {
 
  const [selectedLocation, setSelectedLocation] = useState('');
  const [mapCenter, setMapCenter] = useState()
  const handleLocationSelect = (locationName) => {
    setSelectedLocation(locationName);
  };
  const handleCitySelect =(cityName) =>{
    setMapCenter(cityName)
  }

  return (
    <div className='flex flex-row'>
    <WeatherPage
     selectedLocation={selectedLocation}
     onCitySelect = {handleCitySelect}       
    />
    <NaverMap
      onLocationSelect={handleLocationSelect}
      selectedCity={mapCenter}
      />
    
    </div>
  )
}
