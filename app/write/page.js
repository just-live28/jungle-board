'use client'

import { useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function Write() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const writer = 'tbxjvkdldj';    // 나중에 jwt 도입 후 변경

    const router = useRouter();

    const handleSubmit = async () => {
        if (title.trim() == '') {
            alert('제목을 입력해주세요!');
            return;
        } else if (content.trim() == '') {
            alert('내용을 입력해주세요!');
            return;
        }

        const resp = await fetch('/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                content: content,
                writer: writer
            }),
        });
        const json = await resp.json();

        if (json.success) {
            router.push('/')
        } else {
            alert('작성 실패: ' + json.message);
        }
    }

    return (
        <div className={styles.content}>
            <h3 style={{ paddingLeft: '20px' }}>{writer}님의 글</h3>
            {/* <form action='/api/post' method='POST'> */}
            <div className={styles.title}>
                <input type="text" placeholder="제목을 입력해 주세요 (최대 30자까지 입력 가능)"
                    maxLength="30" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className={styles.editorBox}>
                <textarea className={styles.editor} placeholder='내용을 입력해주세요'
                    onChange={(e) => setContent(e.target.value)}></textarea>
            </div>
            <div className={styles.btnBox}>
                <button type="button" className={styles.cancelPostButton} onClick={() => {
                    let isCancel = confirm('작성을 취소하시겠습니까?');

                    if (isCancel) {
                        router.back();
                    }
                }}>취소</button>
                <button className={styles.writePostButton} onClick={handleSubmit}>등록</button>
            </div>
        </div>
    )
}