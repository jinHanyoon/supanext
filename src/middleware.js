// Supabase 미들웨어 클라이언트와 Next.js 응답 기능 가져오기
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

// 미들웨어 함수 정의 (모든 페이지 요청 전에 실행됨)
export async function middleware(req) {
  // 특정 페이지 접근 시도하는지 체크
  if (req.nextUrl.pathname.startsWith('/calendar') || 
    req.nextUrl.pathname.startsWith('/profile')) {
    // 다음 단계로 진행하기 위한 응답 객체 생성
    const res = NextResponse.next();
    // Supabase 미들웨어 클라이언트 생성 (인증 체크용)
    const supabase = createMiddlewareClient({ req, res });
    try {
      // 현재 로그인한 유저 정보 가져오기
      // data: { user } 구조분해할당으로 user 정보만 추출
      const { data: { user } } = await supabase.auth.getUser();
      console.log('미들웨어 유저 체크:', !!user);
      // 로그인 안 한 경우
      if (!user) {
        // 로그인 페이지로 강제 이동
        // new URL()로 전체 URL 생성 (현재 도메인 기준)
        return NextResponse.redirect(new URL('/login', req.url));
      }

      // 로그인 했으면 통과
      return res;
    } catch (error) {
      // 에러 발생시 (세션 만료 등)
      console.error('미들웨어 에러:', error);
      // 로그인 페이지로 이동
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  // 보호된 페이지가 아니면 그냥 통과
  return NextResponse.next();
}
// 미들웨어  경로 
export const config = {
    matcher: [
      '/calendar/:path*',  
      '/profile/:path*'    
      // :path* 는 모든 하위 경로를 포함한다는 의미
    ]
}