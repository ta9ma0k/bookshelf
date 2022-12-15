import { BookInfoRepositoryGoogleApiImpl } from '../../infrastructure/googleApi/domain/bookinfo'

export type BookInfo = {
  isbn: string
  title: string
  imgSrc?: string
}
export interface BookInfoRepositoryInterface {
  findByKeyword: (keyword: string) => Promise<BookInfo[]>
}

export const BookInfoRepository: BookInfoRepositoryInterface =
  BookInfoRepositoryGoogleApiImpl
