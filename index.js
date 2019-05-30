import debugFactory from 'debug'

if (__DEV__) {
  debugFactory.enable('yester:*')
}

/* eslint-disable import/first */
import { AppRegistry } from 'react-native'
import App from './src'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
