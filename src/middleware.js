import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    
    if (req.nextUrl.pathname.startsWith('/calendar') || 
        req.nextUrl.pathname.startsWith('/profiles')) {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                return NextResponse.redirect(new URL('/login', req.url));
            }
            
            return res;
            
        } catch (error) {
            console.error('미들웨어 에러:', error);
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }
    
    return res;
}

export const config = {
    matcher: ['/calendar/:path*', '/profiles/:path*']
}