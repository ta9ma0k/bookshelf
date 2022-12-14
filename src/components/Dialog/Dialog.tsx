import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'

const CloseIcon = () => (
  <svg
    className='w-8 h-8 text-gray-500'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    strokeWidth='2'
    stroke='currentColor'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path stroke='none' d='M0 0h24v24H0z' />{' '}
    <line x1='18' y1='6' x2='6' y2='18' />{' '}
    <line x1='6' y1='6' x2='18' y2='18' />
  </svg>
)

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
  onClose: () => void
  children: ReactNode
}
export const Dialog = ({ show, onClose, children }: DialogProps) => {
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
              onClick={onClose}
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
