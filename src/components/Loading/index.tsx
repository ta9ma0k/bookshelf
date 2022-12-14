import { motion } from 'framer-motion'
import React from 'react'

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const DotVariants = {
  initial: {
    y: '0%',
  },
  animate: {
    y: '100%',
  },
}

const DotTransition = {
  duration: 0.3,
  yoyo: Infinity,
  ease: 'easeInOut',
}

export const Loading = () => (
  <motion.div
    variants={ContainerVariants}
    className='flex flex-row space-x-4'
    initial='initial'
    animate='animate'
  >
    {[...Array(3)].map((_, i) => (
      <React.Fragment key={`LoadingBox-${i}`}>
        <LoadingBox />
      </React.Fragment>
    ))}
  </motion.div>
)

const LoadingBox = () => (
  <motion.div
    className='w-8 h-8 rounded-lg border-2 border-gray-300'
    variants={DotVariants}
    transition={DotTransition}
  />
)
