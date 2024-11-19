'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ 
    email, 
    password 
  });

  if (!error) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      window.location.reload();
    }
  }

  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    window.location.reload();
  }
};

export const signInWithkakao = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: `${window.location.origin}/data`  // 현재 도메인 기준으로 리다이렉트
    },
  });
};

export const signInWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/data`
    },
  });
};