import Link from 'next/link'
import styles from './page.module.css'
import formatDate from '@/util/util'
import { headers } from 'next/headers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'
import Pagination from './Pagination'

export const dynamic = 'force-dynamic';

export default async function Board(params) {
  const headerList = await headers();
  const host = headerList.get('host');
  const protocol = 'http';

  const searchParams = await params.searchParams;
  const keyword = searchParams.keyword || '';
  const page = parseInt(searchParams.page || '1');

  const result = await fetch(`${protocol}://${host}/api/post?keyword=${keyword}&page=${page}`, { cache: 'no-store' });
  const { posts, totalCount } = await result.json();
  const totalPage = Math.ceil(totalCount / 10);

  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");

  return (
    <div className={styles.content}>
      <h3 style={{ paddingLeft: '20px' }}>그냥게시판</h3>
      <div className={styles.community_header}>
        <form action="" className={styles.searchForm}>
          <select name="searchType" className={styles.searchSelect}>
            <option value="title">제목</option>
          </select>
          <input type="text" name="keyword" className={styles.searchInput} defaultValue={keyword} autoComplete="off" />
          <button className={styles.searchBtn}>
            <i className="fa-solid fa-magnifying-glass" style={{ color: '#111' }}></i>
          </button>
        </form>
      </div>

      <div className={styles.board_list}>
        {posts.map((post, i) => (
          <div className={styles.board_item} key={i}>
            <Link href={`/detail/${post._id}`} className={styles.title}>
              {post.title}
            </Link>
            <div className={styles.writer}>{post.writer}</div>
            <div className={styles.date}>{formatDate(post.date)}</div>
            <div className={styles.view}>
              <i className="fa-regular fa-eye" style={{ color: "#000000" }}></i> {post.view}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.buttonBox}>
        <Link href={'/write'}>
          <button className={styles.writeBtn}>글쓰기</button>
        </Link>
      </div>
      <Pagination totalPage={totalPage} currentPage={page} keyword={keyword} />
    </div>
  );
}
