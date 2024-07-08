'use client';
import { useState } from 'react';
// import { useRouter } from 'next/router';
import supabase from '../api/supabaseclient';
import LoginForm from '../component/loginForm';

export default function LoginPage() {
  // const router = useRouter();
  const [message, setMessage] = useState('');

  const handleLogin = async (username, password) => {
    let user;
    let dbError;

    ({ data: user, error: dbError } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single());

    if (dbError || !user) {
      return { error: '사용자를 찾을 수 없습니다.' };
    }

    if (user.password !== password) {
      return { error: '비밀번호가 틀립니다.' };
    }

    // 로그인 성공 시 세션 설정
    await supabase.auth.setAuth(user.access_token);
    setMessage('로그인 성공!');
    setTimeout(() => {
      router.push('/');
    }, 2000);
    return { success: true };
  };

  return (
    <div>
      {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}