import { ReactNode, useCallback, useMemo, useState } from 'react'
import { createCtx } from '../../util/createCtx'
import { Resource, toResource } from '../../util/resource'
import { pagingBooks } from './api'
import { Book, PagingBook } from './type'

type UseBookCtxType = {
  isNext: boolean
  next: () => void
  booksResource: Resource<void>
  books: Book[]
}

const { useCtx, Provider } = createCtx<UseBookCtxType>()

type CtxState = { page: number } & PagingBook
const initialState: CtxState = { page: 0, count: 0, data: [] }

const PAGING_LIMIT = 9
const _useCtx = (): UseBookCtxType => {
  const [{ page, count, data: books }, setData] = useState(initialState)
  const addData = useCallback((newData: PagingBook) => {
    setData((s) => ({
      page: ++s.page,
      count: newData.count,
      data: [...s.data, ...newData.data],
    }))
  }, [])
  const fetch = useMemo(() => pagingBooks(addData), [addData])
  const [booksResource, setResource] = useState(() =>
    toResource(fetch)(page, PAGING_LIMIT)
  )
  const isNext = count > page * PAGING_LIMIT
  const next = () => {
    if (isNext) {
      setResource(toResource(fetch)(page, PAGING_LIMIT))
    }
  }

  return {
    isNext,
    next,
    booksResource,
    books,
  }
}

export const usePagingBooks = useCtx
export const PagingBooksProvider = (props: { children: ReactNode }) => {
  const ctxValue = _useCtx()
  return <Provider value={ctxValue}>{props.children}</Provider>
}
