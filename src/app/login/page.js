'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../api/supabaseaApi';
import LoginForm from '../component/loginForm';


export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const handleLogin = async (email, password) => {
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setMessage(signInError.message);
      return;
    }

    const handleLoginClose = () => {
      setShowLoginForm(false);
    };

    setMessage('로그인 성공!');
    setTimeout(() => {
      router.push('/');
    }, 0);
  };

  return (
    <div>
      {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}

// export default function LoginPage() {
//   const router = useRouter();
//   const [message, setMessage] = useState('');

//   const handleLogin = async (username, password) => {
//     let user;
//     let dbError;

//     ({ data: user, error: dbError } = await supabase
//       .from('users')
//       .select('*')
//       .eq('username', username)
//       .single());

//     if (dbError || !user) {
//       return { error: '사용자를 찾을 수 없습니다.' };
//     }

//     if (user.password !== password) {
//       return { error: '비밀번호가 틀립니다.' };
//     }

//     setMessage('로그인 성공!');
//     setTimeout(() => {
//       router.push('/');
//     }, 2000);
//     return { success: true };
//   };

//   return (
//     <div>
//       {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
//       <LoginForm onLogin={handleLogin} />
//     </div>
//   );
// }