import { Book, BookRepositoryInterface } from '../../../../domain/book'
import { baseApi } from '../api'

type BookResponse = {
  title: string
  imgSrc: string
}
type BooksResponse = BookResponse[]
export const BookRepositoryApiImpl: BookRepositoryInterface = {
  find: () =>
    baseApi
      .get<BooksResponse>('/books')
      .then((res) =>
        res.data.map((d) => ({ title: d.title, imgSrc: d.imgSrc } as Book))
      ),
}
