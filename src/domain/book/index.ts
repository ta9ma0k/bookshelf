import { BookRepositoryApiImpl } from '../../infrastructure/api/domain/book'

export type Book = {
  title: string
  imgSrc: string
}
export interface BookRepositoryInterface {
  find: () => Promise<Book[]>
}

export const BookRepository = BookRepositoryApiImpl
