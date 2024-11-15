// Supabase 미들웨어 클라이언트와 Next.js 응답 기능 가져오기
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

// 미들웨어 함수 정의 (모든 페이지 요청 전에 실행됨)
export async function middleware(req) {
  // 먼저 response 객체 생성
  const res = NextResponse.next();
  
  // 특정 페이지 접근 시도하는지 체크
  if (req.nextUrl.pathname.startsWith('/calendar') || 
    req.nextUrl.pathname.startsWith('/profiles')) {
    
    // Supabase 미들웨어 클라이언트 생성 (인증 체크용)
    const supabase = createMiddlewareClient({ req, res });
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('미들웨어 유저 체크:', !!user);
      console.log('현재 경로:', req.nextUrl.pathname);
      
      // 로그인 안 한 경우만 리다이렉트
      if (!user) {
        console.log('유저 없음 - 리다이렉트');
        return NextResponse.redirect(new URL('/login', req.url));
      }
      
      console.log('유저 있음 - 통과');
      // 로그인 했으면 원래 response 리턴
      return res;
      
    } catch (error) {
      console.error('미들웨어 에러:', error);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  
  // 보호된 페이지 아닌 경우 원래 response 리턴
  return res;
}

export const config = {
  matcher: ['/calendar/:path*', '/profiles/:path*']
}