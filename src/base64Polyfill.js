// SOURCE: https://stackoverflow.com/a/51525605/4394520
import {decode, encode} from 'base-64'

if (!global.btoa) {
  global.btoa = encode
}

if (!global.atob) {
  global.atob = decode
}
