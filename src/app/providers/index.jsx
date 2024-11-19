'use client';
import SessionProvider from './SessionProvider';

export default function Providers({ children,session }) {  // session prop 제거
    return (
        <SessionProvider serverSession={session}>
            {children}
        </SessionProvider>
    );
}