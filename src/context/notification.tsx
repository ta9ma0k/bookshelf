import { ReactNode, useCallback, useState } from 'react'
import { Notification } from '../components/Notification'
import { createCtx } from '../util/createCtx'
import sleep from '../util/sleep'

type AlertColor = 'success' | 'warning' | 'error'

type NotificationContextType = {
  openNotification: (message: string, color?: AlertColor) => void
}

type NotificationType = {
  open: boolean
  message: string
  color: AlertColor
}

const initialState = {
  open: false,
  message: '',
  color: 'success',
} as NotificationType

const { useCtx, Provider } = createCtx<NotificationContextType>()

type UseCtxType = {
  state: NotificationType
  open: (message: string, color?: AlertColor) => void
  close: () => void
}
const _useCtx = (): UseCtxType => {
  const [state, setState] = useState(initialState)

  const open = useCallback((message: string, color?: AlertColor) => {
    setState({ open: true, message, color: color ?? 'success' })
    sleep(2).then(() => setState((s) => ({ ...s, open: false })))
  }, [])

  const close = useCallback(() => setState((s) => ({ ...s, open: false })), [])

  return {
    state,
    open,
    close,
  }
}

export const useNotification = useCtx
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { state, open } = _useCtx()

  return (
    <Provider value={{ openNotification: open }}>
      <Notification
        open={state.open}
        color={state.color}
        message={state.message}
      />
      {children}
    </Provider>
  )
}
