import { ReactNode, useMemo, useState } from 'react'
import { BookInfo, BookInfoRepository } from '../../domain/bookinfo'
import { createCtx } from '../../util/createCtx'
import { Resource, toResource } from '../../util/resource'

type UseBookInfoCtxType = {
  bookInfoListResource: Resource<BookInfo[]>
  setKeyword: (keyword: string) => void
}

const { useCtx, Provider } = createCtx<UseBookInfoCtxType>()

const _useCtx = (initialKeyword: string): UseBookInfoCtxType => {
  const [keyword, setKeyword] = useState(initialKeyword)
  const bookInfoListResource = useMemo(
    () => toResource(BookInfoRepository.findByKeyword)(keyword),
    [keyword]
  )

  return {
    bookInfoListResource,
    setKeyword,
  }
}

export const useBookInfoList = useCtx
export const BookInfoListProvider = (props: {
  keyword: string
  children: ReactNode
}) => {
  const ctxValue = _useCtx(props.keyword)
  return <Provider value={ctxValue}>{props.children}</Provider>
}
