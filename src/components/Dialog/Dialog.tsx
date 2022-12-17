import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useCallback, useState } from 'react'
import { createCtx } from '../../util/createCtx'
import { CloseIcon } from '../Icon'

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

const variants = {
  hidden: {
    opacity: 0,
    y: '80vh',
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

type DialogProps = {
  children: ReactNode
}
export const Dialog = ({ children }: DialogProps) => {
  const { show, closeDialog } = useDialog()
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial='hidden'
          animate='visible'
          exit='hidden'
          variants={variants}
          className='fixed top-0 right-0 bg-white h-screen w-full p-3'
        >
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              type='button'
              onClick={closeDialog}
            >
              <CloseIcon />
            </motion.button>

            {children}
          </>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
