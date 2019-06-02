import { Auth } from 'aws-amplify'
import { StorageHelper } from '@aws-amplify/core'
import { CognitoAuth } from 'amazon-cognito-auth-js'
import debugFactory from 'debug'
import moment from 'moment'
import { AsyncStorage } from 'react-native'
import { AWS_USER_POOL_ID, AWS_USER_CLIENT_POOL_ID, HOST } from 'react-native-dotenv'
import { strings } from '../components/Translate'
import { instance, setHeaderLocale } from './http'

export const Storage = new StorageHelper().getStorage()
const cognitoAuthParams = {
  ClientId: AWS_USER_CLIENT_POOL_ID,
  UserPoolId: AWS_USER_POOL_ID,
  AppWebDomain: HOST,
  TokenScopesArray: ['email', 'name', 'cover'],
  RedirectUriSignIn: 'https://www.facebook.com',
  RedirectUriSignOut: 'https://www.facebook.com',
  IdentityProvider: 'Facebook',
  ResponseType: 'token',
  Storage,
}

Auth.configure({ storage: Storage })

const cognitoAuthClient = new CognitoAuth(cognitoAuthParams)

const debugInfo = debugFactory('yester:session:info')
const debugError = debugFactory('yester:session:error')

export const extractTokenFromSession = async () => {
  const currentSession = await Auth.currentSession()
  return currentSession.accessToken.jwtToken
}

export const getToken = () => extractTokenFromSession()

export const setAuthHeader = async (token) => {
  try {
    token = token || (await getToken())
    debugInfo('Defining auth header')
    if (token) {
      instance.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }
  } catch (error) {
    debugError('There is not token', error)
  }
}

export const saveUserToken = async () => {
  await setAuthHeader()
}

export const logIn = async (email, password) => {
  await Auth.signIn(email, password)
  await saveUserToken()
}

export const forgotPasswordSubmit = async (email, code, password) => {
  await Auth.forgotPasswordSubmit(email, code, password)
  await saveUserToken()
}

export const logOut = async () => {
  await AsyncStorage.clear()
  delete instance.defaults.headers.common['Authorization']
}

export const getUser = () => Auth.currentAuthenticatedUser()

export const getUserBypassCache = () =>
  Auth.currentAuthenticatedUser({
    bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  })

export const sanitizeUser = (user) => ({
  country: user.attributes['custom:country'],
  state: user.attributes['custom:state'],
  birthDate: user.attributes['birthdate'],
  gender: user.attributes['gender'],
  locale: user.attributes['locale'],
  name: user.attributes['name'] || `${user.attributes.given_name} ${user.attributes.family_name}`,
  givenName: user.attributes.given_name,
  lastName: user.attributes.family_name,
  email: user.attributes['email'],
  userId: user.attributes['sub'],
})

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

  if (user.attributes['custom:subscription_status'] !== '1') {
    return false
  }
  return true
}

export const saveUserData = async ({ birthDate, country, state, gender }) => {
  const user = await getUser()
  await Auth.updateUserAttributes(user, {
    'custom:country': country,
    'custom:state': state,
    birthdate: birthDate,
    gender: gender,
  })
}

export const saveUserSubscriptionStatus = async (subscriptionStatus) => {
  const user = await getUser()
  await Auth.updateUserAttributes(user, {
    'custom:subscription_status': subscriptionStatus,
  })
}

export const updateUserAttribute = async (name, value) => {
  const user = await getUser()
  await Auth.updateUserAttributes(user, { [name]: value })
}

// NOTE this is only for dev purposes
export const cleanUserData = async () => {
  const user = await getUser()
  await Auth.updateUserAttributes(user, {
    'custom:country': '',
    'custom:state': '',
    birthdate: '',
    gender: '',
    'custom:subscription_status': '',
  })
}

// TODO: Use this.updateUserAttribute
export const removeSubscription = async () => {
  const user = await getUser()
  await Auth.updateUserAttributes(user, {
    'custom:subscription_status': '',
  })
}

export const loginWithFBWebView = (url) =>
  new Promise((resolve, reject) => {
    cognitoAuthClient.userhandler = {
      onSuccess: async (result) => {
        const user = await getUser()
        await saveUserToken()
        console.log(user, 'Sign in success')
        resolve(user)
      },
      onFailure: (err) => {
        console.log(err, 'Sign in error')
        reject(err)
      },
    }
    cognitoAuthClient.parseCognitoWebResponse(url)
  })

export const setLocale = (locale) => {
  debugInfo('Saving phone language')
  setHeaderLocale(locale)
  moment.locale(locale)
  strings.setLanguage(locale)
  debugInfo('Phone language saved')
}
