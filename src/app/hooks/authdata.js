'use client';
import { useEffect, useState, useCallback } from 'react';
import supabase from '../api/supabaseaApi';

export function useUserSession() {
  const [userState, setUserState] = useState({
    loggedIn: false,
    userName: '',
    userAvatar: '',
    userUUID: '',
    isLoading: true,
    error: null
  });

  const updateUserState = useCallback(async (session) => {
    try {
      if (session?.user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('id, username, avatar_url')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;

        setUserState({
          loggedIn: true,
          userName: profile?.username || '',
          userAvatar: profile?.avatar_url || '',
          userUUID: profile?.id || '',
          isLoading: false,
          error: null
        });
      } else {
        setUserState({
          loggedIn: false,
          userName: '',
          userAvatar: '',
          userUUID: '',
          isLoading: false,
          error: null
        });
      }
    } catch (error) {
      console.error('상태 업데이트 실패:', error);
      setUserState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message
      }));
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const initSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted) {
          await updateUserState(session);
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (_event, session) => {
            if (mounted) {
              await updateUserState(session);
            }
          }
        );

        return () => {
          subscription.unsubscribe();
        };

      } catch (error) {
        console.error('세션 초기화 실패:', error);
        if (mounted) {
          setUserState(prev => ({
            ...prev,
            isLoading: false,
            error: error.message
          }));
        }
      }
    };

    const { cleanup } = initSession() || {};

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [updateUserState]);

  const refreshSession = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    await updateUserState(session);
  }, [updateUserState]);

  return { ...userState, refreshSession };
}