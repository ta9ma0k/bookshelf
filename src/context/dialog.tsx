import { ReactNode, useCallback, useState } from 'react'
import { createCtx } from '../util/createCtx'

type DialogCtxType = {
  show: boolean
  openDialog: () => void
  closeDialog: () => void
}

const { useCtx, Provider } = createCtx<DialogCtxType>()

const _useCtx = (): DialogCtxType => {
  const [show, setShow] = useState(false)

  const openDialog = useCallback(() => setShow(true), [])
  const closeDialog = useCallback(() => setShow(false), [])

  return {
    show,
    openDialog,
    closeDialog,
  }
}

export const useDialog = useCtx
export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const ctxValue = _useCtx()
  return <Provider value={ctxValue}>{children}</Provider>
}
