import { ReactNode } from 'react'
import { Sidebar } from '../Sidebar'

export const Layouts = ({ children }: { children: ReactNode }) => (
  <div className='min-w-[600px]'>
    <Sidebar>{children}</Sidebar>
  </div>
)
