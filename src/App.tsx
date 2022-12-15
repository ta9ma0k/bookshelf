import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AddBooks } from './feature/AddBooks'
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
    path: 'add-books',
    element: <AddBooks />,
  },
])
const App = () => {
  return <RouterProvider router={router} />
}

export default App
