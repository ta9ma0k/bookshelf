import { BookApi } from '../../lib/api'
import { Book } from './type'

export const find = () =>
  BookApi.get<Book[]>('/books').then((res) =>
    res.data.map(
      (d) => ({ isbn: d.isbn, title: d.title, imgSrc: d.imgSrc } as Book)
    )
  )

export const createUsageApplication = (isbn: string) =>
  BookApi.post('/usage-applications', { isbn })
