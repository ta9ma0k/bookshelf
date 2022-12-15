import { BookApi } from '../../lib/api'
import { Book } from './type'

type BookResponse = {
  title: string
  imgSrc: string
}
export const find = () =>
  BookApi.get<BookResponse[]>('/books').then((res) =>
    res.data.map((d) => ({ title: d.title, imgSrc: d.imgSrc } as Book))
  )

export const createRequest = (bookId: string, applicantId: string) =>
  BookApi.post('/requests', { bookId, applicantId })
