import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AddBook } from './features/AddBook'
import { RequestBook } from './features/RequestBook'
import { RequestList } from './features/RequestList'

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
