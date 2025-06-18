'use client'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/navigation'
import styles from './page.module.css';

export default function Pagination({ totalPage, currentPage, keyword }) {
    const router = useRouter()

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }} className={styles.pagination}>
            <ReactPaginate
                pageCount={totalPage}
                forcePage={currentPage - 1}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                containerClassName={'pagination'}
                activeClassName={'active'}
                onPageChange={(e) => {
                    const page = e.selected + 1
                    const query = new URLSearchParams()
                    if (keyword) query.set('keyword', keyword)
                    query.set('page', page)
                    router.push(`?${query.toString()}`)
                }}
            />
        </div>
    )
}