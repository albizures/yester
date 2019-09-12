import { Auth } from 'aws-amplify'
import { StorageHelper } from '@aws-amplify/core'
import { AsyncStorage, Alert, Platform } from 'react-native'
import { strings, translate } from '../components/Translate'
import http, { instance, setHeaderLocale } from './http'
import { LoginManager } from 'react-native-fbsdk'
import { sendTags } from '../utils/notifications'
import { getPurchaserInfo } from '../utils/purchases'
import moment from 'moment'
import _ from 'lodash'
import DeviceInfo from 'react-native-device-info'
import debugFactory from 'debug'

export const Storage = new StorageHelper().getStorage()

Auth.configure({ storage: Storage })

const debugInfo = debugFactory('yester:session:info')
const debugError = debugFactory('yester:session:error')

export const subscriptionStatus = {
  PREVIEW: { code: '0', tag: 'preview', authorized: true, keyName: 'subscription.name.preview' },
  PRO: { code: '1', tag: 'pro', authorized: true, keyName: 'subscription.name.pro' },
  EXPIRED: { code: '2', tag: 'expired', authorized: false, keyName: 'subscription.name.expired' },
  ODD_REQUIRE: {
    code: '3',
    tag: 'odd_require_trial',
    authorized: false,
    keyName: 'subscription.name.odd_require',
  },
  EVEN_REQUIRE: {
    code: '4',
    tag: 'even_require_trial',
    authorized: false,
    keyName: 'subscription.name.even_require',
  },
}

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

export const getCurrentEmail = async () => {
  const currentUser = await Auth.currentAuthenticatedUser()
  const email = currentUser.email || currentUser.attributes.email
  return email
}

export const sanitizeUser = async (user) => {
  user = await getAPIUser()
  if (!user) {
    return {}
  }

  return {
    country: user.country,
    state: user.state,
    birthPlace: user.birthplace,
    platform: user.platform,
    notifications: user.notifications,
    birthDate: user.birthdate,
    gender: user.gender,
    locale: user.locale,
    name: user.name || `${user['given_name']} ${user['family_name']}`,
    givenName: user['given_name'],
    lastName: user['family_name'],
    email: user.email,
    userId: user['user_id'],
    emailVerified: user['email_verified'],
    created: user.created,
    purchaserInfo: user['purchaser_info'],
    auth: user.auth,
  }
}

export const sanitizeStats = async () => {
  const { data: stats = {} } = await http.getAPI('/v2/stories/stats')
  return {
    questionCounter: stats.questionCounter,
    storyCounter: stats.storyCounter,
    lastAnswer: stats.lastAnswer,
    lastQuestion: stats.lastQuestion,
    maxLength: stats.maxLength,
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

export const saveUserSubscriptionStatus = async (currentStatus, purchaserInfo, trialDate) => {
  const { code, tag, authorized } = currentStatus
  debugInfo('purchaserInfo:', purchaserInfo)
  if (_.isEmpty(purchaserInfo)) return false

  const entitlement = purchaserInfo.activeEntitlements[0]
  const subscription = purchaserInfo.activeSubscriptions[0]
  const expiration =
    purchaserInfo.latestExpirationDate !== null
      ? purchaserInfo.latestExpirationDate
      : undefined
  const lastPurchase = purchaserInfo.purchaseDatesForActiveEntitlements[entitlement]

  purchaserInfo = {
    entitlement,
    subscription,
    expiration,
    last_purchase: lastPurchase,
    trial_date: trialDate,
  }

  const auth = {
    authorized,
    last_auth: moment().format(),
    status: code,
  }

  sendTags({ subscriptionStatus: tag })
  const email = await getCurrentEmail()
  await postAPIUser({
    email,
    purchaser_info: purchaserInfo,
    auth,
  })
}

export const saveUserData = async ({ birthDate, country, state, gender, birthPlace, platform }) => {
  const email = await getCurrentEmail()
  await postAPIUser({
    email,
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
  const email = await getCurrentEmail()
  await postAPIUser({
    email,
    [name]: value,
  })
  // }
}

// NOTE this is only for dev purposes
export const cleanUserData = async () => {
  const email = await getCurrentEmail()
  await postAPIUser({
    email,
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
  const email = await getCurrentEmail()
  await postAPIUser({
    email,
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

export const isAuthorized = async (user, stats) => {
  let currentStatus = {}
  const purchaserInfo = await getPurchaserInfo()
  const { activeEntitlements = [], allExpirationDates = {} } = purchaserInfo || {}
  const { storyCounter } = stats
  debugInfo('activeEntitlements:', activeEntitlements)

  const purchasedProducts = Object.keys(allExpirationDates)
  const hasEverPurchased = purchasedProducts.length > 0

  if (!hasEverPurchased) {
    if (isEven(user)) {
      if (storyCounter < 5) {
        currentStatus = subscriptionStatus.PREVIEW
      } else {
        currentStatus = subscriptionStatus.EVEN_REQUIRE
      }
    } else {
      currentStatus = subscriptionStatus.ODD_REQUIRE
    }
  } else {
    if (activeEntitlements.includes('pro')) {
      currentStatus = subscriptionStatus.PRO
    } else {
      currentStatus = subscriptionStatus.EXPIRED
    }
  }
  // currentStatus = subscriptionStatus.EVEN_REQUIRE
  saveUserSubscriptionStatus(currentStatus, purchaserInfo)
  return currentStatus
}

export const authorizeAction = async (props, callback) => {
  const {
    navigation,
    contextUser: { updateAuthorization },
  } = props
  const currentStatus = await updateAuthorization()
  debugInfo('currentStatus', currentStatus)

  const conditionalText = {
    [subscriptionStatus.ODD_REQUIRE.code]: {
      title: 'subscription.status.alert.title',
      message: 'subscription.status.alert.message',
    },
    [subscriptionStatus.EVEN_REQUIRE.code]: {
      title: 'subscription.status.alert.title.even',
      message: 'subscription.status.alert.message.even',
    },
    [subscriptionStatus.EXPIRED.code]: {
      title: 'subscription.status.alert.title',
      message: 'subscription.status.alert.message',
    },
  }

  const text = conditionalText[currentStatus.code]

  callback(currentStatus)
  if (!currentStatus.authorized) {
    Alert.alert(translate(text.title), translate(text.message), [
      { text: translate('subscription.status.alert.cancel') },
      {
        text: translate('subscription.status.alert.ok'),
        onPress: () => navigation.navigate('Subscription', { currentStatus }),
      },
    ])
  }
  return currentStatus
}

export const loginWithFacebook = async (fbSession) => {
  const { token, expires, profile } = fbSession

  // debugInfo('Profile: ', profile, expires)
  await Auth.federatedSignIn('facebook', { token, expires_at: expires }, profile)
  // AsyncStorage.setItem('userToken', credentials.sessionToken)

  const email = await getCurrentEmail()
  const build = await DeviceInfo.getBuildNumber()
  const version = await DeviceInfo.getVersion()
  await postAPIUser({
    email,
    given_name: profile['first_name'],
    family_name: profile['last_name'],
    platform: Platform.OS,
    build,
    version,
    locale: strings.getLanguage(),
    email_verified: true,
  })
}
