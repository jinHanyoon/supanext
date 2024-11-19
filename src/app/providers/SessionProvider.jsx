'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const SessionContext = createContext({
    userUUID: null,
    userName: '',
    userAvatar: '',
    showLogin: false,
    loggedIn: false
});

export function useSession() {
    const session = useContext(SessionContext);
    console.log('useSession 호출됨:', session);
    return session;
}

export default function SessionProvider({ children, serverSession }) {
    console.log('SessionProvider 렌더링 시작');
    const supabase = createClientComponentClient();
    
    const [session, setSession] = useState(serverSession || {
        userUUID: null,
        userName: '',
        userAvatar: '',
        showLogin: false,
        loggedIn: false
    });

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_OUT') {
                setSession({
                    userUUID: null,
                    userName: '',
                    userAvatar: '',
                    showLogin: false,
                    loggedIn: false
                });
            } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                // 사용자 정보 업데이트
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    setSession({
                        userUUID: user.id,
                        userName: user.user_metadata?.full_name || '',
                        userAvatar: user.user_metadata?.avatar_url || '',
                        showLogin: false,
                        loggedIn: true
                    });
                }
            }
        });
    
        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
}