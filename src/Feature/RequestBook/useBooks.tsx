import { ReactNode, useMemo } from 'react'
import { Book, BookRepository } from '../../domain/book'
import { createCtx } from '../../util/createCtx'
import { Resource, toResource } from '../../util/resource'

type UseBookCtxType = {
  booksResource: Resource<Book[]>
}

const { useCtx, Provider } = createCtx<UseBookCtxType>()

const _useCtx = (): UseBookCtxType => {
  const booksResource = useMemo(() => toResource(BookRepository.find)(), [])

  return {
    booksResource,
  }
}

export const useBooks = useCtx
export const BooksProvider = (props: { children: ReactNode }) => {
  const ctxValue = _useCtx()
  return <Provider value={ctxValue}>{props.children}</Provider>
}
