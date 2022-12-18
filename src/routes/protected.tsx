import { Navigate, Outlet } from 'react-router-dom'
import { Layouts } from '../components/Layout'
import { AddBook } from '../features/AddBook'
import { RequestBook } from '../features/RequestBook'
import { RequestList } from '../features/RequestList'

const App = () => {
  return (
    <Layouts>
      <Outlet />
    </Layouts>
  )
}

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <RequestBook /> },
      { path: 'add-book', element: <AddBook /> },
      { path: 'requests', element: <RequestList /> },
      { path: '*', element: <Navigate to='/' /> },
    ],
  },
]
