import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'

type AlertColor = 'success' | 'warning' | 'error'

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
type NotificationType = {
  open: boolean
  color: AlertColor
  message: string
}
export const Notification = ({ open, color, message }: NotificationType) => (
  <AnimatePresence>
    {open ? (
      <motion.div
        initial='hidden'
        animate='visible'
        exit='hidden'
        variants={variants}
        className={clsx(
          'fixed top-0 right-0 w-full h-12 bg-white border-b-2 flex flex-row items-center justify-center',
          color === 'success'
            ? 'border-teal-200'
            : color === 'error'
            ? 'border-pink-200'
            : 'border-yellow-200'
        )}
      >
        <h5 className='text-gray-500 text-xl'>{message}</h5>
      </motion.div>
    ) : undefined}
  </AnimatePresence>
)
