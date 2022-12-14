import { NotificationProvider } from './components/Notification'
import { RequestBook } from './Feature/RequestBook'

const App = () => {
  return (
    <div className='min-w-[50%]'>
      <NotificationProvider>
        <RequestBook />
      </NotificationProvider>
    </div>
  )
}

export default App
