import { Auth } from 'aws-amplify'
import { StorageHelper } from '@aws-amplify/core'
import { AsyncStorage } from 'react-native'
import { strings } from '../components/Translate'
import http, { instance, setHeaderLocale } from './http'
import { LoginManager } from 'react-native-fbsdk'
import { sendTags } from '../utils/notifications'
import { getPurchaserInfo, status } from '../utils/purchase'
import moment from 'moment'
import debugFactory from 'debug'

export const Storage = new StorageHelper().getStorage()

Auth.configure({ storage: Storage })

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
  // await saveUserToken()
}

export const forgotPasswordSubmit = async (email, code, password) => {
  await Auth.forgotPasswordSubmit(email, code, password)
  // await saveUserToken()
}

export const logOut = async () => {
  await AsyncStorage.clear()
  delete instance.defaults.headers.common['Authorization']
  await Auth.signOut()
  await LoginManager.logOut()
  debugInfo('User logued out')
}

export const getUser = () => Auth.currentAuthenticatedUser()

export const getUserBypassCache = () =>
  Auth.currentAuthenticatedUser({
    bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  })

export const sanitizeUser = async (user) => {
  user = await getAPIUser()
  if (!user) {
    return {}
  }

  const { data: stats = {} } = await http.getAPI('/v2/stories/stats')

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
    emailVerified: user['email_verified'],
    created: user['created'],
    purchaserInfo: user['purchaser_info'],
    questionCounter: stats['questionCounter'],
    storyCounter: stats['storyCounter'],
    lastAnswer: stats['lastAnswer'],
    lastQuestion: stats['lastQuestion'],
    maxLength: stats['maxLength'],
  }
}

export const getAPIUser = async () => {
  try {
    debugInfo('API call get user')
    const { data: user } = await http.getAPI('/v2/users/')
    return user
  } catch (err) {
    debugError(err)
  }
}

export const postAPIUser = async (user) => {
  try {
    debugInfo('API call post user')
    await http.postAPI('/v2/users/', user)
  } catch (err) {
    debugError(err)
  }
}

export const isSetupFinished = async (user) => {
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

export const saveUserSubscriptionStatus = async (subscriptionStatus, purchaserInfo, trialDate) => {
  const { code, tag, authorized } = subscriptionStatus
  debugInfo('purchaserInfo:', purchaserInfo)

  const entitlement = purchaserInfo['activeEntitlements'][0]
  const subscription = purchaserInfo['activeSubscriptions'][0]
  const expiration = purchaserInfo['latestExpirationDate']
  const lastPurchase = purchaserInfo['purchaseDatesForActiveEntitlements'][entitlement]

  purchaserInfo = {
    entitlement,
    subscription,
    expiration,
    last_purchase: lastPurchase,
    status: code,
    authorized,
    last_auth: moment().format(),
    trial_date: trialDate,
  }

  sendTags({ subscriptionStatus: tag })
  const currentUser = await Auth.currentAuthenticatedUser()
  await postAPIUser({
    email: currentUser.email,
    purchaser_info: purchaserInfo,
  })
  return authorized
}

export const saveUserData = async ({ birthDate, country, state, gender, birthPlace, platform }) => {
  const currentUser = await Auth.currentAuthenticatedUser()
  await postAPIUser({
    email: currentUser.email,
    country: country,
    state: state,
    birthplace: birthPlace,
    platform: platform,
    birthdate: birthDate,
    gender: gender,
  })
}

export const updateUserAttribute = async (name, value) => {
  // TODO async storage to compare local and cloud attributes
  // const user = await sanitizeUser()
  // if (user[name] !== value) {
  const currentUser = await Auth.currentAuthenticatedUser()
  await postAPIUser({
    email: currentUser.email,
    [name]: value,
  })
  // }
}

// NOTE this is only for dev purposes
export const cleanUserData = async () => {
  const currentUser = await Auth.currentAuthenticatedUser()
  await postAPIUser({
    email: currentUser.email,
    country: '',
    state: '',
    birthplace: '',
    platform: '',
    birthdate: '',
    gender: '',
    subscription_status: '',
  })
}

// NOTE this is only for dev purposes
export const cleanUserNotifications = async () => {
  const currentUser = await Auth.currentAuthenticatedUser()
  await postAPIUser({
    email: currentUser.email,
    notifications: '',
  })
}

export const setLocale = (locale) => {
  locale = locale || 'en'
  debugInfo('Setting app language: ', locale)
  setHeaderLocale(locale)
  moment.locale(locale)
  strings.setLanguage(locale)
}

export const isEven = (user) => {
  const hour = moment(user.created).hour()
  return hour % 2 === 0
}

export const isAuthorized = async (user, purchaserInfo) => {
  purchaserInfo = purchaserInfo || (await getPurchaserInfo()) || {}
  const { activeEntitlements = [], allExpirationDates = {} } = purchaserInfo
  const { storyCounter } = user
  debugInfo('activeEntitlements:', activeEntitlements)

  const purchasedProducts = Object.keys(allExpirationDates)
  const hasEverPurchased = purchasedProducts.length > 0

  if (!hasEverPurchased) {
    if (isEven(user)) {
      if (storyCounter <= 5) {
        return saveUserSubscriptionStatus(status.WELCOME, purchaserInfo)
      } else {
        return saveUserSubscriptionStatus(status.EVEN_REQUIRE, purchaserInfo)
      }
    } else {
      return saveUserSubscriptionStatus(status.ODD_REQUIRE, purchaserInfo)
    }
  } else {
    if (activeEntitlements.includes('pro')) {
      return saveUserSubscriptionStatus(status.PRO, purchaserInfo)
    } else {
      return saveUserSubscriptionStatus(status.EXPIRED, purchaserInfo)
    }
  }
}
