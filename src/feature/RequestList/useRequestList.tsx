import { ReactNode, useMemo } from 'react'
import { Request, RequestRepository } from '../../domain/request'
import { createCtx } from '../../util/createCtx'
import { Resource, toResource } from '../../util/resource'

type UseRequestListCtxType = {
  requestListResource: Resource<Request[]>
}

const { useCtx, Provider } = createCtx<UseRequestListCtxType>()

const _useCtx = (): UseRequestListCtxType => {
  const requestListResource = useMemo(
    () => toResource(RequestRepository.findAll)(),
    []
  )

  return {
    requestListResource,
  }
}

export const useRequestList = useCtx
export const RequestListProvider = (props: { children: ReactNode }) => {
  const ctxValue = _useCtx()
  return <Provider value={ctxValue}>{props.children}</Provider>
}
