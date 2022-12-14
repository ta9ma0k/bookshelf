import { motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { NotificationProvider } from './components/Notification'
import { Sidebar } from './components/Sidebar'
import { RequestBook } from './Feature/RequestBook'

const App = () => {
  const [showSidebar, setShow] = useState(false)
  const handleOnShowSidebar = useCallback(() => setShow(true), [])
  const handleOnCloseSidebar = useCallback(() => setShow(false), [])
  return (
    <div className='min-w-[600px]'>
      <NotificationProvider>
        <motion.button
          whileHover={{ scale: 1.3 }}
          onClick={handleOnShowSidebar}
          className='text-4xl font-bold mt-5 mx-10'
        >
          B
        </motion.button>
        <Sidebar show={showSidebar} onClose={handleOnCloseSidebar} />
        <RequestBook />
      </NotificationProvider>
    </div>
  )
}

export default App
