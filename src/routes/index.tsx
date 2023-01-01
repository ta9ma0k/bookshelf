import { useRoutes } from 'react-router-dom'
import { Layouts } from '../components/Layout'
import { useAuth } from '../context/auth'

import { protectedRoutes } from './protected'
import { publicRoutes } from './public'

export const AppRoutes = () => {
  const { isLogin } = useAuth()

  const routes = isLogin() ? protectedRoutes : publicRoutes

  const element = useRoutes([...routes])

  return <Layouts>{element}</Layouts>
}
