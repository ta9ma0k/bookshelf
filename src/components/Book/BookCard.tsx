import { useCallback } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { BookIcon } from '../Icon'

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
