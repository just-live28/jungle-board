'use client'

import { signOut, useSession } from 'next-auth/react';

export default function LogoutButton() {
    const { data: session, status } = useSession();

    return (
        session &&
        <>
            <div style={{ textAlign: 'right' }}>
                환영합니다, {session.user.userId}님!
                <button onClick={() => { signOut({ callbackUrl: '/' }) }} style={{
                    padding: '0.6rem',
                    backgroundColor: '#4caf50',
                    color: '#fff',
                    fontSize: '1rem',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    margin: '0 15px 0 20px',
                }}> 로그아웃</button >
            </div>

        </>
    )
}