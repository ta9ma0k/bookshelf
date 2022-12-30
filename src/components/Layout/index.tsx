import { ReactNode } from 'react'
import { Sidebar } from '../Sidebar'

export const Layouts = ({ children }: { children: ReactNode }) => (
  <div className='min-w-[600px]'>
    <Sidebar>
      <div className='mt-6 flex flex-col items-center'>{children}</div>
    </Sidebar>
  </div>
)
