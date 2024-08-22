'use client'
import supabase from "../api/supabaseaApi";

export const login = async (email, password) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};


export const signInWithkakao =async() =>{
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: "https://devjinhan.vercel.app/",
    },
  });
}
