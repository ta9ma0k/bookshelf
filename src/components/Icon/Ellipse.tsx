import clsx from 'clsx'
import { ReactNode } from 'react'

type Props = {
  color: 'blue' | 'yellow' | 'green'
  children?: ReactNode
}
export const EllipseIcon = (props: Props) => (
  <div
    className={clsx(
      'text-xs rounded-full w-16 text-gray-600 font-semibold px-2 py-1 text-gray-600 text-center',
      props.color === 'blue'
        ? 'bg-blue-200'
        : props.color === 'yellow'
        ? 'bg-yellow-200'
        : 'bg-teal-200'
    )}
  >
    {props.children}
  </div>
)
