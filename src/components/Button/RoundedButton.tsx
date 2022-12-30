import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  type?: 'submit' | 'button'
}
export const RoundedButton = ({
  children,
  onClick,
  type = 'button',
}: ButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    className='px-5 py-2 border-2 rounded-full'
    onClick={onClick}
    type={type}
  >
    {children}
  </motion.button>
)
