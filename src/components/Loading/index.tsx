import { motion } from 'framer-motion'

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
    <LoadingBox key='loading-box-1' />
    <LoadingBox key='loading-box-2' />
    <LoadingBox key='loading-box-3' />
  </motion.div>
)

const LoadingBox = ({ key }: { key: string }) => (
  <motion.div
    key={key}
    className='w-8 h-8 rounded-lg border-2 border-gray-300'
    variants={DotVariants}
    transition={DotTransition}
  />
)
