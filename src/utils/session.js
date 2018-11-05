import { Auth } from 'aws-amplify'
import debugFactory from 'debug'
import { AsyncStorage } from 'react-native'

import { instance } from './http'

const debug = debugFactory('yester:session')

export const extractTokenFromSession = async () => {
  const currentSession = await Auth.currentSession()
  return currentSession.accessToken.jwtToken
}

export const getToken = () => extractTokenFromSession()

export const setAuthHeader = async (token) => {
  try {
    token = token || (await getToken())
    debug('defining auth header')
    if (token) {
      instance.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }
  } catch (error) {
    debug('there is not token', error)
  }
}

export const saveUserToken = async () => {
  await setAuthHeader()
}

export const logIn = async (email, password) => {
  await Auth.signIn(email, password)
  await saveUserToken()
}

export const logOut = async () => {
  await AsyncStorage.clear()
  delete instance.defaults.headers.common['Authorization']
}

export const getUser = () => Auth.currentAuthenticatedUser()

export const isSetupFinished = async () => {
  const user = await getUser()

  if (!user.attributes) {
    return false
  }

  if (!user.attributes['custom:country']) {
    return false
  }

  if (!user.attributes['custom:state']) {
    return false
  }

  if (!user.attributes['birthdate']) {
    return false
  }

  if (!user.attributes['gender']) {
    return false
  }

  return true
}

export const isSubscribed = async () => {
  const user = await getUser()

  if (!user.attributes) {
    return false
  }

  if (!user.attributes['custom:subscription_status']) {
    return false
  }

  if (user.attributes['custom:subscription_status'] !== 1) {
    return false
  }

  return true
}

export const saveUserData = async ({birthDate, country, state, gender}) => {
  const user = await getUser()
  await Auth.updateUserAttributes(user, {
    'custom:country': country,
    'custom:state': state,
    'birthdate': birthDate,
    'gender': gender,
  })
}

export const saveUserSubscriptionStatus = async (subscriptionStatus) => {
  const user = await getUser()
  await Auth.updateUserAttributes(user, {
    'custom:subscription_status': subscriptionStatus,
  })
}

// NOTE this is only for dev purposes
export const cleanUserData = async () => {
  const user = await getUser()
  await Auth.updateUserAttributes(user, {
    'custom:country': '',
    'custom:state': '',
    'birthdate': '',
    'gender': '',
    'custom:subscription_status': '',
  })
}
