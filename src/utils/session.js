
import { Auth } from 'aws-amplify'
import debugFactory from 'debug'
import { AsyncStorage } from 'react-native'

import { instance } from './http'

const debug = debugFactory('yester:session')

const TOKEN_KEY = 'userToken'

export const getToken = () => AsyncStorage.getItem(TOKEN_KEY)

export const setAuthHeader = async (token) => {
  token = token || (await getToken())

  debug('defining auth header')
  if (token) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }
}

export const saveUserToken = async () => {
  const currentSession = await Auth.currentSession()
  const userToken = currentSession.accessToken.jwtToken
  await AsyncStorage.setItem(TOKEN_KEY, userToken)
  await setAuthHeader(currentSession.accessToken.jwtToken)
}

export const logIn = async (email, password) => {
  await Auth.signIn(email, password)
  await saveUserToken()
}

export const logOut = async () => {
  await AsyncStorage.clear()
  delete instance.defaults.headers.common['Authorization']
}

export const isSetupFinished = async () => {
  const user = await Auth.currentAuthenticatedUser()

  if (!user.attributes) {
    return false
  }

  if (!user.attributes['custom:country']) {
    return false
  }

  if (!user.attributes['custom:state']) {
    return false
  }

  if (!user.attributes['custom:birthDate']) {
    return false
  }

  // const result = await Auth.updateUserAttributes(user, {
  //   'custom:country': 'some country',
  //   'custom:state': 'lele',
  // })

  // console.log(result)

  return true
}
