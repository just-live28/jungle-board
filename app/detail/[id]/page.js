import styles from './page.module.css';
import formatDate from '@/util/util';
import Link from 'next/link';
import DeleteButton from './DeleteButton';
import { headers } from 'next/headers'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Reple from './Reple';

export default async function Detail(props) {
    const resolvedParams = await props.params
    let _id = resolvedParams.id;

    const headerList = await headers();
    const host = headerList.get('host');
    const protocol = 'http';
    const incView = await fetch(`${protocol}://${host}/api/post/view/${_id}`, { method: 'PUT' });
    const resp = await fetch(`${protocol}://${host}/api/post/${_id}`, {
        method: 'GET',
        cache: 'no-store',
    });
    const result = await resp.json();
    const session = await getServerSession(authOptions);

    console.log()

    return (
        <div className={styles.content}>
            <h3 style={{ paddingLeft: '20px' }}>그냥게시판</h3>
            <div className={styles.headerBox}>
                <div className={styles.titleBox}>{result.title}</div>
            </div>
            <div className={styles.infoBox}>
                <div className={styles.leftInfo}><i className="fa-solid fa-seedling" style={{ color: "#000000", marginRight: '10px' }}></i> {result.writer}</div>
                <div className={styles.rightInfo}>
                    <div className={styles.dateBox}>작성일 {formatDate(result.date)}</div>
                    <div className={styles.viewBox}>조회수 {result.view}</div>
                </div>
            </div>
            <div className={styles.contentBox}>{result.content}</div>
            <div className={styles.buttonBox}>
                <div className={styles.leftButtonBox}>
                    <Link href={'/'} style={{ color: 'white', textDecoration: 'none' }}>
                        <button type="button" className={styles.goListBtn}>목록</button>
                    </Link>
                </div>
                {
                    session && (session.user.userId == result.writer || session.user.role == 'admin') &&
                    <div className={styles.rightButtonBox}>
                        <DeleteButton id={_id} />
                        <Link href={`/edit/${_id}`} style={{ color: 'white', textDecoration: 'none' }}>
                            <button type="button" className={styles.corBtn}>수정</button>
                        </Link>
                    </div>
                }
            </div>
            <Reple id={_id} />
        </div>
    )
}