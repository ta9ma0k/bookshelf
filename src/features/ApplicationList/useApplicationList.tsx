import { ReactNode, useMemo } from 'react'
import { createCtx } from '../../util/createCtx'
import { Resource, toResource } from '../../util/resource'
import { findAll } from './api'
import { Application } from './type'

type UseApplicationListCtxType = {
  applicationListResource: Resource<Application[]>
}

const { useCtx, Provider } = createCtx<UseApplicationListCtxType>()

const _useCtx = (): UseApplicationListCtxType => {
  const applicationListResource = useMemo(() => toResource(findAll)(), [])

  return {
    applicationListResource,
  }
}

export const useApplicationList = useCtx
export const ApplicationListProvider = (props: { children: ReactNode }) => {
  const ctxValue = _useCtx()
  return <Provider value={ctxValue}>{props.children}</Provider>
}
