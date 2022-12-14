import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RegisterBook } from './feature/RegisterBook'
import { RequestBook } from './feature/RequestBook'
import { RequestList } from './feature/RequestList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RequestBook />,
  },
  {
    path: 'requests',
    element: <RequestList />,
  },
  {
    path: 'book',
    element: <RegisterBook />,
  },
])
const App = () => {
  return <RouterProvider router={router} />
}

export default App
