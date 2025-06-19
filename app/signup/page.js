'use client'

import { useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [idCheckResult, setIdCheckResult] = useState(false)

    const router = useRouter();

    const handleIdCheck = async () => {
        if (id.trim() == '') {
            alert('아이디를 입력해주세요!');
            return;
        }

        try {
            const res = await fetch(`/api/auth/register/${id}`, { method: 'GET' })
            const resp = await res.json();
            console.log(resp);

            if (resp.exists) {
                let choice = confirm('사용할 수 있는 아이디입니다. 사용하시겠습니까?');

                if (choice) {
                    setIdCheckResult(true)
                } else {
                    setId('')
                }
            } else {
                alert('이미 사용중인 아이디입니다!');
            }
        } catch (err) {
            console.error(err)
            setIdCheckResult('오류가 발생했습니다.')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 회원가입 요청 로직
        if (password != rePassword) {
            alert("비밀번호가 서로 다릅니다!");
            return;
        } else if (!idCheckResult) {
            alert("아이디 중복확인을 해주세요!");
            return;
        }

        const res = await fetch(`/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                userId: id,
                password: password,
                role: 'normal'
            })
        })
        const resp = await res.json();

        if (resp.success) {
            alert("가입 완료! 로그인페이지로 이동합니다.")
            router.push('/signin')
        }

    }

    return (
        <div className={styles.signup_container}>
            <div style={{ textAlign: 'center' }}>
                <img src="/logo.png" alt="로고" className={styles.logo} />
            </div>
            <h3 style={{ margin: '10px 0 30px 0' }}>가입하기</h3>
            <form onSubmit={handleSubmit}>
                <div className={styles.form_group}>
                    <label>이름</label><br></br>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required
                        placeholder='이름을 입력하세요' maxLength={5} />
                </div>

                <div className={styles.form_group}>
                    <label>아이디</label>
                    <div className={styles.id_check_group}>
                        <input type="text" value={id} onChange={e => setId(e.target.value)} required
                            placeholder='아이디를 입력하세요' />
                        <button type="button" onClick={handleIdCheck} className={styles.idCheckBtn}>중복확인</button>
                    </div>
                </div>

                <div className={styles.form_group}>
                    <label>비밀번호</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                        placeholder='비밀번호를 입력하세요' />
                </div>
                <div className={styles.form_group}>
                    <label>비밀번호 확인</label>
                    <input type="password" value={rePassword} onChange={e => setRePassword(e.target.value)} required
                        placeholder='비밀번호를 다시 입력하세요' />
                </div>

                <div className={styles.buttonBox}>
                    <Link href={'/signin'} style={{ marginRight: '15px', textDecoration: 'none' }}>돌아가기</Link>
                    <button type="submit" className={styles.registerBtn}>가입하기</button>
                </div>
            </form>
        </div>
    )
}
