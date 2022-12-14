import { NotificationProvider } from './components/Notification'
import { Sidebar } from './components/Sidebar'
import { RequestBook } from './Feature/RequestBook'

const App = () => {
  return (
    <div className='min-w-[600px]'>
      <NotificationProvider>
        <Sidebar>
          <RequestBook />
        </Sidebar>
      </NotificationProvider>
    </div>
  )
}

export default App
