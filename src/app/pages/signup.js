'use client';
import { useState, useEffect } from 'react';
import supabase from '../api/supabaseclient';

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      // 아이디가 이미 존재하는지 확인
      const { data: existingUser, error: userCheckError } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();

      if (userCheckError && userCheckError.code !== 'PGRST116') {
        console.error('Error checking existing user:', userCheckError);
        setError('사용자 확인 중 오류가 발생했습니다.');
        setIsSubmitting(false);
        return;
      }

      if (existingUser) {
        setError('이 아이디를 사용하는 사용자가 이미 있습니다.');
        setIsSubmitting(false);
        return;
      }

      // 사용자 등록
      const { data, error: dbError } = await supabase
        .from('users')
        .insert([{ username, password }]);

      if (dbError) {
        setError(dbError.message);
      } else {
        setSuccess('사용자가 성공적으로 등록되었습니다!');
      }
    } catch (error) {
      setError('서버 요청 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="text-2xl font-bold mb-4">회원가입</h1>
      <form onSubmit={handleSignUp}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">사용자 이름:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            autoComplete="username"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            autoComplete="new-password"
          />
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {isSubmitting ? '회원가입 중...' : '회원가입'}
        </button>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
      </form>
    </div>
  );
}