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

// ... existing code ...
export const signInWithkakao = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}/callback`,
      },
    });
    if (error) throw error;
  } catch (error) {
    console.error('카카오 로그인 에러:', error);
  }
};

export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/callback`,
      },
    });
    if (error) throw error;
  } catch (error) {
    console.error('구글 로그인 에러:', error);
  }
};