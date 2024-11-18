'use client';
import { createContext, useContext } from 'react';
import { useUserSession } from '../../hooks/authdata';

const AuthContext = createContext(null);

export function AuthProvider({ children, initialSession }) {
  const auth = useUserSession();  // 기존거 그대로 씀
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthProvider 안에서만 쓸 수 있음!');
  }
  return context;
};