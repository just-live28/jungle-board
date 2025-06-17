import Link from 'next/link';
import styles from './page.module.css';
import formatDate from '@/util/util';
import { headers } from 'next/headers'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Board() {
  const headerList = await headers();
  const host = headerList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  const result = await fetch(`${protocol}://${host}/api/post`, { method: 'GET', });
  const posts = await result.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

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
          posts.map((post, i) => {
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
