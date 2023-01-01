import { motion } from 'framer-motion'
import clsx from 'clsx'
import { UseFormRegisterReturn } from 'react-hook-form'

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'

type TextareaProps = FieldWrapperPassThroughProps & {
  className?: string
  cols?: number
  rows?: number
  placeholder?: string
  registration: Partial<UseFormRegisterReturn>
}

export const Textarea = (props: TextareaProps) => {
  const { label, className, registration, error, cols, rows, placeholder } =
    props
  return (
    <FieldWrapper label={label} error={error}>
      <motion.textarea
        whileFocus={{ scale: 1.05 }}
        whileHover={{ scale: 1.05 }}
        cols={cols}
        rows={rows}
        placeholder={placeholder}
        className={clsx(
          'resize-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500',
          className
        )}
        {...registration}
      />
    </FieldWrapper>
  )
}
