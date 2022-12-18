import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'
import { CloseIcon } from '../Icon'

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
  show: boolean
  close: () => void
  children: ReactNode
}
export const Dialog = ({ show, close, children }: DialogProps) => {
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
              onClick={close}
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
