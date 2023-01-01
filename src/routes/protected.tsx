import { Navigate, Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { ApplicationList } from '../features/ApplicationList'
import { BookList } from '../features/BookList'
import { RegisterBook } from '../features/RegisterBook'

const App = () => {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  )
}

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <BookList /> },
      { path: 'book-registration', element: <RegisterBook /> },
      { path: 'usage-applications', element: <ApplicationList /> },
      { path: '*', element: <Navigate to='/' /> },
    ],
  },
]
