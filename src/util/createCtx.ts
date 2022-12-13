import React, { createContext, useContext } from 'react'

type ReturnType<T> = {
  useCtx: () => T
  Provider: React.Provider<T | undefined>
}
export const createCtx = <T>(): ReturnType<T> => {
  const ctx = createContext<T | undefined>(undefined)

  const useCtx = () => {
    const c = useContext(ctx)
    if (!c) throw new Error('useCtx must be inside a Provider with a value')
    return c
  }

  return { useCtx, Provider: ctx.Provider } as const
}
