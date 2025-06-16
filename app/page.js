import Link from 'next/link';
import styles from './page.module.css';
import { connectDB } from '@/util/database';
import formatDate from '@/util/util';

export default async function Board() {

  const db = (await connectDB).db('board')
  let result = await db.collection('post').find().toArray()

  return (
    <div className={styles.content}>
      <h3 style={{ paddingLeft: '20px' }}>그냥게시판</h3>
      <div className={styles.community_header}>
        <form action="/searchList.cboard" className={styles.searchForm}>
          <select name="searchType" className={styles.searchSelect}>
            <option value="">검색 유형</option>
            <option value="title">제목</option>
            <option value="writer">작성자</option>
          </select> <input type="text" name="searchInput" className={styles.searchInput}
            autoComplete="off" />
          <button className={styles.searchBtn}>
            <i className="fa-solid fa-magnifying-glass" style={{ color: '#111' }}></i>
          </button>
        </form>
      </div>
      <div className={styles.board_list} >
        {
          result.map((post, i) => {
            return (
              <div className={styles.board_item} key={i}>
                <Link href={`/detail/${post._id}`} className={styles.title}>
                  {post.title}
                </Link>
                <div className={styles.writer}>{post.writer}</div>
                <div className={styles.date}>{formatDate(post.date)}</div>
                <div className={styles.view}>
                  <i className="fa-regular fa-eye" style={{ color: "#000000" }}></i> {post.view}</div>
              </div>
            )
          })
        }
      </div>
      <div className={styles.buttonBox}>
        <Link href={'/write'} style={{ color: 'white', textDecoration: 'none' }}>
          <button className={styles.writeBtn}>글쓰기</button>
        </Link>
      </div>
    </div>
  );
}
