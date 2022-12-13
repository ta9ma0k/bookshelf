import { BookRepositoryMock } from '../../interface/mock/domain/book'

export type Book = {
  title: string
  imgSrc: string
  owner: string
}
export interface BookRepositoryInterface {
  find: () => Promise<Book[]>
}

export const BookRepository = BookRepositoryMock
