import { useCallback } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

const BookIcon = () => (
  <svg
    className='h-32 w-32 text-gray-500'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    {' '}
    <path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20' />{' '}
    <path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' />
  </svg>
)
const BUTTON_VARIANTS = {
  visible: {
    opacity: 1,
    y: -50,
    transition: {
      duration: 0.3,
    },
  },
  hidden: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.3,
    },
  },
}
type BookProps = {
  title: string
  imgSrc?: string
  hoverText: string
  onClick: () => void
}
export const BookCard = (props: BookProps) => {
  const controls = useAnimationControls()

  const handleHoverStart = useCallback(() => {
    controls.start(BUTTON_VARIANTS.visible)
  }, [controls])
  const handleHoverEnd = useCallback(() => {
    controls.start(BUTTON_VARIANTS.hidden)
  }, [controls])
  return (
    <motion.div
      className='w-60 h-60 border-2 border-gray-200 rounded-lg hover:cursor-pointer'
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onClick={props.onClick}
    >
      <div className='flex flex-col'>
        <h5 className='font-semibold mt-2 px-3 truncate'>{props.title}</h5>
        <div className='flex flex-row justify-center mt-5'>
          {props.imgSrc ? (
            <img className='w-1/2' src={props.imgSrc} />
          ) : (
            <BookIcon />
          )}
        </div>
        <motion.div
          animate={controls}
          className='opacity-0 flex justify-center'
        >
          <div className='bg-gray-100 px-5 py-3 rounded-full text-sm font-semibold'>
            {props.hoverText}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
