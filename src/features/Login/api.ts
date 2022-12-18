import { BookApi } from '../../lib/api'
import { storage } from '../../util/storage'

type LoginCredentials = {
  email: string
  password: string
}

type UserResponse = {
  jwt: string
}

export const login = (credentials: LoginCredentials) =>
  BookApi.post<UserResponse>('/auth/login', credentials).then((res) => {
    storage.setToken(res.data.jwt)
  })
