import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  onClick: () => void
}
export const RoundedButton = (props: ButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    className='px-5 py-2 border-2 rounded-full'
    onClick={props.onClick}
  >
    {props.children}
  </motion.button>
)
