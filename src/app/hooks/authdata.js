'use client';
import { useEffect, useState } from 'react';
import supabase from '../api/supabaseaApi';
import { useRouter } from 'next/navigation';

const useUserSession = () => {
  const [userName, setUserName] = useState('');
  const [userAvatar, setAvatar] = useState('');
  const [userUUID, setUUID] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 세션 체크 함수
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setLoggedIn(true);
        const user = session.user;
        const { data, error } = await supabase
          .from('profiles')
          .select('id, username, avatar_url')
          .eq('id', user.id)
          .single();
        if (!error && data) {
          setUserName(data.username);
          setAvatar(data.avatar_url);
          setUUID(data.id);
        }
      } else {
        setLoggedIn(false);
        setUserName('');
        setAvatar('');
      }
    };

    checkSession();

    // 세션 상태 변화 감지 구독
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setLoggedIn(true);
        const user = session.user;
        const fetchUsername = async () => {
          const { data, error } = await supabase
            .from('profiles')
            .select('id, username, avatar_url')
            .eq('id', user.id)
            .single();
          if (!error && data) {
            setUserName(data.username);
            setAvatar(data.avatar_url);
            setUUID(data.id);
          }
        };
        fetchUsername();
      } else {
        setLoggedIn(false);
        setUserName('');
        setAvatar('');
        router.push('/'); // 로그인 상태가 아니면 리다이렉트
      }
    });


    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [router]);


  return { loggedIn, userName, userUUID, userAvatar };
};

export default useUserSession;