import { BookApi } from '../../lib/api'
import { storage } from '../../util/storage'

type LoginCredentials = {
  email: string
  password: string
}

export const login = (credentials: LoginCredentials) =>
  BookApi.post('/login', credentials).then((res) => {
    const token = res.headers["authorization"]
    if (token) {
      storage.setToken(token)
    } 
  })
