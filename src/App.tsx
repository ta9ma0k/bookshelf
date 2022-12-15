import { AppProvider } from './provider'
import { AppRoutes } from './routes'

const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

export default App
