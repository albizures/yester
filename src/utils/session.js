
import { Auth } from 'aws-amplify'
import { AsyncStorage } from 'react-native'

import { instance } from './http'

export const saveUserToken = async () => {
  const currentSession = await Auth.currentSession()
  const userToken = currentSession.accessToken.jwtToken
  AsyncStorage.setItem('userToken', userToken)
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + currentSession.accessToken.jwtToken
}

export const logIn = async (email, password) => {
  await Auth.signIn(email, password)
  await saveUserToken()
}
