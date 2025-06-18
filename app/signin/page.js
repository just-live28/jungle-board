'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function SignInPage() {
    const router = useRouter()
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await signIn('credentials', {
            redirect: false,
            id,
            password,
        })

        if (res.ok) {
            router.push('/')
        } else {
            alert('로그인 실패. 아이디 또는 비밀번호를 확인하세요.')
        }
    }

    return (
        <div className={styles.container}>
            <img src="/logo.png" alt="로고" className={styles.logo} />

            <form onSubmit={handleLogin}>
                <div className={styles.formBox}>
                    <input
                        type="text"
                        placeholder="아이디"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                    <button type='submit' className={styles.loginButton}>
                        로그인
                    </button>

                    <p className={styles.signupText}>
                        아직 회원이 아니신가요?{' '}
                        <button onClick={() => router.push('/signup')} className={styles.signupButton}>
                            회원가입
                        </button>
                    </p>
                </div>
            </form>
        </div>
    )
}
