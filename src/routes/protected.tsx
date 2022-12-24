import { Navigate, Outlet } from 'react-router-dom'
import { Layouts } from '../components/Layout'
import { AddBook } from '../features/AddBook'
import { ApplicationList } from '../features/ApplicationList'
import { BookList } from '../features/BookList'

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
      { path: '/', element: <BookList /> },
      { path: 'add-book', element: <AddBook /> },
      { path: 'usage-applications', element: <ApplicationList /> },
      { path: '*', element: <Navigate to='/' /> },
    ],
  },
]
