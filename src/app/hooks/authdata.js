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

    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
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
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return { loggedIn, userName, userUUID, userAvatar };
};

export default useUserSession;