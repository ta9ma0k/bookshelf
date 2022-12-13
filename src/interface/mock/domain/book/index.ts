import { Book, BookRepositoryInterface } from '../../../../domain/book'
import sleep from '../../../../util/sleep'

const DUMMY_DATA: Book[] = [
  {
    title: 'プログラミングの仕組み',
    imgSrc:
      'http://books.google.com/books/content?id=fbbvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    owner: 'hoge',
  },
  {
    title: 'プログラミングの仕組み',
    imgSrc:
      'http://books.google.com/books/content?id=fbbvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    owner: 'hoge',
  },
  {
    title: 'プログラミングの仕組み',
    imgSrc:
      'http://books.google.com/books/content?id=fbbvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    owner: 'hoge',
  },
  {
    title: 'プログラミングの仕組み',
    imgSrc:
      'http://books.google.com/books/content?id=fbbvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    owner: 'hoge',
  },
]
export const BookRepositoryMock: BookRepositoryInterface = {
  find: () => sleep(2).then(() => DUMMY_DATA),
}
