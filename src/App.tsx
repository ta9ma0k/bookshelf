import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AddBook } from './feature/AddBook'
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
    path: 'add-book',
    element: <AddBook />,
  },
])
const App = () => {
  return <RouterProvider router={router} />
}

export default App
