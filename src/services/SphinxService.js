import axios from 'axios'

const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:8080/data/sphinx'
      : 'https://libcellml.github.io/data/sphinx',
  withCredentials: false,
  headers: {
    Accept: 'text/xml',
    'Content-Type': 'text/xml',
  },
  timeout: 10000,
})

export default {
  getPage(page) {
    return apiClient.get('/' + page + '.xml')
  },
}
