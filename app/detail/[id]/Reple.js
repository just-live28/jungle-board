'use client'
import { useState } from 'react';
import styles from './page.module.css';
import { useSession } from 'next-auth/react';

export default function Reple({ id }) {

    let [reple, setReple] = useState('')
    const { data: session, status } = useSession();

    return (
        <div>
            <h4 style={{ marginTop: '40px' }}>댓글</h4>
            <div className={styles.repleInputContainer}>
                <textarea
                    className={styles.repleInput}
                    placeholder="댓글을 입력해주세요"
                    onChange={(e) => { setReple(e.target.value) }}
                    value={reple} />
                <button type='button' className={styles.submitButton} onClick={() => {
                    fetch('/api/reple', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            parent: id,
                            writer: session.user.userId,
                            content: reple,
                        })
                    })
                }}>등록</button>
            </div>

            <div className={styles.repleList}>댓글목록보여줄 부분</div>
        </div>
    )
}