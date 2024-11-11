'use client'
import React, { useState, useEffect } from 'react';
import List from '../admin/list/page';
import { useRouter } from 'next/navigation';

export default function Admin() {
  const vip01 = '87136bc1-763b-4aae-b250-10f214d3c885';
  const vip02 = 'dab01cd0-a04a-4115-8932-dfad15d36fc7';
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

//  useEffect(()=>{
//   if (userUUID === vip01 || userUUID === vip02) {
//     setIsLoading(true);
//     console.log(`VIP 사용자입니다: ${userUUID}`);

//   }

// },[userUUID,vip02,vip01])

  return (
    <div >
      <List />
    </div>
  );
}
