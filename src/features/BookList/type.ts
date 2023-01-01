export type Book = {
  isbn: string
  title: string
  thumbnailUrl?: string
}
export type PagingBook = {
  count: number
  data: Book[]
}
