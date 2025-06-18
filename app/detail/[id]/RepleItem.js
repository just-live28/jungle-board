'use client'
import formatDate from '@/util/util';
import styles from './page.module.css';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

export default function RepleItem({ reple, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(reple.content)
    const { data: session, status } = useSession();
    const textareaRef = useRef(null);

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            const len = textareaRef.current.value.length;
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(len, len);
        }
    }, [isEditing]);

    const handleSave = async () => {
        const resp = await fetch(`/api/reple/${reple._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: editContent
            })
        });
        const result = await resp.json();

        if (result.success) {
            onUpdate(reple._id, editContent);
            setIsEditing(false);
        } else {
            alert('수정 실패!');
        }
    }

    return (
        <div className={styles.repleBox}>
            <div style={{ fontWeight: 'bold', marginBottom: '15px' }}>{reple.writer}</div>

            {isEditing ? (
                <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className={styles.repleEditInput}
                    ref={textareaRef}
                />
            ) : (
                <div style={{ marginBottom: '30px' }}>{reple.content}</div>
            )}

            <div style={{ fontSize: '14px', color: 'gray' }}>{formatDate(reple.date)}</div>

            {session && (session.user.userId === reple.writer || session.user.role === 'admin') && (
                <div className={styles.buttonGroup}>
                    {isEditing ? (
                        <>
                            <button onClick={handleSave} className={styles.repleCorBtn}>저장</button>
                            <button onClick={() => {
                                let isCancel = confirm('댓글 수정을 취소하시겠습니까?');

                                if (isCancel) {
                                    setIsEditing(false);
                                }
                            }} className={styles.repleDelBtn}>취소</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => setIsEditing(true)} className={styles.repleCorBtn}>수정</button>
                            <button
                                onClick={async () => {
                                    const isDelReple = confirm('정말 이 댓글을 삭제하시겠습니까?');
                                    if (!isDelReple) return;

                                    const resp = await fetch(`/api/reple/${reple._id}`, { method: 'DELETE' });
                                    const result = await resp.json();

                                    if (result.success) {
                                        onDelete(reple._id);
                                    } else {
                                        alert('삭제 실패!');
                                    }
                                }}
                                className={styles.repleDelBtn}
                            >
                                삭제
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}