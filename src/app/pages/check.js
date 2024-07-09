'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../api/supabaseaApi';



export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const session = supabase.auth.session();
      if (!session) {
        router.push('/login');
      } else {
        setLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, [router]);

  if (!loggedIn && router.pathname !== '/login') {
    return null;
  }

  return <Component {...pageProps} />;
}