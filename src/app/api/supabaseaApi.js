'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// ✅ 장점:
// 1. Next.js에 최적화된 클라이언트
// 2. 자동 세션 관리 기능
// 3. 미들웨어와 완벽한 호환
// 4. 타입스크립트 지원 개선
const supabase = createClientComponentClient({
  supabaseUrl: 'https://vwaofeoshpnacnpicind.supabase.co',
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  options: {
    realtime: {
      params: {
        eventsPerSecond: 2  // 웹소켓 요청 제한
      }
    },
    db: {
      schema: 'public'
    }
  }
});

export default supabase;