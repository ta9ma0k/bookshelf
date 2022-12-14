import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RegisterBook } from './Feature/RegisterBook'
import { RequestBook } from './Feature/RequestBook'
import { RequestList } from './Feature/RequestList'

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
