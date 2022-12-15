import axios from 'axios'

export const BookApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})

const GoogleBookApiUrl = 'https://www.googleapis.com/books/v1'
export const GooleBookApi = axios.create({
  baseURL: GoogleBookApiUrl,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})
