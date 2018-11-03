
import { Auth } from 'aws-amplify'
import { StorageHelper } from '@aws-amplify/core'
import { CognitoAuth } from 'amazon-cognito-auth-js'
import debugFactory from 'debug'
import { AsyncStorage } from 'react-native'
import {
  AWS_USER_POOL_ID,
  AWS_USER_CLIENT_POOL_ID,
  HOST,
} from 'react-native-dotenv'

import { instance } from './http'

export const Storage = new StorageHelper().getStorage()
const cognitoAuthParams = {
  ClientId: AWS_USER_CLIENT_POOL_ID,
  UserPoolId: AWS_USER_POOL_ID,
  AppWebDomain: HOST,
  TokenScopesArray: [
    'email',
    'name',
    'cover',
  ],
  RedirectUriSignIn: 'https://www.facebook.com',
  RedirectUriSignOut: 'https://www.facebook.com',
  IdentityProvider: 'Facebook',
  ResponseType: 'token',
  Storage,
}

const cognitoAuthClient = new CognitoAuth(cognitoAuthParams)

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

  if (!user.attributes['custom:birthDate']) {
    return false
  }

  return true
}

export const saveUserData = async ({birthDate, country, state}) => {
  const user = await getUser()
  await Auth.updateUserAttributes(user, {
    'custom:country': country,
    'custom:state': state,
    'custom:birthDate': birthDate,
  })
}

// NOTE this is only for dev purposes
export const cleanUserData = async () => {
  const user = await getUser()
  await Auth.updateUserAttributes(user, {
    'custom:country': '',
    'custom:state': '',
    'custom:birthDate': '',
  })
}

export const loginWithFBWebView = (url) => new Promise((resolve, reject) => {
  cognitoAuthClient.userhandler = {
    onSuccess: async result => {
      const user = await getUser()
      await saveUserToken()
      console.log(user, 'Sign in success')
      resolve(user)
    },
    onFailure: err => {
      console.log(err, 'Sign in error')
      reject(err)
    },
  }
  cognitoAuthClient.parseCognitoWebResponse(url)
})
