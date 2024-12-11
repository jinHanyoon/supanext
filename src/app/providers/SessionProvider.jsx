'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const SessionContext = createContext();
const supabase = createClientComponentClient();


export function useSession() {
  return useContext(SessionContext);
}

export default function SessionProvider({ children, serverSession }) {
  // console.log('SessionProvider 렌더링, serverSession:', serverSession);
  
  const [session, setSession] = useState(serverSession || {
    userUUID: null,
    userName: '',
    userAvatar: '',
    showLogin: false,
    loggedIn: false
  });

  useEffect(() => {
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

    return () => subscription?.unsubscribe();
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}