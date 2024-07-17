'use client';
import { useEffect, useState } from 'react';
import supabase from '../api/supabaseaApi';
import Image from "next/image";
import Link from "next/link";


const useUserSession = () => {
    const [userName, setUserName] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
  
    useEffect(() => {
      const checkSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setLoggedIn(true);
          const user = session.user;
          setUserName(user.user_metadata?.name || user.user_metadata?.nickname || '익명');
        } else {
          setLoggedIn(false);
          setUserName('');
        }
      };
  
      checkSession();
  
      const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          setLoggedIn(true);
          const user = session.user;
          setUserName(user.user_metadata?.name || user.user_metadata?.nickname || '익명');
        } else {
          setLoggedIn(false);
          setUserName('');
        }
      });
  
      return () => {
        if (subscription && typeof subscription.unsubscribe === 'function') {
          subscription.unsubscribe();
        }
      };
    }, []);
  
    return { loggedIn, userName };
  };
  
  export default useUserSession;