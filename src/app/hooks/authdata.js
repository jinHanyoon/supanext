'use client';
import { useEffect, useState } from 'react';
import supabase from '../api/supabaseaApi';
import Image from "next/image";
import Link from "next/link";


const useUserSession = () => {
  const [userName, setUserName] = useState('');
  const [userAvatar, setAvatar] = useState('');



  const [userUUID, setUUID] = useState('')
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setLoggedIn(true);
        const user = session.user;
        const { data, error } = await supabase.from('profiles').select('id, username, avatar_url').eq('id', user.id ).single();
        setUserName(data.username);
        setAvatar(data.avatar_url);


      } else {
        setLoggedIn(false);
        setUserName('');
        setAvatar('');

      }
    };

    checkSession();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {  
        setLoggedIn(true);
        const user = session.user;
        const fetchUsername = async () => {
          const { data, error } = await supabase.from('profiles').select('id, username, avatar_url').eq('id', user.id ).single();
             setUserName(data.username);
             setAvatar(data.avatar_url);

            //  console.log('Fetched profile data:', data);

        };
        fetchUsername();
      } else {
        setLoggedIn(false);
        setUserName('');
        setAvatar('');

      }
    });

    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
    };
  }, []);

  return { loggedIn, userName, userUUID, userAvatar };
};

export default useUserSession


