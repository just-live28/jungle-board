'use client';

import { useRouter } from "next/navigation";
import styles from './page.module.css';

export default function DeleteButton(props) {
    const router = useRouter();

    return (
        <button className={styles.delBtn}
            type="button"
            onClick={async () => {
                const isDelete = confirm('정말 이 글을 삭제하시겠습니까?');
                if (isDelete) {
                    const resp = await fetch(`/api/post/${props.id}`, { method: 'DELETE' });
                    const json = await resp.json();

                    if (json.success) {
                        alert('게시글이 삭제되었습니다.');
                        router.push('/');
                    } else {
                        alert('삭제 실패!');
                    }
                }
            }}
        >삭제</button>
    );
}
