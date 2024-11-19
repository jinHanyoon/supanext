import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function getServerSession() {
    const supabase = createServerComponentClient({ cookies });
    
    try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
            return null;
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('username, avatar_url, id')
            .eq('id', user.id)
            .single();

        return profile ? {
            userUUID: profile.id,
            userName: profile.username,
            userAvatar: profile.avatar_url,
            showLogin: true,
            loggedIn: true
        } : null;
        
    } catch (error) {
        console.error('서버 세션 에러:', error);
        return null;
    }
}