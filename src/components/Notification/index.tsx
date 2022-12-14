import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useCallback, useState } from 'react'
import { createCtx } from '../../util/createCtx'
import sleep from '../../util/sleep'

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

const variants = {
  hidden: {
    opacity: 0,
    y: '-30vh',
    transition: {
      opacity: {
        duration: 0.4,
      },
      y: {
        duration: 0.2,
      },
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: {
        duration: 0.1,
      },
      y: {
        duration: 0.2,
      },
    },
  },
}
export const useNotification = useCtx
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { state, open } = _useCtx()

  return (
    <Provider value={{ openNotification: open }}>
      <AnimatePresence>
        {state.open ? (
          <motion.div
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={variants}
            className={clsx(
              'fixed top-0 right-0 w-full h-12 bg-white border-b-2 flex flex-row items-center justify-center',
              state.color === 'success'
                ? 'border-teal-200'
                : state.color === 'error'
                ? 'border-pink-200'
                : 'border-yellow-200'
            )}
          >
            <h5 className='text-gray-500 text-xl'>{state.message}</h5>
          </motion.div>
        ) : undefined}
      </AnimatePresence>
      {children}
    </Provider>
  )
}
