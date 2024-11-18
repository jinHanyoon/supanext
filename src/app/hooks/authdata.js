'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState, useCallback } from 'react';

export function useUserSession() {
  const supabase = createClientComponentClient()
  const [userState, setUserState] = useState({
    loggedIn: false,
    userName: '',
    userAvatar: '',
    userUUID: '',
    isLoading: true,
    error: null
  });

  // 안전하게 유저 정보 가져오기
  const getAuthenticatedUser = useCallback(async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }, [supabase]);

  const updateUserState = useCallback(async () => {
    try {
      // getUser()로 인증된 유저 정보 가져오기
      const user = await getAuthenticatedUser();

      if (user) {
        // 인증된 유저 ID로만 프로필 조회
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('id, username, avatar_url')
          .eq('id', user.id)
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
  }, [supabase, getAuthenticatedUser]);

  const refreshSession = useCallback(async () => {
    try {
      // 먼저 현재 유저 확인
      const user = await getAuthenticatedUser();
      if (user) return true;  // 이미 인증된 유저면 리프레시 불필요
      
      // 인증된 유저가 없을 때만 리프레시
      const { data, error: refreshError } = await supabase.auth.refreshSession();
      if (refreshError) throw refreshError;
      
      if (data?.session) {
        await updateUserState();
        return true;
      }
      return false;
      
    } catch (error) {
      console.error('세션 리프레시 실패:', error);
      return false;
    }
  }, [supabase, getAuthenticatedUser, updateUserState]);

  useEffect(() => {
    let mounted = true;
    let sessionCheckTimeout;
    let cleanup;

    const initSession = async () => {
      try {
        // 초기 인증된 유저 확인
        const user = await getAuthenticatedUser();
        
        if (mounted) {
          await updateUserState();
        }

        // 인증 상태 변경 감지
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async () => {
            if (mounted) {
              await updateUserState();
            }
          }
        );

        return () => subscription?.unsubscribe();

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

    const checkSession = async () => {
      if (!mounted) return;

      try {
        const user = await getAuthenticatedUser();
        if (!user && mounted) {
          await refreshSession();
        }
        
        // 다음 체크 예약 (4분 후)
        sessionCheckTimeout = setTimeout(checkSession, 4 * 60 * 1000);
      } catch (error) {
        console.error('세션 체크 실패:', error);
      }
    };

    const initialize = async () => {
      cleanup = await initSession();
      sessionCheckTimeout = setTimeout(checkSession, 4 * 60 * 1000);
    };

    initialize();

    return () => {
      mounted = false;
      cleanup?.();
      if (sessionCheckTimeout) {
        clearTimeout(sessionCheckTimeout);
      }
    };
  }, [updateUserState, supabase, refreshSession, getAuthenticatedUser]);

  return { ...userState, refreshSession };
}