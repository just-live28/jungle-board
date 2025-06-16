'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function EditPage({ post }) {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const writer = 'tbxjvkdldj'; // 추후 JWT로 교체

    const router = useRouter();

    const handleSubmit = async () => {
        if (title.trim() == '') {
            alert('제목을 입력해주세요!');
            return;
        }
        if (content.trim() == '') {
            alert('내용을 입력해주세요!');
            return;
        }

        try {
            const resp = await fetch(`/api/post/${post._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id: post._id,
                    title: title,
                    content: content,
                }),
            });

            const json = await resp.json();

            if (json.success) {
                alert('게시글을 수정했습니다.');
                router.push(`/detail/${post._id}`);
            } else {
                alert('수정 실패: ' + json.message);
            }
        } catch (err) {
            alert('에러 발생: ' + err.message);
        }
    };

    return (
        <div className={styles.content}>
            <h3 style={{ paddingLeft: '20px' }}>게시글 수정하기</h3>
            <div className={styles.title}>
                <input
                    type="text"
                    maxLength="30"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력해 주세요 (최대 30자까지 입력 가능)"
                />
            </div>
            <div className={styles.editorBox}>
                <textarea
                    className={styles.editor}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="내용을 입력해주세요"
                />
            </div>
            <div className={styles.btnBox}>
                <button type="button" className={styles.cancelPostButton} onClick={() => {
                    let isCancel = confirm('수정을 취소하시겠습니까?');

                    if (isCancel) {
                        router.back();
                    }
                }}>
                    수정취소
                </button>
                <button className={styles.writePostButton} onClick={handleSubmit}>
                    수정완료
                </button>
            </div>
        </div>
    );
}