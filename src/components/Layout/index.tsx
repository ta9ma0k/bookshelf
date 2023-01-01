import { ReactNode } from 'react'

export const Layouts = ({ children }: { children: ReactNode }) => (
  <div className='min-w-[600px]'>
    <div className='flex flex-col items-center'>{children}</div>
  </div>
)
