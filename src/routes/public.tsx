import { Navigate } from 'react-router-dom'
import { Login } from '../features/Login'

export const publicRoutes = [
  { path: '/login', element: <Login /> },
  { path: '*', element: <Navigate to='/login' /> },
]
