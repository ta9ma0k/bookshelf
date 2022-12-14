import { ReactNode } from 'react'
import { NotificationProvider } from '../Notification'
import { Sidebar } from '../Sidebar'

export const Layouts = ({ children }: { children: ReactNode }) => (
  <NotificationProvider>
    <div className='min-w-[600px]'>
      <Sidebar>{children}</Sidebar>
    </div>
  </NotificationProvider>
)
