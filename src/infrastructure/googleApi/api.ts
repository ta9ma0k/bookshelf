import axios from 'axios'

const GoogleBookApiUrl = 'https://www.googleapis.com/books/v1'
export const baseBookApi = axios.create({
  baseURL: GoogleBookApiUrl,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})
