import axios, { AxiosRequestConfig } from 'axios'
import { storage } from '../util/storage'

const authRequestInterceptor = (config: AxiosRequestConfig) => {
  const token = storage.getToken()

  if (token && config.headers) {
    config.headers.Authorization = `${token}`
  }
  return config
}

export const BookApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})
BookApi.interceptors.request.use(authRequestInterceptor)

const GoogleBookApiUrl = 'https://www.googleapis.com/books/v1'
export const GooleBookApi = axios.create({
  baseURL: GoogleBookApiUrl,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})
