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

        
        // 로그아웃 이벤트만 구독
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_OUT') {
                setSession({
                    userUUID: null,
                    userName: '',
                    userAvatar: '',
                    showLogin: false,
                    loggedIn: false
                });
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