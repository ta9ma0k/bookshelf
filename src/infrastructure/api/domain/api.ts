import axios from 'axios'

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})
