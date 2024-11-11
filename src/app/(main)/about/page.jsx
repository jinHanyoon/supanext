'use client'
import { useState } from 'react';
import React from 'react'
import WeatherPage from './weatherPage/page'
import NaverMap from './weaterMap/page'
export default function About() {
 
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleLocationSelect = (locationName) => {
    setSelectedLocation(locationName);
  };
  return (
    <div className='flex flex-row'>
    <WeatherPage selectedLocation={selectedLocation}/>
    <NaverMap  onLocationSelect={handleLocationSelect}/>
    
    </div>
  )
}
