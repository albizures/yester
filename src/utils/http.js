import axios from 'axios'
import { HOST } from 'react-native-dotenv'

export const instance = axios.create({
  baseURL: HOST,
})

export const isFullUrl = (url) => url.startsWith('http')

const getInstance = (url) => isFullUrl(url) ? axios : instance

export default {
  get: (url, params) => getInstance(url).get(url, params),
  del: (url) => getInstance(url).delete(url),
  post: (url, body) => getInstance(url).post(url, body),
  put: (url, body) => getInstance(url).put(url, body),
}
