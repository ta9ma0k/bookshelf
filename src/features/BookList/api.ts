import { BookApi } from '../../lib/api'
import { PagingBook } from './type'

export const pagingBooks =
  (addData: (data: PagingBook) => void) => (page: number, limit: number) =>
    BookApi.get<PagingBook>('/books', { params: { page, limit } }).then(
      (res) => {
        addData(res.data)
      }
    )

export const createUsageApplication = (isbn: string, reason: string) =>
  BookApi.post(`/books/${isbn}/usage-applications`, { reason })
