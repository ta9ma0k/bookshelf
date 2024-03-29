import clsx from 'clsx'
import { motion } from 'framer-motion'
import { UseFormRegisterReturn } from 'react-hook-form'

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password'
  className?: string
  defalutValue?: string
  registration: Partial<UseFormRegisterReturn>
}

export const InputField = (props: InputFieldProps) => {
  const {
    type = 'text',
    label,
    className,
    registration,
    error,
    defalutValue,
  } = props
  return (
    <FieldWrapper label={label} error={error}>
      <motion.input
        type={type}
        className={clsx(
          'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
          className
        )}
        {...registration}
        whileHover={{ scale: 1.05 }}
        whileFocus={{ scale: 1.05 }}
        defaultValue={defalutValue}
      />
    </FieldWrapper>
  )
}
