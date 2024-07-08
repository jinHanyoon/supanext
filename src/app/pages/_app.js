// 'use client'

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import supabase from '../api/supabaseclient';

// function MyApp({ Component, pageProps }) {
//     const router = useRouter();
//     const [loggedIn, setLoggedIn] = useState(false);
//     const [loading, setLoading] = useState(true);
  
//     useEffect(() => {
//       const checkLoginStatus = async () => {
//         const user = supabase.auth.user();
//         if (!user) {
//           router.push('/login');
//           console.log('로그인 필요');
//         } else {
//           setLoggedIn(true);
//           console.log('로그인 상태 확인됨:', user);
//         }
//         setLoading(false);
//       };
  
//       checkLoginStatus();
//     }, [router]);
  
//     if (loading) {
//       return <div>Loading...</div>;
//     }
  
//     return <Component {...pageProps} />;
//   }
  
//   export default MyApp;