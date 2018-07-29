import axios from 'axios'
import { HOST } from 'react-native-dotenv'

export const instance = axios.create({
  baseURL: HOST,
})

export const isFullUrl = (url) => url.startsWith('http')

const getInstance = (url) => isFullUrl(url) ? axios : instance

export default {
  get (url) {
    return getInstance(url).get(url)
  },
  del (url) {
    return getInstance(url).delete(url)
  },
  post (url, body) {
    return getInstance(url).post(url, body)
  },
  put (url, body) {
    return getInstance(url).put(url, body)
  },
}
