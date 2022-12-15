import { BookApi } from '../../lib/api'
import { Book } from './type'

export const find = () =>
  BookApi.get<Book[]>('/books').then((res) =>
    res.data.map(
      (d) => ({ id: d.id, title: d.title, imgSrc: d.imgSrc } as Book)
    )
  )

export const createRequest = (bookId: string) =>
  BookApi.post('/requests', { bookId })
