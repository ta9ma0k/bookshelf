import { BookApi, GooleBookApi } from '../../lib/api'
import { BookInfo } from './type'

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

const maxResults = 9
export const findByKeyword = (keyword: string) =>
  GooleBookApi.get<BookInfoLIstResponse>('/volumes', {
    params: { q: keyword, maxResults },
  }).then((res) =>
    res.data.items
      .filter(({ volumeInfo }) =>
        hasIsbn(volumeInfo.industryIdentifiers, volumeInfo.title)
      )
      .map(({ volumeInfo }) => {
        return {
          isbn: getIsbn(volumeInfo.industryIdentifiers, volumeInfo.title),
          title: volumeInfo.title,
          thumbnailUrl: volumeInfo.imageLinks?.thumbnail,
        } as BookInfo
      })
  )

const hasIsbn = (
  identifiers: IndustryIdentifiersType[],
  bookTitle: string
): boolean => {
  if (identifiers === undefined) {
    console.warn(`Not exists industry identifier [title=${bookTitle}]`)
    return false
  }
  const isbn10 = identifiers.find(({ type }) => type === 'ISBN_10')
  const isbn13 = identifiers.find(({ type }) => type === 'ISBN_13')

  return !!isbn10 || !!isbn13
}
const getIsbn = (
  identifiers: IndustryIdentifiersType[],
  bookTitle: string
): string => {
  const isbn10 = identifiers.find(({ type }) => type === 'ISBN_10')
  const isbn13 = identifiers.find(({ type }) => type === 'ISBN_13')
  if (isbn13) {
    return isbn13.identifier
  }
  if (isbn10) {
    return isbn10.identifier
  }
  throw new Error(`Not exists isbn [title:${bookTitle}]`)
}

export const registerBook = (
  isbn: string,
  title: string,
  thumbnailUrl?: string
) => BookApi.post(`/books/${isbn}/assets`, { isbn, title, thumbnailUrl })
