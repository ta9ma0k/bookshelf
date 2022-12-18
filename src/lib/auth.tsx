import { ReactNode } from 'react'
import { createCtx } from '../util/createCtx'
import { storage } from '../util/storage'

type UseAuthCtxValue = {
  isLogin: () => boolean
}

const { useCtx, Provider } = createCtx<UseAuthCtxValue>()

const _useCtx = (): UseAuthCtxValue => {
  const isLogin = () => !!storage.getToken()

  return {
    isLogin,
  }
}

export const useAuth = useCtx
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const ctxValue = _useCtx()
  return <Provider value={ctxValue}>{children}</Provider>
}
