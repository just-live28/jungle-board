'use client'
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { useSession } from 'next-auth/react';
import formatDate from '@/util/util';
import RepleItem from './RepleItem';

export default function Reple({ id }) {

    let [reple, setReple] = useState('');
    let [repleList, setRepleList] = useState(null);
    const { data: session, status } = useSession();

    useEffect(() => {
        async function fetchData() {
            let resp = await fetch(`/api/reple/${id}`);
            let result = await resp.json();
            setRepleList(result);
        }
        fetchData();
    }, [id]);

    const handleDelete = (idToDelete) => {
        setRepleList(prev => prev.filter(c => c._id !== idToDelete));
    };

    const updateComment = (id, newContent) => {
        setRepleList(prev =>
            prev.map(c => (c._id === id ? { ...c, content: newContent } : c))
        )
    }

    return (
        <div style={{ marginBottom: '50px' }}>
            <h4 style={{ marginTop: '40px' }}>댓글</h4>
            {session &&
                <div className={styles.repleInputContainer}>
                    <textarea
                        className={styles.repleInput}
                        placeholder="댓글을 입력해주세요"
                        onChange={(e) => { setReple(e.target.value) }}
                        value={reple} />
                    <button type='button' className={styles.submitButton} onClick={async () => {
                        let resp = await fetch('/api/reple', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                parent: id,
                                writer: session.user.userId,
                                content: reple,
                            })
                        });
                        let result = await resp.json();

                        if (result.success) {
                            setRepleList(prev => [...prev, result.reple]);
                            setReple('');
                        } else {
                            alert('등록 실패!');
                        }

                    }}>등록</button>
                </div>
            }

            <div className={styles.repleList}>
                {repleList?.map((reple, index) => (
                    <RepleItem reple={reple} key={index} onDelete={handleDelete} onUpdate={updateComment} />
                ))}
            </div>
        </div>
    )
}