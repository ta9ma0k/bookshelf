import { motion } from 'framer-motion'
import { NextIcon } from '../Icon'

type Props = {
  onClick: () => void
}
export const NextButton = ({ onClick }: Props) => (
  <motion.button
    whileHover={{ y: 10 }}
    onClick={onClick}
    className='border-2 rounded-full border-gray-300 text-gray-300 duration-100'
  >
    <NextIcon />
  </motion.button>
)
