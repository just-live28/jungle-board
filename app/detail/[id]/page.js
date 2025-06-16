import { ObjectId } from 'mongodb';
import styles from './page.module.css';
import { connectDB } from '@/util/database';
import formatDate from '@/util/util';
import Link from 'next/link';
import DeleteButton from './DeleteButton';

export default async function Detail(props) {
    const resolvedParams = await props.params
    let _id = resolvedParams.id;

    const db = (await connectDB).db('board')
    let result = await db.collection('post').findOne({ _id: new ObjectId(String(_id)) })

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
                <div className={styles.rightButtonBox}>
                    <DeleteButton id={_id} />
                    <Link href={`/edit/${_id}`} style={{ color: 'white', textDecoration: 'none' }}>
                        <button type="button" className={styles.corBtn}>수정</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}