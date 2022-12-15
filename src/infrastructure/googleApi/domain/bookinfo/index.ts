import {
  BookInfo,
  BookInfoRepositoryInterface,
} from '../../../../domain/bookinfo'
import { baseBookApi } from '../api'

type IsbnType = 'ISBN_10' | 'ISBN_13'
type IndustryIdentifiersType = {
  type: IsbnType
  identifier: string
}
type VolumeInfo = {
  title: string
  authors: string[]
  description: string
  industryIdentifiers: IndustryIdentifiersType[]
  imageLinks?: {
    smallThumbnail?: string
    thumbnail?: string
  }
}
type BookInfoLIstResponse = {
  items: {
    volumeInfo: VolumeInfo
  }[]
}
export const BookInfoRepositoryGoogleApiImpl: BookInfoRepositoryInterface = {
  findByKeyword: (keyword: string) =>
    baseBookApi
      .get<BookInfoLIstResponse>('/volumes', { params: { q: keyword } })
      .then((res) =>
        res.data.items.map(
          ({ volumeInfo }) =>
            ({
              isbn: volumeInfo.industryIdentifiers[0].identifier,
              title: volumeInfo.title,
              imgSrc: volumeInfo.imageLinks?.thumbnail,
            } as BookInfo)
        )
      ),
}
