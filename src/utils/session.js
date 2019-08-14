import { Auth } from 'aws-amplify'
import { StorageHelper } from '@aws-amplify/core'
import { CognitoAuth } from 'amazon-cognito-auth-js'
import debugFactory from 'debug'
import moment from 'moment'
import aws4 from 'react-native-aws4'
import { AsyncStorage } from 'react-native'
import { AWS_USER_POOL_ID, AWS_USER_CLIENT_POOL_ID, COGNITO_DOMAIN } from 'react-native-dotenv'
import { strings } from '../components/Translate'
import http, { instance, setHeaderLocale } from './http'

export const Storage = new StorageHelper().getStorage()
const cognitoAuthParams = {
  ClientId: AWS_USER_CLIENT_POOL_ID,
  UserPoolId: AWS_USER_POOL_ID,
  AppWebDomain: COGNITO_DOMAIN,
  TokenScopesArray: ['email', 'name', 'cover', 'openid', 'aws.cognito.signin.user.admin'],
  RedirectUriSignIn: 'https://www.yester.app/auth',
  RedirectUriSignOut: 'https://www.yester.app/auth',
  IdentityProvider: 'Facebook',
  ResponseType: 'code',
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

export const extractTokenFromCredentials = async () => {
  const currentCredentials = await Auth.currentCredentials()
  return currentCredentials.sessionToken
}

export const getToken = () => extractTokenFromCredentials()

export const setAuthHeader = async (token) => {
  try {
    token = token || (await getToken())
    debugInfo('Defining auth header')
    if (token) {
      instance.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }
  } catch (error) {
    debugError('There is no token to set', error)
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
  await Auth.signOut()
  debugInfo('User logued out')
}

export const getUser = () => Auth.currentAuthenticatedUser()

export const getUserBypassCache = () =>
  Auth.currentAuthenticatedUser({
    bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  })

export const sanitizeUser = (user) => {
  if (!user) {
    return {}
  }
  return {
    country: user['country'],
    state: user['state'],
    birthPlace: user['birthplace'],
    platform: user['platform'],
    notifications: user['notifications'],
    birthDate: user['birthdate'],
    gender: user['gender'],
    locale: user['locale'],
    name: user['name'] || `${user['given_name']} ${user['family_name']}`,
    givenName: user['given_name'],
    lastName: user['family_name'],
    email: user['email'],
    userId: user['user_id'],
  }
}

export const getAPIUser = () => {
  try {
    const { data: user } = http.getAPI('/v2/users/')
    debugInfo('Got user:', user)
    return user
  } catch (e) {
    debugError(e)
  }
}

export const postAPIUser = (user) => {
  try {
    if (getAPIUser()) {
      if (user['given_name'] !== undefined) delete user['given_name']
      if (user['family_name'] !== undefined) delete user['family_name']
    }
    http.postAPI('/v2/users/', user)
    debugInfo('Posted user:', user)
  } catch (e) {
    debugError(e)
  }
}

export const isSetupFinished = async () => {
  const user = sanitizeUser(await getUserBypassCache())
  const notFinished = { finished: false, params: user }

  if (!Object.keys(user).length) return notFinished
  if (!user.country) return notFinished
  if (!user.state) return notFinished
  if (!user.birthDate) return notFinished
  if (!user.gender) return notFinished

  Object.assign(user, { updateSetup: true })
  const notUpdated = { finished: false, params: user }

  if (!user.birthPlace) return notUpdated
  if (!user.platform) return notUpdated
  if (user.notifications === undefined) return notUpdated

  return { finished: true, params: user }
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

export const saveUserData = async ({ birthDate, country, state, gender, birthPlace, platform }) => {
  const user = await getUser()
  await Auth.updateUserAttributes(user, {
    'custom:country': country,
    'custom:state': state,
    'custom:birthPlace': birthPlace,
    'custom:platform': platform,
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
  if (user[name] !== value) {
    await Auth.updateUserAttributes(user, { [name]: value })
  }
  postAPIUser({ email: user.attributes['email'], [name]: value })
}

// NOTE this is only for dev purposes
export const cleanUserData = async () => {
  const user = await getUser()
  await Auth.updateUserAttributes(user, {
    'custom:country': '',
    'custom:state': '',
    'custom:birthPlace': '',
    'custom:platform': '',
    birthdate: '',
    gender: '',
    'custom:subscription_status': '',
  })
}

// NOTE this is only for dev purposes
export const cleanUserNotifications = async () => {
  const user = await getUser()
  await Auth.updateUserAttributes(user, {
    'custom:notifications': '',
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
        debugInfo(user, 'Sign in success')
        resolve(user)
      },
      onFailure: (err) => {
        debugError('Sign in error', err)
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

export const signRequest = async (request) => {
  const credentials = await Auth.currentCredentials()
  const signedRequest = aws4.sign(request, {
    secretAccessKey: credentials.secretAccessKey,
    accessKeyId: credentials.accessKeyId,
    sessionToken: credentials.sessionToken,
  })

  debugInfo('signedRequest: ', signedRequest)
  delete signedRequest.headers['Content-Length']

  return signedRequest
}
