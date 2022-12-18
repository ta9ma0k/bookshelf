import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/auth'
import { DialogProvider } from '../context/dialog'
import { NotificationProvider } from '../context/notification'

const ErrorFallback = () => {
  return (
    <div
      className='text-red-500 w-screen h-screen flex flex-col justify-center items-center'
      role='alert'
    >
      <h2 className='text-lg font-semibold'>Ooops, something went wrong :( </h2>
      <button
        className='mt-4'
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </button>
    </div>
  )
}

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <BrowserRouter>
          <NotificationProvider>
            <DialogProvider>{children}</DialogProvider>
          </NotificationProvider>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  )
}
